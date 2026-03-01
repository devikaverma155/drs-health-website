import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { runNewLeadAutomations } from '@/lib/automations/runNewLeadAutomations';

const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, state, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required.' },
        { status: 400 }
      );
    }
    const digits = phone.replace(/\D/g, '');
    if (!phoneRegex.test(digits)) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: digits,
        companyName: typeof company === 'string' ? company.trim() || null : null,
        state: typeof state === 'string' ? state.trim() || null : null,
        message: typeof message === 'string' ? message.trim() || null : null,
        source: 'pcd',
      },
    });

    runNewLeadAutomations(lead).catch((e) => console.error('[api/pcd] automation', e));

    return NextResponse.json({
      success: true,
      message: 'Thank you. We will get back to you shortly.',
    });
  } catch (e) {
    console.error('[api/pcd]', e);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
