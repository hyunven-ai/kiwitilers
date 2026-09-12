import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createLeadSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phoneNumber: z.string().min(5, "Phone is required"),
  email: z.string().email("Invalid email"),
  location: z.string().min(2, "Location is required"),
  serviceRequired: z.string().min(2, "Service is required"),
  propertyType: z.string().min(2, "Property type is required"),
  approxArea: z.string().optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.string().optional().default('NEW'),
  estimatedValue: z.number().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { location: { contains: search } },
        { serviceRequired: { contains: search } },
      ];
    }

    const leads = await prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { images: true },
    });

    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createLeadSchema.parse(body);

    const lead = await prisma.quoteRequest.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors || (error as any).issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create lead' }, { status: 500 });
  }
}
