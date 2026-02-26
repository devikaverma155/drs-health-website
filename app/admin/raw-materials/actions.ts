'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createRawMaterialBuyer(data: {
  companyName: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  materialRequired?: string;
  quantity?: string;
  location?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  if (!data.companyName?.trim()) throw new Error('Company name is required.');

  const buyer = await prisma.rawMaterialBuyer.create({
    data: {
      companyName: data.companyName.trim(),
      contactPerson: data.contactPerson?.trim() || null,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      materialRequired: data.materialRequired?.trim() || null,
      quantity: data.quantity?.trim() || null,
      location: data.location?.trim() || null,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/raw-materials');
  return buyer.id;
}

export async function updateRawMaterialBuyer(id: string, data: {
  companyName?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  materialRequired?: string;
  quantity?: string;
  location?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterialBuyer.update({
    where: { id },
    data: {
      companyName: data.companyName?.trim(),
      contactPerson: data.contactPerson?.trim() || null,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      materialRequired: data.materialRequired?.trim() || null,
      quantity: data.quantity?.trim() || null,
      location: data.location?.trim() || null,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/raw-materials');
  revalidatePath(`/admin/raw-materials/${id}`);
}

export async function deleteRawMaterialBuyer(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterialBuyer.delete({ where: { id } });
  revalidatePath('/admin/raw-materials');
}

export async function createRawMaterialOrder(data: {
  buyerId: string;
  materialType?: string;
  quantity?: string;
  unit?: string;
  price?: string;
  supplierName?: string;
  supplierContact?: string;
  deliveryDate?: string;
  status?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const order = await prisma.rawMaterialOrder.create({
    data: {
      buyerId: data.buyerId,
      materialType: data.materialType?.trim() || null,
      quantity: data.quantity?.trim() || null,
      unit: data.unit?.trim() || null,
      price: data.price ? parseFloat(data.price) : null,
      supplierName: data.supplierName?.trim() || null,
      supplierContact: data.supplierContact?.trim() || null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      status: data.status || 'pending',
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath(`/admin/raw-materials/${data.buyerId}`);
  return order.id;
}

export async function updateRawMaterialOrder(id: string, data: {
  materialType?: string;
  quantity?: string;
  unit?: string;
  price?: string;
  supplierName?: string;
  supplierContact?: string;
  deliveryDate?: string;
  status?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterialOrder.update({
    where: { id },
    data: {
      materialType: data.materialType?.trim() || null,
      quantity: data.quantity?.trim() || null,
      unit: data.unit?.trim() || null,
      price: data.price ? parseFloat(data.price) : null,
      supplierName: data.supplierName?.trim() || null,
      supplierContact: data.supplierContact?.trim() || null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      status: data.status,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/raw-materials');
}
