import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Логика обработки запроса без сохранения в БД
    console.log('Received form data:', data);

    return NextResponse.json({ message: 'Request submitted successfully (Prisma not used)' }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Failed to submit request' }, { status: 500 });
  }
} 