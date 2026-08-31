import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const quoteSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phoneNumber: z.string().min(5, "Phone is required"),
  email: z.string().email("Invalid email"),
  location: z.string().min(2, "Location is required"),
  serviceRequired: z.string().min(2, "Service is required"),
  propertyType: z.string().min(2, "Property type is required"),
  approxArea: z.string().optional(),
  preferredDate: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = quoteSchema.parse(body);

    const quoteRequest = await prisma.quoteRequest.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: quoteRequest });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
