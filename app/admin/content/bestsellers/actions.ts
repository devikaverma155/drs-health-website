'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function saveBestSellers(
  items: { productId: string; sortOrder: number }[]
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.$transaction(async (tx) => {
    await tx.bestSellerConfig.deleteMany({});
    if (items.length > 0) {
      await tx.bestSellerConfig.createMany({
        data: items.map((item) => ({
          productId: item.productId,
          sortOrder: item.sortOrder,
        })),
      });
    }
  });

  revalidatePath('/admin/content');
  revalidatePath('/admin/content/bestsellers');
}
