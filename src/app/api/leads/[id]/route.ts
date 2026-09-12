import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateLeadSchema = z.object({
  fullName: z.string().min(2).optional(),
  phoneNumber: z.string().min(5).optional(),
  email: z.string().email().optional(),
  location: z.string().optional(),
  serviceRequired: z.string().optional(),
  propertyType: z.string().optional(),
  approxArea: z.string().optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.enum(['NEW', 'CONTACTED', 'QUOTED', 'APPROVED', 'COMPLETED', 'CANCELLED']).optional(),
  estimatedValue: z.number().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lead = await prisma.quoteRequest.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch lead' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = updateLeadSchema.parse(body);

    const lead = await prisma.quoteRequest.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error updating lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.quoteRequest.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 });
  }
}
