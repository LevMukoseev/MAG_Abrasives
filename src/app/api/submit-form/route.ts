import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { OPERATION_LABELS } from '@/lib/formOptions';
import { validateInquiry } from '@/lib/inquiry';
import { getSmtpConfig } from '@/lib/smtpConfig';

export const maxDuration = 60;

const MAX_BODY_BYTES = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const MAX_IPS = 5000;
const submissions = new Map<string, { count: number; expiresAt: number }>();
const SUCCESS_MESSAGE = 'Заявка успешно создана';
const FAILURE_MESSAGE = 'Не удалось отправить заявку. Свяжитесь с нами по телефону или email напрямую.';

// Process-local protection: restarts and multiple instances have independent limits.
// Trust forwarded IP headers only if the external proxy overwrites them and
// direct access to the application is blocked; otherwise clients can spoof them.
function getClientIp(request: NextRequest): string {
  const candidate = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')?.trim();
  return candidate && candidate.length <= 128 ? candidate : 'unknown';
}

function retryAfter(ip: string, now: number): number {
  let earliestExpiry = now + WINDOW_MS;
  submissions.forEach((entry, key) => {
    if (entry.expiresAt <= now) submissions.delete(key);
    else earliestExpiry = Math.min(earliestExpiry, entry.expiresAt);
  });
  const entry = submissions.get(ip);
  if (entry) {
    if (entry.count >= MAX_PER_WINDOW) return Math.max(1, Math.ceil((entry.expiresAt - now) / 1000));
    entry.count += 1;
  } else {
    // Refuse new keys at capacity rather than evicting active limits or clearing the map.
    if (submissions.size >= MAX_IPS) return Math.max(1, Math.ceil((earliestExpiry - now) / 1000));
    submissions.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
  }
  return 0;
}

type BodyResult = { success: true; body: unknown } | { success: false; status: 400 | 413; message: string };

async function readJsonBody(request: NextRequest): Promise<BodyResult> {
  if (!request.body) return { success: false, status: 400, message: 'Некорректный формат данных' };
  const reader = request.body.getReader();
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let size = 0;
  let json = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { success: false, status: 413, message: 'Слишком большой размер заявки' };
      }
      json += decoder.decode(value, { stream: true });
    }
    json += decoder.decode();
    return { success: true, body: JSON.parse(json) as unknown };
  } catch {
    await reader.cancel().catch(() => undefined);
    return { success: false, status: 400, message: 'Некорректный формат данных' };
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: NextRequest) {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return NextResponse.json({ message: 'Требуется Content-Type application/json' }, { status: 415 });
  }
  const parsed = await readJsonBody(request);
  if (!parsed.success) return NextResponse.json({ message: parsed.message }, { status: parsed.status });
  const body = parsed.body;
  if (body && typeof body === 'object' && !Array.isArray(body)
    && typeof (body as Record<string, unknown>).website === 'string'
    && ((body as Record<string, unknown>).website as string).trim()) {
    return NextResponse.json({ message: SUCCESS_MESSAGE }, { status: 201 });
  }
  const result = validateInquiry(body);
  if (!result.success) return NextResponse.json({ message: result.message, code: 'INVALID_INQUIRY' }, { status: 400 });
  const config = getSmtpConfig();
  if (!config) {
    console.error('Inquiry SMTP configuration incomplete');
    return NextResponse.json({ message: FAILURE_MESSAGE, code: 'MAIL_NOT_CONFIGURED' }, { status: 500 });
  }
  const wait = retryAfter(getClientIp(request), Date.now());
  if (wait) {
    return NextResponse.json({ message: 'Слишком много заявок. Попробуйте позже.' }, {
      status: 429, headers: { 'Retry-After': String(wait) },
    });
  }
  const data = result.data;
  const text = `Поступила новая заявка с сайта GD-Abrasives:

Категория: ${data.categoryTitle || '-'}
Товар: ${data.productCaption || '-'}
Изображение товара: ${data.product || '-'}
Источник: ${data.source || '-'}
Материал: ${data.material || '-'}
Операция: ${OPERATION_LABELS[data.operation] || '-'}
Оборудование: ${data.machine || '-'}
Имя: ${data.name}
Почта: ${data.email}
Телефон: ${data.phone}
Компания: ${data.company || '-'}
Комментарии: ${data.comments || '-'}
Согласие на обработку ПДн: получено
Дата создания: ${new Date().toISOString()}
`;
  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      requireTLS: config.port === 587,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
      auth: { user: config.user, pass: config.pass },
    });
    const sent = await transporter.sendMail({
      from: { name: 'GD-Abrasives', address: config.user },
      to: config.to,
      replyTo: data.email,
      subject: `Новая заявка от ${data.name}`,
      text,
    });
    if (!Array.isArray(sent.accepted) || sent.accepted.length === 0) {
      console.error('Inquiry SMTP rejected all recipients');
      return NextResponse.json({ message: FAILURE_MESSAGE, code: 'MAIL_REJECTED' }, { status: 500 });
    }
    return NextResponse.json({ message: SUCCESS_MESSAGE }, { status: 201 });
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
    console.error('Inquiry SMTP failure', /^[A-Z_]{1,32}$/.test(code) ? code : 'UNKNOWN');
    const publicCode = code === 'EAUTH' ? 'MAIL_AUTH_FAILED' : code === 'ETIMEDOUT' ? 'MAIL_TIMEOUT' : 'MAIL_DELIVERY_FAILED';
    return NextResponse.json({ message: FAILURE_MESSAGE, code: publicCode }, { status: 500 });
  }
}
