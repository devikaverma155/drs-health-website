import { prisma } from '@/lib/prisma';

/** Total on-hand quantity from all batches (FIFO source of truth). */
export async function sumRawMaterialBatchQuantity(materialId: string): Promise<number> {
  const r = await prisma.rawMaterialBatch.aggregate({
    where: { materialId },
    _sum: { quantity: true },
  });
  return Number(r._sum.quantity ?? 0);
}

export async function sumPackagingBatchQuantity(packagingId: string): Promise<number> {
  const r = await prisma.packagingBatch.aggregate({
    where: { packagingId },
    _sum: { quantity: true },
  });
  return Number(r._sum.quantity ?? 0);
}

/** Keep master `current_stock` aligned with batches (reports, legacy reads). */
export async function syncRawMaterialCurrentStock(materialId: string): Promise<void> {
  const total = await sumRawMaterialBatchQuantity(materialId);
  await prisma.rawMaterial.update({
    where: { id: materialId },
    data: { currentStock: total },
  });
}

export async function syncPackagingCurrentStock(packagingId: string): Promise<void> {
  const total = await sumPackagingBatchQuantity(packagingId);
  await prisma.packagingMaterial.update({
    where: { id: packagingId },
    data: { currentStock: total },
  });
}

/** On-hand per material from batches (same basis as production FIFO). */
export async function loadRawBatchStockMap(materialIds: string[]): Promise<Map<string, number>> {
  const uniq = Array.from(new Set(materialIds)).filter(Boolean);
  if (uniq.length === 0) return new Map();
  const rows = await prisma.rawMaterialBatch.groupBy({
    by: ['materialId'],
    where: { materialId: { in: uniq } },
    _sum: { quantity: true },
  });
  const m = new Map<string, number>();
  for (const r of rows) {
    if (r.materialId != null) m.set(r.materialId, Number(r._sum.quantity ?? 0));
  }
  return m;
}

export async function loadPackagingBatchStockMap(packagingIds: string[]): Promise<Map<string, number>> {
  const uniq = Array.from(new Set(packagingIds)).filter(Boolean);
  if (uniq.length === 0) return new Map();
  const rows = await prisma.packagingBatch.groupBy({
    by: ['packagingId'],
    where: { packagingId: { in: uniq } },
    _sum: { quantity: true },
  });
  const m = new Map<string, number>();
  for (const r of rows) {
    if (r.packagingId != null) m.set(r.packagingId, Number(r._sum.quantity ?? 0));
  }
  return m;
}
