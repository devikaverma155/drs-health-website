'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { syncRawMaterialCurrentStock } from '@/lib/inventory-sync';
import { isVendorOrderReceivedStatus, VENDOR_ORDER_RECEIVED_STATUS } from '@/lib/vendor-order-status';

// Vendor functions
export async function createVendor(data: {
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  if (!data.name?.trim()) throw new Error('Vendor name is required.');

  const vendor = await prisma.vendor.create({
    data: {
      name: data.name.trim(),
      contactPerson: data.contactPerson?.trim() || null,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      address: data.address?.trim() || null,
      notes: data.notes?.trim() || null,
    },
  });

  revalidatePath('/admin/raw-materials');
  revalidatePath('/admin/vendor-orders');
  return vendor;
}

export async function getAllVendors() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  return await prisma.vendor.findMany({
    orderBy: { name: 'asc' },
  });
}

// Raw Material Order functions
export async function createRawMaterialOrder(data: {
  vendorId: string;
  rawMaterialId?: string;
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

  const order = await prisma.rawMaterialOrder.create({
    data: {
      vendorId: data.vendorId,
      rawMaterialId: data.rawMaterialId?.trim() || null,
      materialType: data.materialType?.trim() || null,
      quantity: data.quantity?.trim() || null,
      unit: data.unit?.trim() || null,
      price: data.price ? parseFloat(data.price) : null,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
      status: data.status || 'pending',
      notes: data.notes?.trim() || null,
    },
  });

  // Receipt into stock when status is delivered (single canonical status)
  if (data.status === VENDOR_ORDER_RECEIVED_STATUS && data.rawMaterialId && data.quantity) {
    const qty = parseFloat(data.quantity);
    if (!isNaN(qty) && qty > 0) {
      await prisma.rawMaterialBatch.create({
        data: {
          materialId: data.rawMaterialId,
          batchNumber: `ORD-${order.id.slice(0, 8)}`,
          quantity: qty,
          manufacturingDate: data.deliveryDate ? new Date(data.deliveryDate) : new Date(),
          expiryDate: null,
        },
      });
      await syncRawMaterialCurrentStock(data.rawMaterialId);
      const totalPrice = order.price != null ? Number(order.price) : 0;
      if (totalPrice > 0) {
        const unitCost = totalPrice / qty;
        await prisma.rawMaterial.update({
          where: { id: data.rawMaterialId },
          data: { costPerUnit: unitCost, purchaseRate: unitCost },
        });
      }
    }
  }

  revalidatePath('/admin/raw-materials');
  revalidatePath('/admin/vendor-orders');
  revalidatePath('/admin/materials');
  revalidatePath('/admin/bom');
  return order.id;
}

export async function updateRawMaterialOrder(id: string, data: {
  vendorId?: string;
  rawMaterialId?: string;
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

  const existing = await prisma.rawMaterialOrder.findUnique({ where: { id } });
  if (!existing) throw new Error('Order not found');

  const mergedStatus = data.status ?? existing.status ?? '';
  const wasReceived = isVendorOrderReceivedStatus(existing.status);
  const nowReceived = isVendorOrderReceivedStatus(mergedStatus);
  const materialId = data.rawMaterialId?.trim() || existing.rawMaterialId;
  const quantity = data.quantity?.trim() || existing.quantity;

  await prisma.rawMaterialOrder.update({
    where: { id },
    data: {
      vendorId: data.vendorId,
      rawMaterialId: data.rawMaterialId?.trim() || null,
      materialType: data.materialType?.trim() ?? existing.materialType,
      quantity: data.quantity?.trim() ?? existing.quantity,
      unit: data.unit?.trim() ?? existing.unit,
      price: data.price !== undefined ? parseFloat(data.price) : existing.price,
      deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : existing.deliveryDate,
      status: data.status ?? existing.status,
      notes: data.notes?.trim() ?? existing.notes,
    },
  });

  // First transition into received status: add batch once
  if (!wasReceived && nowReceived && materialId && quantity) {
    const qty = parseFloat(quantity);
    if (!isNaN(qty) && qty > 0) {
      await prisma.rawMaterialBatch.create({
        data: {
          materialId,
          batchNumber: `ORD-${id.slice(0, 8)}`,
          quantity: qty,
          manufacturingDate: existing.deliveryDate || new Date(),
          expiryDate: null,
        },
      });
      await syncRawMaterialCurrentStock(materialId);
      const updated = await prisma.rawMaterialOrder.findUnique({ where: { id } });
      const totalPrice = updated?.price != null ? Number(updated.price) : 0;
      if (totalPrice > 0) {
        const unitCost = totalPrice / qty;
        await prisma.rawMaterial.update({
          where: { id: materialId },
          data: { costPerUnit: unitCost, purchaseRate: unitCost },
        });
      }
    }
  }

  revalidatePath('/admin/raw-materials');
  revalidatePath('/admin/vendor-orders');
  revalidatePath('/admin/materials');
  revalidatePath('/admin/bom');
}

export async function deleteRawMaterialOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.rawMaterialOrder.delete({ where: { id } });
  revalidatePath('/admin/raw-materials');
  revalidatePath('/admin/vendor-orders');
}

export async function getRawMaterialOrder(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  return prisma.rawMaterialOrder.findUnique({
    where: { id },
    include: { vendor: true, rawMaterial: true },
  });
}

export async function getRawMaterialsForOrder() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  return prisma.rawMaterial.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, materialCode: true, unit: true },
  });
}
