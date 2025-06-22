import { kv } from '@vercel/kv';
import Redis from 'ioredis';
import { NextResponse, NextRequest } from 'next/server';

// Создаем клиент в зависимости от окружения
let redisClient: Redis | typeof kv;

if (process.env.NODE_ENV === 'development') {
  // В режиме разработки используем ioredis для подключения к локальному Redis
  redisClient = new Redis(process.env.KV_URL as string);
} else {
  // В продакшене (на Vercel) используем Vercel KV
  redisClient = kv;
}

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

    // ioredis и @vercel/kv имеют немного разные API для HSET
    // Приводим к общему знаменателю. Для ioredis нужно передавать ключ и значение отдельно.
    if (redisClient instanceof Redis) {
      // Преобразуем объект в массив [ключ, значение, ключ, значение, ...], где все значения - строки
      const dataForHash = Object.entries(requestData).flatMap(([key, value]) => [key, String(value)]);
      await redisClient.hset(`request:${id}`, ...dataForHash);
    } else {
      await redisClient.hset(`request:${id}`, requestData);
    }

    await redisClient.zadd('requests_by_date', Date.now(), `request:${id}`);

    console.log('Successfully saved new request:', requestData);
    return NextResponse.json({ message: 'Заявка успешно создана', id }, { status: 201 });

  } catch (error) {
    console.error('Error processing request:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Ошибка при обработке заявки', error: errorMessage }, { status: 500 });
  }
} 