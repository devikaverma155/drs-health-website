'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { setFeaturedProducts, FeaturedProductInput } from './actions';
import type { Product } from '@/lib/woocommerce/types';

interface CurrentFeatured {
  wooProductId: string | null;
  wooProductSlug: string | null;
  productName: string | null;
  productImage: string | null;
  sortOrder: number;
}

interface Props {
  allProducts: Product[];
  currentFeatured: CurrentFeatured[];
}

export default function BestSellersManager({ allProducts, currentFeatured }: Props) {
  // Build the initial selected list from DB data
  const initialSelected: FeaturedProductInput[] = currentFeatured.map((f) => ({
    wooProductId: f.wooProductId ?? '',
    wooProductSlug: f.wooProductSlug ?? '',
    productName: f.productName ?? '',
    productImage: f.productImage ?? '',
    sortOrder: f.sortOrder,
  }));

  const [selected, setSelected] = useState<FeaturedProductInput[]>(initialSelected);
  const [search, setSearch] = useState('');
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const selectedIds = new Set(selected.map((s) => s.wooProductId));

  const filteredProducts = allProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  function toggle(product: Product) {
    setSelected((prev) => {
      if (selectedIds.has(product.id)) {
        return prev.filter((s) => s.wooProductId !== product.id);
      }
      return [
        ...prev,
        {
          wooProductId: product.id,
          wooProductSlug: product.handle,
          productName: product.title,
          productImage: product.featuredImage?.url ?? '',
          sortOrder: prev.length,
        },
      ];
    });
    setSaved(false);
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    setSelected((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
    setSaved(false);
  }

  function moveDown(idx: number) {
    setSelected((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
    setSaved(false);
  }

  function remove(idx: number) {
    setSelected((prev) => prev.filter((_, i) => i !== idx));
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      try {
        await setFeaturedProducts(selected);
        setSaved(true);
      } catch {
        alert('Failed to save. Please try again.');
      }
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ── Left panel: All WooCommerce products ── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-semibold text-slate-700">
            All Products ({allProducts.length})
          </h2>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-2 w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="overflow-y-auto max-h-[520px] divide-y divide-slate-100">
          {filteredProducts.length === 0 && (
            <p className="p-6 text-center text-sm text-slate-400">No products found.</p>
          )}
          {filteredProducts.map((product) => {
            const isChecked = selectedIds.has(product.id);
            return (
              <label
                key={product.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors ${
                  isChecked ? 'bg-primary/5' : ''
                }`}
              >
                <input
                  type="checkbox"
                  className="rounded accent-primary"
                  checked={isChecked}
                  onChange={() => toggle(product)}
                />
                {product.featuredImage?.url ? (
                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src={product.featuredImage.url}
                      alt={product.title}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 text-xs">
                    IMG
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{product.title}</p>
                  <p className="text-xs text-slate-400">
                    ID: {product.id} · ₹{product.priceRange.minVariantPrice.amount}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Right panel: Selected best sellers (with order) ── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">
            Best Sellers ({selected.length} selected)
          </h2>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark disabled:opacity-60 transition-colors"
          >
            {isPending ? 'Saving…' : saved ? '✓ Saved!' : 'Save'}
          </button>
        </div>

        {selected.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-10 text-center">
            <div>
              <p className="text-slate-400 text-sm mb-1">No products selected yet.</p>
              <p className="text-slate-400 text-xs">
                Check products on the left to add them here.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[520px] divide-y divide-slate-100">
            {selected.map((item, idx) => (
              <div key={item.wooProductId} className="flex items-center gap-3 px-4 py-3">
                <span className="text-xs text-slate-400 w-5 text-center font-mono">{idx + 1}</span>
                {item.productImage ? (
                  <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-md bg-slate-100 flex-shrink-0" />
                )}
                <p className="text-sm text-slate-800 flex-1 truncate">{item.productName}</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    title="Move up"
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === selected.length - 1}
                    title="Move down"
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => remove(idx)}
                    title="Remove"
                    className="p-1 rounded text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selected.length > 0 && (
          <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
            <p className="text-xs text-slate-400">
              Tip: Use ↑↓ to reorder. Homepage shows products in this order.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
