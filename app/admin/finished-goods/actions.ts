'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function updateFinishedGoodsBatch(id: string, data: { quantityAvailable?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const qty = data.quantityAvailable != null ? parseFloat(data.quantityAvailable) : undefined;
  if (qty !== undefined && (isNaN(qty) || qty < 0)) throw new Error('Invalid quantity.');
  if (qty === undefined) return;
  await prisma.finishedGoodsBatch.update({
    where: { id },
    data: { quantityAvailable: qty },
  });
  revalidatePath('/admin/finished-goods');
  revalidatePath(`/admin/finished-goods/${id}`);
}
