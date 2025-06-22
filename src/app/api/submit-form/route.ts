import { kv } from '@vercel/kv';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // 1. Генерируем уникальный ID для заявки
    const id = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 2. Добавляем временную метку и статус
    const requestData = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
      status: 'pending', // 'pending', 'in-progress', 'completed', 'rejected'
    };

    // 3. Сохраняем в Vercel KV
    // Мы сохраняем заявку в двух местах для удобства:
    // а) В списке всех заявок (для быстрого получения списка)
    // б) Как отдельный объект (для получения деталей по ID)
    await kv.hset(`request:${id}`, requestData);
    await kv.zadd('requests_by_date', { score: Date.now(), member: `request:${id}` });

    console.log('Successfully saved new request:', requestData);

    return NextResponse.json({ message: 'Заявка успешно создана', id }, { status: 201 });

  } catch (error) {
    console.error('Error processing request:', error);
    // Проверяем, является ли ошибка экземпляром Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Ошибка при обработке заявки', error: errorMessage }, { status: 500 });
  }
} 