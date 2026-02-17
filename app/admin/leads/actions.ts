'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import type { LeadStatus, LeadSource, SampleStatus } from '@prisma/client';

export async function createLead(data: {
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  category?: string;
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
      category: data.category?.trim() || null,
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
  await prisma.leadNote.create({
    data: {
      leadId,
      content: trimmed,
      createdBy: session.user.email ?? session.user.id,
    },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin/leads');
  revalidatePath('/admin');
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.lead.update({
    where: { id: leadId },
    data: { status, lastContactedAt: new Date() },
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
  const result = await sendWhatsAppMessage(lead.phone, message);
  if (!result.ok) throw new Error(result.error ?? 'Failed to send.');
  await prisma.lead.update({
    where: { id: leadId },
    data: { lastContactedAt: new Date() },
  });
  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath('/admin');
}

// --- Sample tracking ---
export async function createSample(leadId: string, notes?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.leadSample.create({
    data: { leadId, notes: notes?.trim() || null },
  });
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function updateSampleStatus(
  sampleId: string,
  status: SampleStatus,
  trackingRef?: string
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const updates: { status: SampleStatus; sentAt?: Date; deliveredAt?: Date; trackingRef?: string } = {
    status,
  };
  if (status === 'SENT' || status === 'IN_TRANSIT') updates.sentAt = new Date();
  if (status === 'DELIVERED') updates.deliveredAt = new Date();
  if (trackingRef !== undefined) updates.trackingRef = trackingRef || null;
  await prisma.leadSample.update({
    where: { id: sampleId },
    data: updates,
  });
  revalidatePath(`/admin/leads`);
}

export async function updateSampleTrackingRef(sampleId: string, trackingRef: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.leadSample.update({
    where: { id: sampleId },
    data: { trackingRef: trackingRef.trim() || null },
  });
  revalidatePath(`/admin/leads`);
}

export async function notifySampleStatusOnWhatsApp(sampleId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const sample = await prisma.leadSample.findUnique({
    where: { id: sampleId },
    include: { lead: true },
  });
  if (!sample) throw new Error('Sample not found.');
  const statusText =
    sample.status === 'DELIVERED'
      ? 'Your sample has been delivered.'
      : sample.status === 'IN_TRANSIT'
        ? 'Your sample is in transit.'
        : sample.status === 'SENT'
          ? 'Your sample has been dispatched.'
          : `Sample status: ${sample.status.replace('_', ' ')}.`;
  const tracking = sample.trackingRef ? ` Tracking: ${sample.trackingRef}.` : '';
  const message = `Hi ${sample.lead.name}, ${statusText}${tracking}`;
  const result = await sendWhatsAppMessage(sample.lead.phone, message);
  if (!result.ok) throw new Error(result.error ?? 'Failed to send.');
  await prisma.lead.update({
    where: { id: sample.leadId },
    data: { lastContactedAt: new Date() },
  });
  revalidatePath(`/admin/leads/${sample.leadId}`);
}
