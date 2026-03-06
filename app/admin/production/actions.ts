'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createProductionBatch(data: {
  productId?: string;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  quantityProduced?: string;
  status?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.productionBatch.create({
    data: {
      productId: data.productId?.trim() || null,
      batchNumber: data.batchNumber?.trim() || null,
      manufacturingDate: data.manufacturingDate ? new Date(data.manufacturingDate) : null,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      quantityProduced: data.quantityProduced ? parseFloat(data.quantityProduced) : null,
      status: data.status || 'running',
    },
  });
  revalidatePath('/admin/production');
}

export async function updateProductionBatch(id: string, data: {
  productId?: string;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  quantityProduced?: string;
  status?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.productionBatch.update({
    where: { id },
    data: {
      productId: data.productId?.trim() || null,
      batchNumber: data.batchNumber?.trim() || null,
      manufacturingDate: data.manufacturingDate ? new Date(data.manufacturingDate) : null,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      quantityProduced: data.quantityProduced ? parseFloat(data.quantityProduced) : null,
      status: data.status,
    },
  });
  revalidatePath('/admin/production');
  revalidatePath(`/admin/production/${id}`);
}

export async function deleteProductionBatch(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.productionBatch.delete({ where: { id } });
  revalidatePath('/admin/production');
}
