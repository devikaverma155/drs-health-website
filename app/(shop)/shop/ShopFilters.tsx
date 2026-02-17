'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { slug: '', label: 'All categories' },
  { slug: 'weight-management', label: 'Weight Management' },
  { slug: 'liver-care', label: 'Liver Care' },
  { slug: 'immunity', label: 'Immunity' },
  { slug: 'diabetes', label: 'Diabetes' },
  { slug: 'digestive-care', label: 'Digestive Care' },
  { slug: 'anti-migraine', label: 'Anti-migraine' },
  { slug: 'body-care', label: 'Body Care' },
  { slug: 'healthy-hairs', label: 'Healthy Hairs' },
  { slug: 'skin-disorders', label: 'Skin Disorders' },
];

const PRICE_RANGES = [
  { min: undefined, max: undefined, label: 'Any price' },
  { min: 0, max: 299, label: 'Under ₹299' },
  { min: 300, max: 499, label: '₹299 – ₹499' },
  { min: 500, max: 999, label: '₹500 – ₹999' },
  { min: 1000, max: undefined, label: '₹1000+' },
];

export function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') ?? '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const newOnly = searchParams.get('new') === '1';

  function updateFilters(updates: { category?: string; minPrice?: string; maxPrice?: string; new?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    if (updates.category !== undefined) {
      if (updates.category) params.set('category', updates.category);
      else params.delete('category');
    }
    if (updates.minPrice !== undefined) {
      if (updates.minPrice) params.set('minPrice', updates.minPrice);
      else params.delete('minPrice');
    }
    if (updates.maxPrice !== undefined) {
      if (updates.maxPrice) params.set('maxPrice', updates.maxPrice);
      else params.delete('maxPrice');
    }
    if (updates.new !== undefined) {
      if (updates.new === '1') params.set('new', '1');
      else params.delete('new');
    }
    params.delete('page');
    router.push(`/shop${params.toString() ? `?${params.toString()}` : ''}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 border-b border-border">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-foreground">Category:</span>
        <select
          value={category}
          onChange={(e) => updateFilters({ category: e.target.value })}
          className="rounded-md border border-input-border bg-white px-3 py-2 text-sm text-foreground"
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug || 'all'} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-foreground">Price:</span>
        <select
          value={[minPrice ?? '', maxPrice ?? ''].join('-')}
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return updateFilters({ minPrice: '', maxPrice: '' });
            const [min, max] = v.split('-');
            updateFilters({ minPrice: min || '', maxPrice: max || '' });
          }}
          className="rounded-md border border-input-border bg-white px-3 py-2 text-sm text-foreground"
        >
          {PRICE_RANGES.map((r) => {
            const val =
              r.min == null && r.max == null
                ? ''
                : `${r.min ?? ''}-${r.max ?? ''}`;
            return (
              <option key={val || 'any'} value={val}>
                {r.label}
              </option>
            );
          })}
        </select>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={newOnly}
          onChange={(e) => updateFilters({ new: e.target.checked ? '1' : '' })}
          className="rounded border-input-border text-primary focus:ring-primary"
        />
        <span className="text-sm text-foreground">New arrivals only</span>
      </label>
    </div>
  );
}
