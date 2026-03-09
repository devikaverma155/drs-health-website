'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function createBlogPost(data: {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string;
  isPublished?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');
  if (!data.slug?.trim()) throw new Error('Slug is required.');
  if (!data.title?.trim()) throw new Error('Title is required.');

  const slug = data.slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) throw new Error('A blog post with this slug already exists.');

  await prisma.blogPost.create({
    data: {
      slug,
      title: data.title.trim(),
      excerpt: data.excerpt?.trim() || null,
      content: data.content?.trim() || null,
      image: data.image?.trim() || null,
      category: data.category?.trim() || null,
      readTime: data.readTime?.trim() || null,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      isPublished: data.isPublished ?? true,
    },
  });

  revalidatePath('/admin/content/blogs');
  revalidatePath('/blog');
  revalidatePath('/');
}

export async function updateBlogPost(id: string, data: {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  readTime?: string;
  publishedAt?: string | null;
  isPublished?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  const slug = data.slug != null
    ? data.slug.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    : undefined;
  if (slug !== undefined) {
    const existing = await prisma.blogPost.findFirst({
      where: { slug, NOT: { id } },
    });
    if (existing) throw new Error('Another post with this slug already exists.');
  }

  await prisma.blogPost.update({
    where: { id },
    data: {
      ...(slug !== undefined && { slug }),
      title: data.title?.trim(),
      excerpt: data.excerpt?.trim() || null,
      content: data.content?.trim() || null,
      image: data.image?.trim() || null,
      category: data.category?.trim() || null,
      readTime: data.readTime?.trim() || null,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : data.publishedAt === null ? null : undefined,
      isPublished: data.isPublished,
    },
  });

  revalidatePath('/admin/content/blogs');
  revalidatePath(`/admin/content/blogs/${id}`);
  revalidatePath('/blog');
  revalidatePath('/');
}

export async function deleteBlogPost(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('Unauthorized');

  await prisma.blogPost.delete({ where: { id } });
  revalidatePath('/admin/content/blogs');
  revalidatePath('/blog');
  revalidatePath('/');
}
