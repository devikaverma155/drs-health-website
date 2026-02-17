/**
 * Product management abstraction.
 * Currently uses Prisma Product (mock). Storefront products come from WooCommerce.
 */

import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export type ProductInput = {
  handle: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  imageUrl?: string;
  category?: string;
  active?: boolean;
};

export async function getProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(data: ProductInput) {
  return prisma.product.create({
    data: {
      handle: data.handle,
      title: data.title,
      description: data.description ?? null,
      price: new Decimal(data.price),
      compareAtPrice: data.compareAtPrice != null ? new Decimal(data.compareAtPrice) : null,
      imageUrl: data.imageUrl ?? null,
      category: data.category ?? null,
      active: data.active ?? true,
    },
  });
}

export async function updateProduct(id: string, data: Partial<ProductInput>) {
  const update: Record<string, unknown> = {};
  if (data.title !== undefined) update.title = data.title;
  if (data.description !== undefined) update.description = data.description;
  if (data.handle !== undefined) update.handle = data.handle;
  if (data.price !== undefined) update.price = new Decimal(data.price);
  if (data.compareAtPrice !== undefined) update.compareAtPrice = data.compareAtPrice == null ? null : new Decimal(data.compareAtPrice);
  if (data.imageUrl !== undefined) update.imageUrl = data.imageUrl;
  if (data.category !== undefined) update.category = data.category;
  if (data.active !== undefined) update.active = data.active;
  return prisma.product.update({
    where: { id },
    data: update as Parameters<typeof prisma.product.update>[0]['data'],
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}
