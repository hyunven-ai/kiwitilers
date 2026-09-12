import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const testimonialSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  projectType: z.string().optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  content: z.string().min(5, "Content is required"),
  isFeatured: z.boolean().default(false),
});

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = testimonialSchema.parse(body);

    const testimonial = await prisma.testimonial.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}
