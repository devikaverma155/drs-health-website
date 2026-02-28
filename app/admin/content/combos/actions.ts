'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createComboOffer(data: {
  title: string;
  description?: string;
  imageUrl?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  ctaLabel?: string;
  ctaHref?: string;
  sortOrder?: number;
  isActive?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  if (!data.title?.trim()) throw new Error('Title is required.');

  const maxSort = await prisma.comboOffer.aggregate({ _max: { sortOrder: true } });
  const nextSort = (maxSort._max.sortOrder ?? -1) + 1;

  const combo = await prisma.comboOffer.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim() || null,
      imageUrl: data.imageUrl?.trim() || null,
      price: data.price?.trim() || null,
      originalPrice: data.originalPrice?.trim() || null,
      discount: data.discount?.trim() || null,
      ctaLabel: data.ctaLabel?.trim() || null,
      ctaHref: data.ctaHref?.trim() || null,
      sortOrder: data.sortOrder ?? nextSort,
      isActive: data.isActive ?? true,
    },
  });

  revalidatePath('/admin/content/combos');
  revalidatePath('/');
  return combo.id;
}

export async function updateComboOffer(id: string, data: {
  title?: string;
  description?: string;
  imageUrl?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  ctaLabel?: string;
  ctaHref?: string;
  sortOrder?: number;
  isActive?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.comboOffer.update({
    where: { id },
    data: {
      title: data.title?.trim(),
      description: data.description?.trim() || null,
      imageUrl: data.imageUrl?.trim() || null,
      price: data.price?.trim() || null,
      originalPrice: data.originalPrice?.trim() || null,
      discount: data.discount?.trim() || null,
      ctaLabel: data.ctaLabel?.trim() || null,
      ctaHref: data.ctaHref?.trim() || null,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
  });

  revalidatePath('/admin/content/combos');
  revalidatePath(`/admin/content/combos/${id}`);
  revalidatePath('/');
}

export async function deleteComboOffer(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.comboOffer.delete({ where: { id } });
  revalidatePath('/admin/content/combos');
  revalidatePath('/');
}
