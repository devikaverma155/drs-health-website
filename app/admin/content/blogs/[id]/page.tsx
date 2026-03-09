import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BlogPostForm } from '../BlogPostForm';
import { DeleteBlogButton } from '../DeleteBlogButton';

export const dynamic = 'force-dynamic';

export default async function EditContentBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/content/blogs" className="text-sm text-slate-500 hover:text-slate-700">
            ← Back to Blog Posts
          </Link>
        </div>
        <DeleteBlogButton id={post.id} title={post.title} />
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">Edit Blog Post</h1>
      <BlogPostForm post={post} />
    </div>
  );
}
