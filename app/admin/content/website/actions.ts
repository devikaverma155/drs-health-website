'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createWebsiteContent(data: {
  sectionKey: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  isActive?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  
  if (!data.sectionKey?.trim()) throw new Error('Section key is required.');

  const content = await prisma.websiteContent.create({
    data: {
      sectionKey: data.sectionKey.trim(),
      title: data.title?.trim() || null,
      subtitle: data.subtitle?.trim() || null,
      imageUrl: data.imageUrl?.trim() || null,
      ctaText: data.ctaText?.trim() || null,
      ctaLink: data.ctaLink?.trim() || null,
      isActive: data.isActive ?? true,
    },
  });

  revalidatePath('/admin/content/website');
  return content.id;
}

export async function updateWebsiteContent(id: string, data: {
  sectionKey?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  isActive?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.websiteContent.update({
    where: { id },
    data: {
      sectionKey: data.sectionKey?.trim(),
      title: data.title?.trim() || null,
      subtitle: data.subtitle?.trim() || null,
      imageUrl: data.imageUrl?.trim() || null,
      ctaText: data.ctaText?.trim() || null,
      ctaLink: data.ctaLink?.trim() || null,
      isActive: data.isActive,
    },
  });

  revalidatePath('/admin/content/website');
  revalidatePath(`/admin/content/website/${id}`);
}

export async function deleteWebsiteContent(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.websiteContent.delete({ where: { id } });
  revalidatePath('/admin/content/website');
}
