import { prisma } from '@/lib/prisma';

export interface BlogPostItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

export async function getPublishedBlogPosts(): Promise<BlogPostItem[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
    return posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.publishedAt ? p.publishedAt.toISOString().slice(0, 10) : p.createdAt?.toISOString().slice(0, 10) ?? '',
      excerpt: p.excerpt ?? '',
      image: p.image ?? '',
      category: p.category ?? '',
      readTime: p.readTime ?? '',
    }));
  } catch {
    return [];
  }
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<{
  title: string;
  date: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  excerpt: string;
} | null> {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug, isPublished: true },
    });
    if (!post) return null;
    return {
      title: post.title,
      date: post.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : post.createdAt?.toISOString().slice(0, 10) ?? '',
      content: post.content ?? '',
      image: post.image ?? '',
      category: post.category ?? '',
      readTime: post.readTime ?? '',
      excerpt: post.excerpt ?? '',
    };
  } catch {
    return null;
  }
}
