'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export interface FeaturedProductInput {
  wooProductId: string;
  wooProductSlug: string;
  productName: string;
  productImage: string;
  sortOrder: number;
}

/**
 * Replace the entire bestsellers list atomically.
 * Deletes all existing "bestsellers" records, then inserts the new ordered list.
 */
export async function setFeaturedProducts(products: FeaturedProductInput[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  // Delete existing, then create new in a transaction
  await prisma.$transaction([
    prisma.featuredProduct.deleteMany({ where: { section: 'bestsellers' } }),
    prisma.featuredProduct.createMany({
      data: products.map((p, idx) => ({
        wooProductId: p.wooProductId,
        wooProductSlug: p.wooProductSlug,
        productName: p.productName,
        productImage: p.productImage,
        sortOrder: idx,
        isActive: true,
        section: 'bestsellers',
      })),
    }),
  ]);

  // Revalidate all paths that use BestSellersSection
  revalidatePath('/', 'layout');
  revalidatePath('/admin/content/bestsellers');
}
