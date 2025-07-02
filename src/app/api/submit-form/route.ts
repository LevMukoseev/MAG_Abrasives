import Redis from 'ioredis';
import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Проверяем, что переменная окружения доступна
if (!process.env.REDIS_URL) {
  throw new Error('Missing REDIS_URL environment variable');
}

// Создаем клиент один раз. Он будет переиспользоваться между вызовами.
const redisClient = new Redis(process.env.REDIS_URL);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const id = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const requestData = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    const dataForHash = Object.entries(requestData).flatMap(([key, value]) => [key, String(value)]);
    
    await redisClient.hset(`request:${id}`, ...dataForHash);
    await redisClient.zadd('requests_by_date', Date.now(), `request:${id}`);

    console.log('Successfully saved new request:', requestData);

    // Отправка письма
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    var str_data = `Поступила новая заявка:
    Материал: ${formData["material"]}
    Операция: ${formData["operation"]}
    Оборудование: ${formData["machine"]}
    Имя: ${formData["name"]}
    Почта: ${formData["email"]}
    Телефон: ${formData["phone"]}
    Компания: ${formData["company"]}
    Комментарии: ${formData["comments"]}
    Дата создания: ${new Date().toISOString()}
    `;
    console.log(str_data);
    await transporter.sendMail({
      from: `"Abrasive Expert" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      subject: `Новая заявка от ${formData["name"]}`,
      text: str_data
    });

    return NextResponse.json({ message: 'Заявка успешно создана', id }, { status: 201 });

  } catch (error) {
    console.error('Error processing request:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Ошибка при обработке заявки', error: errorMessage }, { status: 500 });
  }
} 