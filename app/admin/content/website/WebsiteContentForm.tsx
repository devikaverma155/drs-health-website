'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWebsiteContent, updateWebsiteContent } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { WebsiteContent } from '@prisma/client';

export function WebsiteContentForm({ content }: { content?: WebsiteContent | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [sectionKey, setSectionKey] = useState(content?.sectionKey || '');
  const [title, setTitle] = useState(content?.title || '');
  const [subtitle, setSubtitle] = useState(content?.subtitle || '');
  const [imageUrl, setImageUrl] = useState(content?.imageUrl || '');
  const [ctaText, setCtaText] = useState(content?.ctaText || '');
  const [ctaLink, setCtaLink] = useState(content?.ctaLink || '');
  const [isActive, setIsActive] = useState(content?.isActive ?? true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (content) {
        await updateWebsiteContent(content.id, {
          sectionKey,
          title,
          subtitle,
          imageUrl,
          ctaText,
          ctaLink,
          isActive,
        });
      } else {
        await createWebsiteContent({
          sectionKey,
          title,
          subtitle,
          imageUrl,
          ctaText,
          ctaLink,
          isActive,
        });
      }
      router.push('/admin/content/website');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200 p-6 relative">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Section Key *</label>
          <input
            type="text"
            value={sectionKey}
            onChange={(e) => setSectionKey(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g., hero_banner, about_section"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
          <textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            rows={3}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">CTA Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">CTA Link</label>
            <input
              type="url"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              disabled={loading}
              className="rounded border-slate-300"
            />
            <span className="text-sm font-medium text-slate-700">Active</span>
          </label>
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? 'Saving…' : content ? 'Update Content' : 'Create Content'}
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
            <p className="mt-2 text-sm text-slate-600">Saving to database...</p>
          </div>
        </div>
      )}
    </form>
  );
}
