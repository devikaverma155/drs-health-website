'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type SaveInput = {
  id?: string;
  heading: string;
  subtext: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  imageUrl: string | null;
  sortOrder: number;
  active: boolean;
};

export async function saveHeroBanner(input: SaveInput) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!input.heading.trim()) throw new Error('Heading is required.');

  if (input.id) {
    await prisma.heroBanner.update({
      where: { id: input.id },
      data: {
        heading: input.heading,
        subtext: input.subtext,
        ctaText: input.ctaText,
        ctaLink: input.ctaLink,
        imageUrl: input.imageUrl,
        sortOrder: input.sortOrder,
        active: input.active,
      },
    });
  } else {
    await prisma.heroBanner.create({
      data: {
        heading: input.heading,
        subtext: input.subtext,
        ctaText: input.ctaText,
        ctaLink: input.ctaLink,
        imageUrl: input.imageUrl,
        sortOrder: input.sortOrder,
        active: input.active,
      },
    });
  }
  revalidatePath('/admin/content');
  revalidatePath('/admin/content/hero');
}
