import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { runNewLeadAutomations } from '@/lib/automations/runNewLeadAutomations';

const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters.' },
        { status: 400 },
      );
    }

    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 },
      );
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Phone number is required.' },
        { status: 400 },
      );
    }
    const digits = phone.replace(/\D/g, '');
    if (!phoneRegex.test(digits)) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit Indian mobile number.' },
        { status: 400 },
      );
    }

    // Save to leads table with source 'contact'
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: digits,
        source: 'contact',
        message: message ? String(message).trim() : null,
        status: 'new',
      },
    });

    // Create a notification for the admin dashboard
    try {
      // Store notification in activity log or create a notification table entry
      // For now, we'll use console.log that can be picked up by the admin dashboard
      // You can implement a real notification table if needed
      console.log(`🔔 NEW LEAD: ${name} (${phone}) - ${email}`);
    } catch (notificationError) {
      console.error('Failed to create notification:', notificationError);
    }

    // Fire-and-forget automations
    runNewLeadAutomations({
      id: lead.id,
      name: name.trim(),
      phone: digits,
      email: email.trim().toLowerCase(),
      source: 'contact',
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      message: 'Query received. Our expert team will contact you shortly.',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }
}
