'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Vendor functions
export async function createVendor(data: {
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  if (!data.name?.trim()) throw new Error('Vendor name is required.');

  const vendor = await prisma.vendor.create({
    data: {
      name: data.name.trim(),
      contactPerson: data.contactPerson?.trim() || null,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      address: data.address?.trim() || null,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/raw-materials');
  return vendor;
}

export async function getAllVendors() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  return await prisma.vendor.findMany({
    orderBy: { name: 'asc' },
  });
}

// Raw Material Order functions
export async function createRawMaterialOrder(data: {
  vendorId: string;
  materialType?: string;
  quantity?: string;
  unit?: string;
  price?: string;
  deliveryDate?: string;
  status?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  if (!data.vendorId) throw new Error('Vendor is required.');

  const order = await prisma.rawMaterialOrder.create({
    data: {
      vendorId: data.vendorId,
      materialType: data.materialType?.trim() || null,
      quantity: data.quantity?.trim() || null,
      unit: data.unit?.trim() || null,
      price: data.price ? parseFloat(data.price) : null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      status: data.status || 'pending',
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/raw-materials');
  return order.id;
}

export async function updateRawMaterialOrder(id: string, data: {
  vendorId?: string;
  materialType?: string;
  quantity?: string;
  unit?: string;
  price?: string;
  deliveryDate?: string;
  status?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterialOrder.update({
    where: { id },
    data: {
      vendorId: data.vendorId,
      materialType: data.materialType?.trim() || null,
      quantity: data.quantity?.trim() || null,
      unit: data.unit?.trim() || null,
      price: data.price ? parseFloat(data.price) : null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      status: data.status,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/raw-materials');
}

export async function deleteRawMaterialOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterialOrder.delete({ where: { id } });
  revalidatePath('/admin/raw-materials');
}
