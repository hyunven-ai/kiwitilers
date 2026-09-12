import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().optional(),
  description: z.string().min(5, "Description is required"),
  content: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        _count: {
          select: { projects: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = serviceSchema.parse(body);

    const slug = validatedData.slug?.trim() || slugify(validatedData.title);

    // Check duplicate slug
    const existing = await prisma.service.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const service = await prisma.service.create({
      data: {
        ...validatedData,
        slug: finalSlug,
      },
    });

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error creating service:', error);
    return NextResponse.json({ success: false, error: 'Failed to create service' }, { status: 500 });
  }
}
