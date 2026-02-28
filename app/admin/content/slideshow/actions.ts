'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createHeroSlide(data: {
  headline: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  sortOrder?: number;
  isActive?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  if (!data.headline?.trim()) throw new Error('Headline is required.');

  const maxSort = await prisma.heroSlide.aggregate({ _max: { sortOrder: true } });
  const nextSort = (maxSort._max.sortOrder ?? -1) + 1;

  const slide = await prisma.heroSlide.create({
    data: {
      headline: data.headline.trim(),
      subtext: data.subtext?.trim() || null,
      ctaLabel: data.ctaLabel?.trim() || null,
      ctaHref: data.ctaHref?.trim() || null,
      secondaryCtaLabel: data.secondaryCtaLabel?.trim() || null,
      secondaryCtaHref: data.secondaryCtaHref?.trim() || null,
      imageUrl: data.imageUrl?.trim() || null,
      imageAlt: data.imageAlt?.trim() || null,
      sortOrder: data.sortOrder ?? nextSort,
      isActive: data.isActive ?? true,
    },
  });

  revalidatePath('/admin/content/slideshow');
  revalidatePath('/');
  return slide.id;
}

export async function updateHeroSlide(id: string, data: {
  headline?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  sortOrder?: number;
  isActive?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.heroSlide.update({
    where: { id },
    data: {
      headline: data.headline?.trim(),
      subtext: data.subtext?.trim() || null,
      ctaLabel: data.ctaLabel?.trim() || null,
      ctaHref: data.ctaHref?.trim() || null,
      secondaryCtaLabel: data.secondaryCtaLabel?.trim() || null,
      secondaryCtaHref: data.secondaryCtaHref?.trim() || null,
      imageUrl: data.imageUrl?.trim() || null,
      imageAlt: data.imageAlt?.trim() || null,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
  });

  revalidatePath('/admin/content/slideshow');
  revalidatePath(`/admin/content/slideshow/${id}`);
  revalidatePath('/');
}

export async function deleteHeroSlide(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath('/admin/content/slideshow');
  revalidatePath('/');
}
