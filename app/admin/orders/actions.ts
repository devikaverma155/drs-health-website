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

export async function addOrderItem(orderId: string, productId: string, quantity: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  const qty = parseFloat(quantity);
  if (isNaN(qty) || qty <= 0) throw new Error('Valid quantity required.');
  await prisma.orderItem.create({
    data: { orderId, productId, quantity: qty },
  });
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
}

export async function deleteOrderItem(id: string, orderId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.orderItem.delete({ where: { id } });
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
}

/** Deduct finished goods for an order's items (FIFO per product). Ensures total available is maintained; throws if insufficient. */
async function deductFinishedGoodsForOrder(orderId: string) {
  const items = await prisma.orderItem.findMany({
    where: { orderId },
    include: { product: true },
  });
  for (const item of items) {
    if (!item.productId || item.quantity == null) continue;
    const required = Number(item.quantity);
    const batches = await prisma.finishedGoodsBatch.findMany({
      where: { productId: item.productId },
      orderBy: { createdAt: 'asc' },
    });
    const totalAvailable = batches.reduce((s, b) => s + Number(b.quantityAvailable ?? 0), 0);
    if (required > totalAvailable) {
      throw new Error(
        `Insufficient finished goods for "${item.product?.name ?? 'Product'}". Required: ${required}, Available: ${totalAvailable}. Add stock via Production or adjust the order.`
      );
    }
  }
  for (const item of items) {
    if (!item.productId || item.quantity == null) continue;
    let remaining = Number(item.quantity);
    const batches = await prisma.finishedGoodsBatch.findMany({
      where: { productId: item.productId },
      orderBy: { createdAt: 'asc' },
    });
    for (const batch of batches) {
      if (remaining <= 0) break;
      const avail = Number(batch.quantityAvailable ?? 0);
      if (avail <= 0) continue;
      const deduct = Math.min(remaining, avail);
      await prisma.finishedGoodsBatch.update({
        where: { id: batch.id },
        data: { quantityAvailable: avail - deduct },
      });
      remaining -= deduct;
    }
  }
}

export async function createDispatch(orderId: string, data: { dispatchDate?: string; notes?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.dispatch.create({
    data: {
      orderId,
      dispatchDate: data.dispatchDate ? new Date(data.dispatchDate) : new Date(),
      notes: data.notes?.trim() || null,
    },
  });
  await deductFinishedGoodsForOrder(orderId);
  await prisma.order.update({ where: { id: orderId }, data: { status: 'dispatched' } });
  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath('/admin/finished-goods');
}

export async function deleteOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.order.delete({ where: { id } });
  revalidatePath('/admin/orders');
}
