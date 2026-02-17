import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { runNewLeadAutomations } from '@/lib/automations/runNewLeadAutomations';

function validate(body: unknown): { name: string; email: string; phone: string; message?: string } | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  const name = typeof b.name === 'string' ? b.name.trim() : '';
  const email = typeof b.email === 'string' ? b.email.trim() : '';
  const phone = typeof b.phone === 'string' ? b.phone.trim() : '';
  const message = typeof b.message === 'string' ? b.message.trim() : undefined;
  if (!name || !email || !phone) return null;
  if (email.length > 255 || phone.length > 50) return null;
  return { name, email, phone, message };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = validate(body);
    if (!data) {
      return NextResponse.json({ error: 'Invalid request. Name, email and phone are required.' }, { status: 400 });
    }
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message ?? null,
        source: 'consultation',
      },
    });
    runNewLeadAutomations(lead).catch((e) => console.error('[api/forms/consultation] automation', e));
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[api/forms/consultation]', e);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
