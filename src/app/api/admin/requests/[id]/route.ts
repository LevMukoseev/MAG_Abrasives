import { NextResponse, type NextRequest } from 'next/server';

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  const { id } = params;
  console.log(`Fetching request with ID: ${id} (Prisma not used)`);
  // Имитация получения данных
  return NextResponse.json({ id, status: 'pending', data: {} });
}

export async function PUT(request: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  const { id } = params;
  const { status } = await request.json();
  console.log(`Updating request ${id} to status: ${status} (Prisma not used)`);
  // Имитация обновления данных
  return NextResponse.json({ id, status, message: 'Request updated successfully (Prisma not used)' });
}

export async function DELETE(request: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  const { id } = params;
  console.log(`Deleting request with ID: ${id} (Prisma not used)`);
  // Имитация удаления данных
  return NextResponse.json({ id, message: 'Request deleted successfully (Prisma not used)' });
} 