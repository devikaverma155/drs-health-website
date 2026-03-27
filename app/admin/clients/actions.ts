'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createClient(data: {
  companyName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  gstNumber?: string;
  category?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.companyName?.trim()) throw new Error('Company name is required.');

  await prisma.client.create({
    data: {
      companyName: data.companyName.trim(),
      contactPerson: data.contactPerson?.trim() || null,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      address: data.address?.trim() || null,
      city: data.city?.trim() || null,
      state: data.state?.trim() || null,
      gstNumber: data.gstNumber?.trim() || null,
      category: data.category?.trim() || null,
      notes: data.notes?.trim() || null,
    },
  });
  revalidatePath('/admin/clients');
}

export async function updateClient(id: string, data: {
  companyName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  gstNumber?: string;
  category?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.client.update({
    where: { id },
    data: {
      companyName: data.companyName?.trim(),
      contactPerson: data.contactPerson?.trim() || null,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      address: data.address?.trim() || null,
      city: data.city?.trim() || null,
      state: data.state?.trim() || null,
      gstNumber: data.gstNumber?.trim() || null,
      category: data.category?.trim() || null,
      notes: data.notes?.trim() ?? undefined,
    },
  });
  revalidatePath('/admin/clients');
  revalidatePath(`/admin/clients/${id}`);
}

export async function deleteClient(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.client.delete({ where: { id } });
  revalidatePath('/admin/clients');
}

export async function deleteClientDocument(documentId: string, clientId?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.clientDocument.delete({ where: { id: documentId } });
  revalidatePath('/admin/clients');
  if (clientId) revalidatePath(`/admin/clients/${clientId}`);
}
