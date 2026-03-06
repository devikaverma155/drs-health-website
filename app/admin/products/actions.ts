'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createProduct(data: {
  name: string;
  categoryId?: string;
  packSize?: string;
  mrp?: string;
  standardBatchSize?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.name?.trim()) throw new Error('Product name is required.');

  await prisma.product.create({
    data: {
      name: data.name.trim(),
      categoryId: data.categoryId?.trim() || null,
      packSize: data.packSize?.trim() || null,
      mrp: data.mrp ? parseFloat(data.mrp) : null,
      standardBatchSize: data.standardBatchSize ? parseInt(data.standardBatchSize, 10) : null,
    },
  });
  revalidatePath('/admin/products');
}

export async function updateProduct(id: string, data: {
  name?: string;
  categoryId?: string;
  packSize?: string;
  mrp?: string;
  standardBatchSize?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name?.trim(),
      categoryId: data.categoryId?.trim() || null,
      packSize: data.packSize?.trim() || null,
      mrp: data.mrp ? parseFloat(data.mrp) : null,
      standardBatchSize: data.standardBatchSize ? parseInt(data.standardBatchSize, 10) : null,
    },
  });
  revalidatePath('/admin/products');
  revalidatePath(`/admin/products/${id}`);
}

export async function deleteProduct(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
}
