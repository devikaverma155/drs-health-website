import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required.' },
        { status: 400 }
      );
    }
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
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

    // Save to clinic_patients table
    await prisma.clinicPatient.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: digits,
        condition: message ? String(message).trim() : null,
        notes: 'Submitted via website free consultation form',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you. We will contact you soon.',
    });
  } catch (err) {
    console.error('Consultation form error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
