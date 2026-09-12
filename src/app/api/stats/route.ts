import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [totalLeads, newLeads, totalProjects, publishedBlogs, recentLeads] = await Promise.all([
      prisma.quoteRequest.count(),
      prisma.quoteRequest.count({ where: { status: 'NEW' } }),
      prisma.project.count(),
      prisma.blog.count({ where: { status: 'PUBLISHED' } }),
      prisma.quoteRequest.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          fullName: true,
          serviceRequired: true,
          location: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        totalProjects,
        publishedBlogs,
      },
      recentLeads,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}
