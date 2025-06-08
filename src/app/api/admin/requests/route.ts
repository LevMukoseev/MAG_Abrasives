import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('Fetching all requests (Prisma not used)');
  // Имитация списка заявок
  const mockRequests = [
    { id: 1, materialType: 'Металл', processType: 'Резка', status: 'pending', createdAt: new Date().toISOString() },
    { id: 2, materialType: 'Дерево', processType: 'Шлифовка', status: 'completed', createdAt: new Date().toISOString() },
  ];
  return NextResponse.json(mockRequests);
} 