import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    if (!data.status) {
      return NextResponse.json(
        { error: 'Статус не указан' },
        { status: 400 }
      );
    }

    const updatedRequest = await prisma.abrasiveRequest.update({
      where: { id },
      data: { status: data.status },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при обновлении заявки' },
      { status: 500 }
    );
  }
} 