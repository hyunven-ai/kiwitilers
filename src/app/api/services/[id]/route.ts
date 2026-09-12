import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateServiceSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().optional(),
  description: z.string().min(5).optional(),
  content: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id },
      include: { projects: true },
    });

    if (!service) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = updateServiceSchema.parse(body);

    const service = await prisma.service.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: service });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error updating service:', error);
    return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete service' }, { status: 500 });
  }
}
