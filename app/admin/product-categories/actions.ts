'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createProductCategory(data: { name: string; description?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.name?.trim()) throw new Error('Category name is required.');
  await prisma.productCategory.create({
    data: { name: data.name.trim(), description: data.description?.trim() || null },
  });
  revalidatePath('/admin/product-categories');
  revalidatePath('/admin/products');
}

export async function updateProductCategory(id: string, data: { name?: string; description?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.productCategory.update({
    where: { id },
    data: { name: data.name?.trim(), description: data.description?.trim() || null },
  });
  revalidatePath('/admin/product-categories');
  revalidatePath(`/admin/product-categories/${id}`);
  revalidatePath('/admin/products');
}

export async function deleteProductCategory(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.productCategory.delete({ where: { id } });
  revalidatePath('/admin/product-categories');
  revalidatePath('/admin/products');
}
