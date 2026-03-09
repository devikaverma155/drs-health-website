'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createBOM(data: { productId?: string; status?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.productId?.trim()) throw new Error('Product is required.');

  await prisma.billOfMaterial.create({
    data: {
      productId: data.productId.trim(),
      status: data.status || 'draft',
    },
  });
  revalidatePath('/admin/bom');
}

export async function updateBOM(id: string, data: { productId?: string; status?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.billOfMaterial.update({
    where: { id },
    data: {
      productId: data.productId?.trim() || null,
      status: data.status,
    },
  });
  revalidatePath('/admin/bom');
  revalidatePath(`/admin/bom/${id}`);
}

export async function deleteBOM(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.billOfMaterial.delete({ where: { id } });
  revalidatePath('/admin/bom');
}

// BOM Raw items
export async function addBomRawItem(bomId: string, rawMaterialId: string, quantity: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty <= 0) throw new Error('Quantity must be a positive number.');
  await prisma.bomRawItem.create({
    data: { bomId, rawMaterialId, quantity: qty },
  });
  revalidatePath('/admin/bom');
  revalidatePath(`/admin/bom/${bomId}`);
}

export async function updateBomRawItem(id: string, quantity: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty < 0) throw new Error('Quantity must be 0 or more.');
  await prisma.bomRawItem.update({
    where: { id },
    data: { quantity: qty },
  });
  revalidatePath('/admin/bom');
}

export async function deleteBomRawItem(id: string, bomId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.bomRawItem.delete({ where: { id } });
  revalidatePath('/admin/bom');
  revalidatePath(`/admin/bom/${bomId}`);
}

// BOM Packaging items
export async function addBomPackagingItem(bomId: string, packagingId: string, quantity: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty <= 0) throw new Error('Quantity must be a positive number.');
  await prisma.bomPackagingItem.create({
    data: { bomId, packagingId, quantity: qty },
  });
  revalidatePath('/admin/bom');
  revalidatePath(`/admin/bom/${bomId}`);
}

export async function updateBomPackagingItem(id: string, quantity: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty < 0) throw new Error('Quantity must be 0 or more.');
  await prisma.bomPackagingItem.update({
    where: { id },
    data: { quantity: qty },
  });
  revalidatePath('/admin/bom');
}

export async function deleteBomPackagingItem(id: string, bomId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.bomPackagingItem.delete({ where: { id } });
  revalidatePath('/admin/bom');
  revalidatePath(`/admin/bom/${bomId}`);
}
