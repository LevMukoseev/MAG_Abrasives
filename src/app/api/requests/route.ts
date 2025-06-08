import { NextResponse } from 'next/server';

interface RequestData {
  materialType: string;
  material: string;
  operation: string;
  machine: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  comments?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestData;
    const {
      materialType,
      material,
      operation,
      machine,
      name,
      email,
      phone,
      company,
      comments,
    } = body;

    // Validate required fields
    if (!materialType || !material || !operation || !machine || !name || !email || !phone || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, just return success response
    return NextResponse.json({ 
      success: true,
      message: 'Request received successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 