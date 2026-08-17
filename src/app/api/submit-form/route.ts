import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { OPERATION_LABELS } from '@/lib/formOptions';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 2000;

// Простой rate limit в памяти процесса. Это не переживёт рестарт/масштабирование serverless-функции,
// но для email-формы без БД этого достаточно, чтобы отсечь примитивный флуд.
// Для более надёжной защиты на серьёзной нагрузке — Upstash Ratelimit или Vercel Firewall.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 минут
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);

  // Не даём Map расти бесконечно на серверах с долгим временем жизни процесса.
  if (submissions.size > 5000) {
    submissions.clear();
  }

  return timestamps.length > MAX_PER_WINDOW;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Слишком много заявок. Попробуйте позже.' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ message: 'Некорректный формат данных' }, { status: 400 });
    }

    // Honeypot: скрытое поле, которое видят и заполняют только боты.
    if (sanitize((body as Record<string, unknown>).website)) {
      return NextResponse.json({ message: 'Заявка успешно создана' }, { status: 201 });
    }

    const formData = {
      material: sanitize((body as Record<string, unknown>).material),
      operation: sanitize((body as Record<string, unknown>).operation),
      machine: sanitize((body as Record<string, unknown>).machine),
      name: sanitize((body as Record<string, unknown>).name),
      email: sanitize((body as Record<string, unknown>).email),
      phone: sanitize((body as Record<string, unknown>).phone),
      company: sanitize((body as Record<string, unknown>).company),
      comments: sanitize((body as Record<string, unknown>).comments),
    };

    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json({ message: 'Заполните обязательные поля' }, { status: 400 });
    }

    if (!EMAIL_RE.test(formData.email)) {
      return NextResponse.json({ message: 'Некорректный email' }, { status: 400 });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.MAIL_TO) {
      console.error('SMTP переменные окружения не настроены (SMTP_HOST/SMTP_USER/SMTP_PASS/MAIL_TO)');
      return NextResponse.json(
        { message: 'Форма временно недоступна. Свяжитесь с нами по телефону или email напрямую.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) !== 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const operationLabel = OPERATION_LABELS[formData.operation] ?? (formData.operation || '-');

    const textBody = `Поступила новая заявка с сайта GD-Abrasives:

Материал: ${formData.material || '-'}
Операция: ${operationLabel}
Оборудование: ${formData.machine || '-'}
Имя: ${formData.name}
Почта: ${formData.email}
Телефон: ${formData.phone}
Компания: ${formData.company || '-'}
Комментарии: ${formData.comments || '-'}
Дата создания: ${new Date().toISOString()}
IP: ${ip}
`;

    await transporter.sendMail({
      from: `"GD-Abrasives" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: formData.email,
      subject: `Новая заявка от ${formData.name}`,
      text: textBody,
    });

    return NextResponse.json({ message: 'Заявка успешно создана' }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Ошибка при обработке заявки' }, { status: 500 });
  }
}
