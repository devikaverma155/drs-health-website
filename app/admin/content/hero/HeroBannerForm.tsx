'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveHeroBanner } from '@/app/admin/content/hero/actions';

type HeroBannerFields = {
  id: string;
  heading: string;
  subtext: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  imageUrl: string | null;
  sortOrder: number;
  active: boolean;
};

export function HeroBannerForm({ banner }: { banner?: HeroBannerFields | null }) {
  const router = useRouter();
  const [heading, setHeading] = useState(banner?.heading ?? '');
  const [subtext, setSubtext] = useState(banner?.subtext ?? '');
  const [ctaText, setCtaText] = useState(banner?.ctaText ?? '');
  const [ctaLink, setCtaLink] = useState(banner?.ctaLink ?? '');
  const [imageUrl, setImageUrl] = useState(banner?.imageUrl ?? '');
  const [sortOrder, setSortOrder] = useState(banner?.sortOrder ?? 0);
  const [active, setActive] = useState(banner?.active ?? true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await saveHeroBanner({
        id: banner?.id,
        heading: heading.trim(),
        subtext: subtext.trim() || null,
        ctaText: ctaText.trim() || null,
        ctaLink: ctaLink.trim() || null,
        imageUrl: imageUrl.trim() || null,
        sortOrder: Number(sortOrder) || 0,
        active,
      });
      router.push('/admin/content/hero');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl bg-white border border-slate-200 p-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Subtext</label>
        <input
          type="text"
          value={subtext}
          onChange={(e) => setSubtext(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">CTA text</label>
        <input
          type="text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">CTA link</label>
        <input
          type="text"
          value={ctaLink}
          onChange={(e) => setCtaLink(e.target.value)}
          placeholder="/shop or https://..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Sort order</label>
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm w-24"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <label htmlFor="active" className="text-sm text-slate-700">Active</label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
