'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/** When production is marked completed: check Product Master requirements × quantityProduced against inventory, deduct RM/PM (FIFO), then add to FG. */
async function onProductionCompleted(productionId: string, productId: string, quantityProduced: number) {
  if (quantityProduced <= 0) return;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      requirements: {
        include: {
          rawMaterial: true,
          packagingMaterial: true,
        },
      },
    },
  });

  if (!product?.requirements?.length) {
    throw new Error(
      'No material requirements defined for this product. Add raw & packaging per unit in Product Master → Product → Material Requirements.'
    );
  }

  const errors: string[] = [];

  for (const req of product.requirements) {
    if (req.rawMaterialId && req.rawMaterial) {
      const required = Number(req.quantityPerUnit ?? 0) * quantityProduced;
      if (required <= 0) continue;
      const batches = await prisma.rawMaterialBatch.findMany({
        where: { materialId: req.rawMaterialId },
        orderBy: { createdAt: 'asc' },
      });
      const available = batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
      if (required > available) {
        errors.push(`${req.rawMaterial.name ?? 'Raw material'}: required ${required}, available ${available}`);
      }
    }
    if (req.packagingMaterialId && req.packagingMaterial) {
      const required = Number(req.quantityPerUnit ?? 0) * quantityProduced;
      if (required <= 0) continue;
      const batches = await prisma.packagingBatch.findMany({
        where: { packagingId: req.packagingMaterialId },
        orderBy: { createdAt: 'asc' },
      });
      const available = batches.reduce((s, b) => s + Number(b.quantity ?? 0), 0);
      if (required > available) {
        errors.push(`${req.packagingMaterial.name ?? 'Packaging'}: required ${required}, available ${available}`);
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Insufficient inventory. Cannot complete production:\n${errors.join('\n')}`);
  }

  for (const req of product.requirements) {
    if (req.rawMaterialId && req.quantityPerUnit != null) {
      let remaining = Number(req.quantityPerUnit) * quantityProduced;
      const batches = await prisma.rawMaterialBatch.findMany({
        where: { materialId: req.rawMaterialId },
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
    if (req.packagingMaterialId && req.quantityPerUnit != null) {
      let remaining = Number(req.quantityPerUnit) * quantityProduced;
      const batches = await prisma.packagingBatch.findMany({
        where: { packagingId: req.packagingMaterialId },
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
