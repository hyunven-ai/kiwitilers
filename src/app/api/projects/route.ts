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

const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  serviceType: z.string().min(2, "Category/Service Type is required"),
  tileType: z.string().optional().nullable(),
  description: z.string().min(5, "Description is required"),
  beforeImage: z.string().optional().nullable(),
  afterImage: z.string().optional().nullable(),
  serviceId: z.string().optional().nullable(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const where: any = {};
    if (category && category !== 'All') {
      where.serviceType = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        service: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = projectSchema.parse(body);

    const slug = validatedData.slug?.trim() || slugify(validatedData.title);
    const existing = await prisma.project.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        slug: finalSlug,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error creating project:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
  }
}
