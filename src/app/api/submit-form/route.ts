import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Валидация данных
    if (!data.materialType || !data.processType || !data.wheelSize || !data.gritSize) {
      return NextResponse.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Сохранение данных в базу данных
    const abrasiveRequest = await prisma.abrasiveRequest.create({
      data: {
        materialType: data.materialType,
        processType: data.processType,
        wheelSize: data.wheelSize,
        gritSize: data.gritSize,
        requirements: data.requirements || '',
      },
    });

    return NextResponse.json({ 
      success: true,
      requestId: abrasiveRequest.id 
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при обработке заявки' },
      { status: 500 }
    );
  }
} 