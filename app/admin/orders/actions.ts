'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createOrder(data: { clientId?: string; orderDate?: string; status?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.order.create({
    data: {
      clientId: data.clientId?.trim() || null,
      orderDate: data.orderDate ? new Date(data.orderDate) : null,
      status: data.status || 'pending',
    },
  });
  revalidatePath('/admin/orders');
}

export async function updateOrder(id: string, data: { clientId?: string; orderDate?: string; status?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.order.update({
    where: { id },
    data: {
      clientId: data.clientId?.trim() || null,
      orderDate: data.orderDate ? new Date(data.orderDate) : null,
      status: data.status,
    },
  });
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${id}`);
}

export async function deleteOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.order.delete({ where: { id } });
  revalidatePath('/admin/orders');
}
