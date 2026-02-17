'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import * as shopifyAdmin from '@/lib/shopify-admin';
import { revalidatePath } from 'next/cache';

type SaveInput = {
  id?: string;
  handle: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  imageUrl?: string;
  category?: string;
  active: boolean;
};

export async function saveProduct(input: SaveInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!input.handle.trim() || !input.title.trim()) throw new Error('Handle and title are required.');

  if (input.id) {
    await shopifyAdmin.updateProduct(input.id, {
      handle: input.handle,
      title: input.title,
      description: input.description,
      price: input.price,
      compareAtPrice: input.compareAtPrice,
      imageUrl: input.imageUrl,
      category: input.category,
      active: input.active,
    });
  } else {
    await shopifyAdmin.createProduct({
      handle: input.handle,
      title: input.title,
      description: input.description,
      price: input.price,
      compareAtPrice: input.compareAtPrice,
      imageUrl: input.imageUrl,
      category: input.category,
      active: input.active,
    });
  }
  revalidatePath('/admin/products');
  revalidatePath('/admin/content/bestsellers');
}

export async function deleteProduct(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  await shopifyAdmin.deleteProduct(id);
  revalidatePath('/admin/products');
  revalidatePath('/admin/content/bestsellers');
}
