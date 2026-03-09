import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ContentBlogsPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('Blog posts fetch failed (run `npx prisma generate` and restart dev server):', e);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Blog Posts</h1>
        <Link href="/admin/content/blogs/new" className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark">
          Add Blog Post
        </Link>
      </div>
      <p className="text-sm text-slate-500">
        Manage blog posts shown on the website. Posts appear at /blog and on the homepage blog preview.
      </p>
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No blog posts yet. Add your first post to show it on the website.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50/50">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    {p.image ? (
                      <div className="relative h-10 w-14 rounded overflow-hidden bg-slate-100">
                        <Image src={p.image} alt="" fill className="object-cover" unoptimized />
                      </div>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/content/blogs/${p.id}`} className="font-medium text-primary hover:underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{p.slug}</td>
                  <td className="px-4 py-3 text-slate-600">{p.category ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${p.isPublished ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {p.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Link href="/admin/content" className="text-sm text-slate-500 hover:text-slate-900">← Content</Link>
    </div>
  );
}
