import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateBlogSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional().nullable(),
  content: z.string().min(5).optional(),
  author: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.blog.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = updateBlogSchema.parse(body);

    const existing = await prisma.blog.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    const post = await prisma.blog.update({
      where: { id: existing.id },
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    console.error('Error updating post:', error);
    return NextResponse.json({ success: false, error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await prisma.blog.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    await prisma.blog.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 500 });
  }
}
