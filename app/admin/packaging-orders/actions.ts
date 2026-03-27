'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { syncPackagingCurrentStock } from '@/lib/inventory-sync';
import { isVendorOrderReceivedStatus, VENDOR_ORDER_RECEIVED_STATUS } from '@/lib/vendor-order-status';

export async function createPackagingOrder(data: {
  vendorId: string;
  packagingId?: string;
  materialType?: string;
  quantity?: string;
  unit?: string;
  price?: string;
  deliveryDate?: string;
  status?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.vendorId) throw new Error('Vendor is required.');

  const order = await prisma.packagingOrder.create({
    data: {
      vendorId: data.vendorId,
      packagingId: data.packagingId?.trim() || null,
      materialType: data.materialType?.trim() || null,
      quantity: data.quantity?.trim() || null,
      unit: data.unit?.trim() || null,
      price: data.price ? parseFloat(data.price) : null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      status: data.status || 'pending',
      notes: data.notes?.trim() || null,
    },
  });

  if (data.status === VENDOR_ORDER_RECEIVED_STATUS && data.packagingId && data.quantity) {
    const qty = parseFloat(data.quantity);
    if (!isNaN(qty) && qty > 0) {
      await prisma.packagingBatch.create({
        data: {
          packagingId: data.packagingId,
          batchNumber: `ORD-${order.id.slice(0, 8)}`,
          quantity: qty,
          purchaseDate: data.deliveryDate ? new Date(data.deliveryDate) : new Date(),
        },
      });
      await syncPackagingCurrentStock(data.packagingId);
      const totalPrice = order.price != null ? Number(order.price) : 0;
      if (totalPrice > 0) {
        const unitCost = totalPrice / qty;
        await prisma.packagingMaterial.update({
          where: { id: data.packagingId },
          data: { costPerUnit: unitCost },
        });
      }
    }
  }

  revalidatePath('/admin/packaging-orders');
  revalidatePath('/admin/vendor-orders');
  revalidatePath('/admin/materials');
  revalidatePath('/admin/bom');
  return order.id;
}

export async function updatePackagingOrder(id: string, data: {
  vendorId?: string;
  packagingId?: string;
  materialType?: string;
  quantity?: string;
  unit?: string;
  price?: string;
  deliveryDate?: string;
  status?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const existing = await prisma.packagingOrder.findUnique({ where: { id } });
  if (!existing) throw new Error('Order not found');

  const mergedStatus = data.status ?? existing.status ?? '';
  const wasReceived = isVendorOrderReceivedStatus(existing.status);
  const nowReceived = isVendorOrderReceivedStatus(mergedStatus);
  const packagingId = data.packagingId?.trim() || existing.packagingId;
  const quantity = data.quantity?.trim() || existing.quantity;

  await prisma.packagingOrder.update({
    where: { id },
    data: {
      vendorId: data.vendorId,
      packagingId: data.packagingId?.trim() || null,
      materialType: data.materialType?.trim() ?? existing.materialType,
      quantity: data.quantity?.trim() ?? existing.quantity,
      unit: data.unit?.trim() ?? existing.unit,
      price: data.price !== undefined ? parseFloat(data.price) : existing.price,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : existing.deliveryDate,
      status: data.status ?? existing.status,
      notes: data.notes?.trim() ?? existing.notes,
    },
  });

  if (!wasReceived && nowReceived && packagingId && quantity) {
    const qty = parseFloat(quantity);
    if (!isNaN(qty) && qty > 0) {
      await prisma.packagingBatch.create({
        data: {
          packagingId,
          batchNumber: `ORD-${id.slice(0, 8)}`,
          quantity: qty,
          purchaseDate: existing.deliveryDate || new Date(),
        },
      });
      await syncPackagingCurrentStock(packagingId);
      const updated = await prisma.packagingOrder.findUnique({ where: { id } });
      const totalPrice = updated?.price != null ? Number(updated.price) : 0;
      if (totalPrice > 0) {
        const unitCost = totalPrice / qty;
        await prisma.packagingMaterial.update({
          where: { id: packagingId },
          data: { costPerUnit: unitCost },
        });
      }
    }
  }

  revalidatePath('/admin/packaging-orders');
  revalidatePath('/admin/vendor-orders');
  revalidatePath('/admin/materials');
  revalidatePath('/admin/bom');
}

export async function deletePackagingOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.packagingOrder.delete({ where: { id } });
  revalidatePath('/admin/packaging-orders');
  revalidatePath('/admin/vendor-orders');
}

export async function getPackagingOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  return prisma.packagingOrder.findUnique({
    where: { id },
    include: { vendor: true, packaging: true },
  });
}

export async function getVendorsForPackagingOrder() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  return prisma.vendor.findMany({ orderBy: { name: 'asc' } });
}

export async function getPackagingMaterialsForOrder() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  return prisma.packagingMaterial.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, packagingCode: true, unit: true },
  });
}
