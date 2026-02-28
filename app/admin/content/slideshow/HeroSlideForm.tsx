'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createHeroSlide, updateHeroSlide } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface SlideData {
  id: string;
  headline: string;
  subtext: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaHref: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  sortOrder: number;
  isActive: boolean;
}

export function HeroSlideForm({ slide }: { slide?: SlideData | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [headline, setHeadline] = useState(slide?.headline || '');
  const [subtext, setSubtext] = useState(slide?.subtext || '');
  const [ctaLabel, setCtaLabel] = useState(slide?.ctaLabel || '');
  const [ctaHref, setCtaHref] = useState(slide?.ctaHref || '');
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState(slide?.secondaryCtaLabel || '');
  const [secondaryCtaHref, setSecondaryCtaHref] = useState(slide?.secondaryCtaHref || '');
  const [imageUrl, setImageUrl] = useState(slide?.imageUrl || '');
  const [imageAlt, setImageAlt] = useState(slide?.imageAlt || '');
  const [sortOrder, setSortOrder] = useState(slide?.sortOrder ?? 0);
  const [isActive, setIsActive] = useState(slide?.isActive ?? true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (slide) {
        await updateHeroSlide(slide.id, {
          headline, subtext, ctaLabel, ctaHref,
          secondaryCtaLabel, secondaryCtaHref,
          imageUrl, imageAlt, sortOrder, isActive,
        });
      } else {
        await createHeroSlide({
          headline, subtext, ctaLabel, ctaHref,
          secondaryCtaLabel, secondaryCtaHref,
          imageUrl, imageAlt, sortOrder, isActive,
        });
      }
      router.push('/admin/content/slideshow');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save slide.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-xl bg-white border border-slate-200 p-6 relative">
      {/* Image Preview */}
      {imageUrl && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
          <Image
            src={imageUrl}
            alt={imageAlt || headline || 'Preview'}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-4">
            <div className="text-white">
              <p className="text-lg font-semibold">{headline || 'Headline Preview'}</p>
              {subtext && <p className="text-sm opacity-90">{subtext}</p>}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Headline *</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g., Syadwad Combo"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subtext</label>
          <textarea
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
            rows={2}
            disabled={loading}
            placeholder="Short description below the headline"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <p className="mt-1 text-xs text-slate-400">Recommended size: 1920×680px</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Image Alt Text</label>
          <input
            type="text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            disabled={loading}
            placeholder="Describe the image for accessibility"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-sm font-medium text-slate-600 mb-3">Primary Button</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
              <input
                type="text"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                disabled={loading}
                placeholder="e.g., Shop Products"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Button Link</label>
              <input
                type="text"
                value={ctaHref}
                onChange={(e) => setCtaHref(e.target.value)}
                disabled={loading}
                placeholder="e.g., /shop"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-sm font-medium text-slate-600 mb-3">Secondary Button (optional)</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
              <input
                type="text"
                value={secondaryCtaLabel}
                onChange={(e) => setSecondaryCtaLabel(e.target.value)}
                disabled={loading}
                placeholder="e.g., Free Consultation"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Button Link</label>
              <input
                type="text"
                value={secondaryCtaHref}
                onChange={(e) => setSecondaryCtaHref(e.target.value)}
                disabled={loading}
                placeholder="e.g., /consultation"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="mt-1 text-xs text-slate-400">Lower numbers appear first</p>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disabled={loading}
                className="rounded border-slate-300 text-primary focus:ring-primary/20"
              />
              <span className="text-sm font-medium text-slate-700">Active (visible on website)</span>
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
          {loading ? 'Saving…' : slide ? 'Update Slide' : 'Create Slide'}
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
            <p className="mt-2 text-sm text-slate-600">Saving slide...</p>
          </div>
        </div>
      )}
    </form>
  );
}
