'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createPackagingMaterial(data: {
  packagingCode?: string;
  name?: string;
  supplierId?: string;
  quantity?: string;
  unit?: string;
  minStock?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.packagingMaterial.create({
    data: {
      packagingCode: data.packagingCode?.trim() || null,
      name: data.name?.trim() || null,
      supplierId: data.supplierId?.trim() || null,
      quantity: data.quantity ? parseFloat(data.quantity) : null,
      unit: data.unit?.trim() || null,
      minStock: data.minStock ? parseFloat(data.minStock) : null,
    },
  });
  revalidatePath('/admin/packaging');
}

export async function updatePackagingMaterial(id: string, data: {
  packagingCode?: string;
  name?: string;
  supplierId?: string;
  quantity?: string;
  unit?: string;
  minStock?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.packagingMaterial.update({
    where: { id },
    data: {
      packagingCode: data.packagingCode?.trim() || null,
      name: data.name?.trim() || null,
      supplierId: data.supplierId?.trim() || null,
      quantity: data.quantity ? parseFloat(data.quantity) : null,
      unit: data.unit?.trim() || null,
      minStock: data.minStock ? parseFloat(data.minStock) : null,
    },
  });
  revalidatePath('/admin/packaging');
  revalidatePath(`/admin/packaging/${id}`);
}

export async function deletePackagingMaterial(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.packagingMaterial.delete({ where: { id } });
  revalidatePath('/admin/packaging');
}
