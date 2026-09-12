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

const blogSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(5, "Content is required"),
  author: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('q') || searchParams.get('search');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    const posts = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = blogSchema.parse(body);

    const slug = validatedData.slug?.trim() || slugify(validatedData.title);
    const existing = await prisma.blog.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const post = await prisma.blog.create({
      data: {
        ...validatedData,
        slug: finalSlug,
      },
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, error: 'Failed to create blog post' }, { status: 500 });
  }
}
