'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createBOM(data: { productId?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.productId?.trim()) throw new Error('Product is required.');

  await prisma.billOfMaterial.create({
    data: { productId: data.productId.trim() },
  });
  revalidatePath('/admin/bom');
}

export async function updateBOM(id: string, data: { productId?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.billOfMaterial.update({
    where: { id },
    data: { productId: data.productId?.trim() || null },
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
