'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
export async function createLead(data: {
  name: string;
  email: string;
  phone: string;
  source: string;
  message?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim())
    throw new Error('Name, email and phone are required.');
  const lead = await prisma.lead.create({
    data: {
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      source: data.source,
      message: data.message?.trim() || null,
    },
  });
  revalidatePath('/admin/leads');
  revalidatePath('/admin');
  return lead.id;
}

export async function addLeadNote(leadId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const trimmed = content?.trim();
  if (!trimmed) throw new Error('Note content is required.');
  await prisma.leadActivity.create({
    data: {
      leadId,
      action: 'note',
      note: trimmed,
      createdBy: session.user.id,
    },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin/leads');
  revalidatePath('/admin');
}

export async function updateLeadStatus(leadId: string, status: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.lead.update({
    where: { id: leadId },
    data: { status },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin/leads');
  revalidatePath('/admin');
}

export async function sendLeadWhatsApp(leadId: string, message: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const lead = await prisma.lead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error('Lead not found.');
  if (!lead.phone) throw new Error('Lead phone number not found.');
  const result = await sendWhatsAppMessage(lead.phone, message);
  if (!result.ok) throw new Error(result.error ?? 'Failed to send.');
  // Record WhatsApp message
  await prisma.whatsAppMessage.create({
    data: {
      leadId,
      phone: lead.phone,
      direction: 'outbound',
      message,
      status: 'sent',
    },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin');
}
