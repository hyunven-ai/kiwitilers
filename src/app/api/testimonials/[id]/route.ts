import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateTestimonialSchema = z.object({
  customerName: z.string().min(2).optional(),
  projectType: z.string().optional().nullable(),
  rating: z.number().int().min(1).max(5).optional(),
  content: z.string().min(5).optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return NextResponse.json({ success: false, error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonial' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = updateTestimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
