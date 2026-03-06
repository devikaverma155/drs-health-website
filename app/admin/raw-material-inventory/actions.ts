'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createRawMaterial(data: {
  materialCode?: string;
  name?: string;
  unit?: string;
  purchaseRate?: string;
  supplierId?: string;
  minStock?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterial.create({
    data: {
      materialCode: data.materialCode?.trim() || null,
      name: data.name?.trim() || null,
      unit: data.unit?.trim() || null,
      purchaseRate: data.purchaseRate ? parseFloat(data.purchaseRate) : null,
      supplierId: data.supplierId?.trim() || null,
      minStock: data.minStock ? parseFloat(data.minStock) : null,
    },
  });
  revalidatePath('/admin/raw-material-inventory');
}

export async function updateRawMaterial(id: string, data: {
  materialCode?: string;
  name?: string;
  unit?: string;
  purchaseRate?: string;
  supplierId?: string;
  minStock?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterial.update({
    where: { id },
    data: {
      materialCode: data.materialCode?.trim() || null,
      name: data.name?.trim() || null,
      unit: data.unit?.trim() || null,
      purchaseRate: data.purchaseRate ? parseFloat(data.purchaseRate) : null,
      supplierId: data.supplierId?.trim() || null,
      minStock: data.minStock ? parseFloat(data.minStock) : null,
    },
  });
  revalidatePath('/admin/raw-material-inventory');
  revalidatePath(`/admin/raw-material-inventory/${id}`);
}

export async function deleteRawMaterial(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.rawMaterial.delete({ where: { id } });
  revalidatePath('/admin/raw-material-inventory');
}
