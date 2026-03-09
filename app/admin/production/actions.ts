'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/** When production is marked completed: check BOM × quantityProduced against inventory, deduct RM/PM (FIFO), then add to FG. */
async function onProductionCompleted(productionId: string, productId: string, quantityProduced: number) {
  if (quantityProduced <= 0) return;

  const bom = await prisma.billOfMaterial.findFirst({
    where: { productId, status: 'complete' },
    include: {
      rawItems: { include: { rawMaterial: true } },
      packagingItems: { include: { packaging: true } },
    },
  });

  const errors: string[] = [];

  if (bom?.rawItems?.length) {
    for (const item of bom.rawItems) {
      if (!item.rawMaterialId || item.quantity == null) continue;
      const required = Number(item.quantity) * quantityProduced;
      const batches = await prisma.rawMaterialBatch.findMany({
        where: { materialId: item.rawMaterialId },
        orderBy: { createdAt: 'asc' },
      });
      const available = batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
      if (required > available) {
        errors.push(`${item.rawMaterial?.name ?? 'Raw material'}: required ${required}, available ${available}`);
      }
    }
  }

  if (bom?.packagingItems?.length) {
    for (const item of bom.packagingItems) {
      if (!item.packagingId || item.quantity == null) continue;
      const required = Number(item.quantity) * quantityProduced;
      const batches = await prisma.packagingBatch.findMany({
        where: { packagingId: item.packagingId },
        orderBy: { createdAt: 'asc' },
      });
      const available = batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
      if (required > available) {
        errors.push(`${item.packaging?.name ?? 'Packaging'}: required ${required}, available ${available}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Insufficient inventory. Cannot complete production:\n${errors.join('\n')}`);
  }

  if (bom?.rawItems?.length) {
    for (const item of bom.rawItems) {
      if (!item.rawMaterialId || item.quantity == null) continue;
      let remaining = Number(item.quantity) * quantityProduced;
      const batches = await prisma.rawMaterialBatch.findMany({
        where: { materialId: item.rawMaterialId },
        orderBy: { createdAt: 'asc' },
      });
      for (const batch of batches) {
        if (remaining <= 0) break;
        const avail = Number(batch.quantity ?? 0);
        if (avail <= 0) continue;
        const deduct = Math.min(remaining, avail);
        await prisma.rawMaterialBatch.update({
          where: { id: batch.id },
          data: { quantity: avail - deduct },
        });
        remaining -= deduct;
      }
    }
  }

  if (bom?.packagingItems?.length) {
    for (const item of bom.packagingItems) {
      if (!item.packagingId || item.quantity == null) continue;
      let remaining = Number(item.quantity) * quantityProduced;
      const batches = await prisma.packagingBatch.findMany({
        where: { packagingId: item.packagingId },
        orderBy: { createdAt: 'asc' },
      });
      for (const batch of batches) {
        if (remaining <= 0) break;
        const avail = Number(batch.quantity ?? 0);
        if (avail <= 0) continue;
        const deduct = Math.min(remaining, avail);
        await prisma.packagingBatch.update({
          where: { id: batch.id },
          data: { quantity: avail - deduct },
        });
        remaining -= deduct;
      }
    }
  }

  const batch = await prisma.productionBatch.findUnique({ where: { id: productionId } });
  if (batch?.productId && batch.quantityProduced != null && Number(batch.quantityProduced) > 0) {
    await prisma.finishedGoodsBatch.create({
      data: {
        productId: batch.productId,
        batchNumber: batch.batchNumber || `PROD-${productionId.slice(0, 8)}`,
        manufacturingDate: batch.manufacturingDate || new Date(),
        expiryDate: batch.expiryDate || null,
        quantityAvailable: batch.quantityProduced,
      },
    });
  }
}

export async function createProductionBatch(data: {
  productId?: string;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  quantityProduced?: string;
  status?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const quantityProduced = data.quantityProduced ? parseFloat(data.quantityProduced) : null;
  const status = data.status || 'running';

  const created = await prisma.productionBatch.create({
    data: {
      productId: data.productId?.trim() || null,
      batchNumber: data.batchNumber?.trim() || null,
      manufacturingDate: data.manufacturingDate ? new Date(data.manufacturingDate) : null,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      quantityProduced,
      status,
    },
  });

  if (status === 'completed' && created.productId && quantityProduced != null && quantityProduced > 0) {
    await onProductionCompleted(created.id, created.productId, quantityProduced);
  }

  revalidatePath('/admin/production');
  revalidatePath('/admin/raw-material-inventory');
  revalidatePath('/admin/packaging');
  revalidatePath('/admin/materials');
  revalidatePath('/admin/finished-goods');
}

export async function updateProductionBatch(id: string, data: {
  productId?: string;
  batchNumber?: string;
  manufacturingDate?: string;
  expiryDate?: string;
  quantityProduced?: string;
  status?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const existing = await prisma.productionBatch.findUnique({ where: { id } });
  if (!existing) throw new Error('Batch not found');

  const wasCompleted = existing.status === 'completed';
  const nowCompleted = data.status === 'completed';

  const quantityProduced = data.quantityProduced != null ? parseFloat(data.quantityProduced) : Number(existing.quantityProduced ?? 0);

  await prisma.productionBatch.update({
    where: { id },
    data: {
      productId: data.productId?.trim() || null,
      batchNumber: data.batchNumber?.trim() || null,
      manufacturingDate: data.manufacturingDate ? new Date(data.manufacturingDate) : null,
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      quantityProduced: data.quantityProduced != null ? parseFloat(data.quantityProduced) : existing.quantityProduced,
      status: data.status,
    },
  });

  if (!wasCompleted && nowCompleted && quantityProduced > 0 && existing.productId) {
    await onProductionCompleted(id, existing.productId, quantityProduced);
  }

  revalidatePath('/admin/production');
  revalidatePath(`/admin/production/${id}`);
  revalidatePath('/admin/finished-goods');
  revalidatePath('/admin/raw-material-inventory');
  revalidatePath('/admin/packaging');
  revalidatePath('/admin/materials');
}

export async function deleteProductionBatch(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await prisma.productionBatch.delete({ where: { id } });
  revalidatePath('/admin/production');
}
