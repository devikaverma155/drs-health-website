'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ShopFiltersProps {
  categories: Array<{ slug: string; label: string; count?: number }>;
}

const PRICE_RANGES = [
  { min: undefined, max: undefined, label: 'Any price' },
  { min: 0, max: 299, label: 'Under ₹299' },
  { min: 300, max: 499, label: '₹300 – ₹499' },
  { min: 500, max: 999, label: '₹500 – ₹999' },
  { min: 1000, max: undefined, label: '₹1000+' },
];

export function ShopFilters({ categories }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  const activeCategory = searchParams.get('category') ?? '';
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const newOnly = searchParams.get('new') === '1';
  const activePriceKey = [minPrice ?? '', maxPrice ?? ''].join('-');

  const activeCount =
    (activeCategory ? 1 : 0) +
    (minPrice || maxPrice ? 1 : 0) +
    (newOnly ? 1 : 0);

  function updateFilters(updates: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    new?: string;
  }) {
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

  function clearAll() {
    router.push('/shop');
  }

  /* ─── Shared filter panel content ─── */
  const filterContent = (
    <div className="space-y-6">
      {/* Categories accordion */}
      <div>
        <button
          type="button"
          onClick={() => setCatOpen(!catOpen)}
          className="flex w-full items-center justify-between py-2 text-base font-semibold text-foreground"
        >
          Collections
          <svg
            className={`w-4 h-4 text-body-muted transition-transform ${catOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {catOpen && (
          <div className="mt-2 space-y-0.5 max-h-72 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => updateFilters({ category: '' })}
              className={`block w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                !activeCategory
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground hover:bg-soft-bg'
              }`}
            >
              All Products
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => updateFilters({ category: c.slug })}
                className={`flex w-full items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  activeCategory === c.slug
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground hover:bg-soft-bg'
                }`}
              >
                <span>{c.label}</span>
                {c.count != null && (
                  <span className="text-xs text-body-muted">{c.count}</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <hr className="border-border" />

      {/* Price accordion */}
      <div>
        <button
          type="button"
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex w-full items-center justify-between py-2 text-base font-semibold text-foreground"
        >
          Price
          <svg
            className={`w-4 h-4 text-body-muted transition-transform ${priceOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {priceOpen && (
          <div className="mt-2 space-y-0.5">
            {PRICE_RANGES.map((r) => {
              const val =
                r.min == null && r.max == null
                  ? ''
                  : `${r.min ?? ''}-${r.max ?? ''}`;
              const active = val === '' ? !minPrice && !maxPrice : activePriceKey === val;
              return (
                <button
                  key={val || 'any'}
                  type="button"
                  onClick={() => {
                    if (val === '') {
                      updateFilters({ minPrice: '', maxPrice: '' });
                    } else {
                      const [min, max] = val.split('-');
                      updateFilters({ minPrice: min || '', maxPrice: max || '' });
                    }
                  }}
                  className={`block w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-soft-bg'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <hr className="border-border" />

      {/* New arrivals toggle */}
      <label className="flex items-center gap-3 cursor-pointer px-2 py-1">
        <input
          type="checkbox"
          checked={newOnly}
          onChange={(e) => updateFilters({ new: e.target.checked ? '1' : '' })}
          className="w-4 h-4 rounded border-input-border text-primary focus:ring-primary accent-primary"
        />
        <span className="text-sm text-foreground font-medium">New arrivals only</span>
      </label>

      {/* Clear all */}
      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="w-full text-center text-sm text-primary hover:text-primary-dark font-medium py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ─── Desktop sidebar ─── */}
      <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0">
        <div className="sticky top-28">
          <h2 className="text-xl font-semibold text-foreground mb-4">Filters</h2>
          {filterContent}
        </div>
      </aside>

      {/* ─── Mobile filter button ─── */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl shadow-sm text-sm font-medium text-foreground hover:shadow-card transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* ─── Mobile drawer overlay ─── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Slide-up panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 text-body-muted hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {filterContent}
            </div>

            {/* Apply button */}
            <div className="border-t border-border px-5 py-4">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-dark transition-colors"
              >
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
