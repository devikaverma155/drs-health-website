'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createBlogPost, updateBlogPost } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  category: string | null;
  readTime: string | null;
  publishedAt: Date | null;
  isPublished: boolean;
}

export function BlogPostForm({ post }: { post?: BlogPostData | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [slug, setSlug] = useState(post?.slug || '');
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState(post?.image || '');
  const [category, setCategory] = useState(post?.category || '');
  const [readTime, setReadTime] = useState(post?.readTime || '');
  const [publishedAt, setPublishedAt] = useState(
    post?.publishedAt ? post.publishedAt.toISOString().slice(0, 10) : ''
  );
  const [isPublished, setIsPublished] = useState(post?.isPublished ?? true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (post) {
        await updateBlogPost(post.id, {
          slug, title, excerpt, content, image, category, readTime,
          publishedAt: publishedAt || null, isPublished,
        });
      } else {
        await createBlogPost({
          slug, title, excerpt, content, image, category, readTime,
          publishedAt: publishedAt || undefined, isPublished,
        });
      }
      router.push('/admin/content/blogs');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog post.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">URL slug *</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g. my-ayurveda-post"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <p className="mt-1 text-xs text-slate-400">Used in URL: /blog/{slug || '...'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            placeholder="Blog post title"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            disabled={loading}
            placeholder="Short summary for listing pages"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            disabled={loading}
            placeholder="Full article content (plain text or markdown)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            disabled={loading}
            placeholder="https://drshealth.in/wp-content/uploads/..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          {image && (
            <div className="relative mt-2 h-32 w-full max-w-xs rounded-lg overflow-hidden bg-slate-100">
              <Image src={image} alt="" fill className="object-cover" unoptimized />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              placeholder="e.g. Herbal Remedies"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Read time</label>
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              disabled={loading}
              placeholder="e.g. 5 min read"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Publish date</label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                disabled={loading}
                className="rounded border-slate-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm font-medium text-slate-700">Published (visible on website)</span>
            </label>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : post ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm text-slate-600">Saving...</p>
          </div>
        </div>
      )}
    </form>
  );
}
