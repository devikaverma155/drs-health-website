'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createComboOffer, updateComboOffer } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface ComboData {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: string | null;
  originalPrice: string | null;
  discount: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  sortOrder: number;
  isActive: boolean;
}

export function ComboOfferForm({ combo }: { combo?: ComboData | null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(combo?.title || '');
  const [description, setDescription] = useState(combo?.description || '');
  const [imageUrl, setImageUrl] = useState(combo?.imageUrl || '');
  const [price, setPrice] = useState(combo?.price || '');
  const [originalPrice, setOriginalPrice] = useState(combo?.originalPrice || '');
  const [discount, setDiscount] = useState(combo?.discount || '');
  const [ctaLabel, setCtaLabel] = useState(combo?.ctaLabel || 'Add to Cart');
  const [ctaHref, setCtaHref] = useState(combo?.ctaHref || '/shop');
  const [sortOrder, setSortOrder] = useState(combo?.sortOrder ?? 0);
  const [isActive, setIsActive] = useState(combo?.isActive ?? true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (combo) {
        await updateComboOffer(combo.id, {
          title, description, imageUrl, price,
          originalPrice, discount, ctaLabel, ctaHref,
          sortOrder, isActive,
        });
      } else {
        await createComboOffer({
          title, description, imageUrl, price,
          originalPrice, discount, ctaLabel, ctaHref,
          sortOrder, isActive,
        });
      }
      router.push('/admin/content/combos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save combo.');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-xl bg-white border border-slate-200 p-6 relative">
      {/* Preview Card */}
      {(imageUrl || title) && (
        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
          <div className="grid grid-cols-2 gap-0">
            {imageUrl && (
              <div className="relative h-40 bg-slate-100">
                <Image
                  src={imageUrl}
                  alt={title || 'Preview'}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {discount && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    {discount} OFF
                  </span>
                )}
              </div>
            )}
            <div className="p-4 flex flex-col justify-center">
              <p className="font-semibold text-slate-900">{title || 'Combo Name'}</p>
              {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
              <div className="flex items-center gap-2 mt-2">
                {price && <span className="text-lg font-bold text-primary">{price}</span>}
                {originalPrice && <span className="text-sm text-slate-400 line-through">{originalPrice}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Combo Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            placeholder="e.g., Wellness Combo"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            disabled={loading}
            placeholder="Short description of the combo"
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
            placeholder="https://example.com/combo-image.jpg"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-sm font-medium text-slate-600 mb-3">💰 Pricing</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sale Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={loading}
                placeholder="₹1,499"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Original Price</label>
              <input
                type="text"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                disabled={loading}
                placeholder="₹1,999"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Discount Label</label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                disabled={loading}
                placeholder="25%"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-sm font-medium text-slate-600 mb-3">🔗 Button</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
              <input
                type="text"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                disabled={loading}
                placeholder="Add to Cart"
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
                placeholder="/shop"
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
          {loading ? 'Saving…' : combo ? 'Update Combo' : 'Create Combo'}
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
            <p className="mt-2 text-sm text-slate-600">Saving combo...</p>
          </div>
        </div>
      )}
    </form>
  );
}
