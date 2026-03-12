import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, services } = await req.json();

    // Validation
    if (!name || !email || !phone || !message || !services || services.length === 0) {
      return NextResponse.json(
        { message: 'All fields are required and at least one service must be selected' },
        { status: 400 }
      );
    }

    // Create a single lead with the services array stored
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        source: `business-enquiry: ${services.join(', ')}`,
      },
    });

    // Log notification for all services
    console.log(
      `🔔 NEW BUSINESS ENQUIRY: ${name} (${phone}) - ${email} | Services: ${services.join(', ')}`
    );

    return NextResponse.json(
      { message: 'Enquiry received successfully', data: lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('Business enquiry error:', error);
    return NextResponse.json(
      { message: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}
