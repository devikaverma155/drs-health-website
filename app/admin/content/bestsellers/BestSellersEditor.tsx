'use client';

import { useState } from 'react';
import { saveBestSellers } from './actions';
import type { BestSellerConfig, Product } from '@prisma/client';

export function BestSellersEditor({
  configs,
  products,
}: {
  configs: BestSellerConfig[];
  products: Product[];
}) {
  const [items, setItems] = useState(() =>
    configs.map((c) => ({ productId: c.productId, sortOrder: c.sortOrder }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const productMap = new Map(products.map((p) => [p.id, p]));
  const currentIds = items.map((i) => i.productId);

  function addProduct(productId: string) {
    if (!productId || currentIds.includes(productId)) return;
    setItems((prev) => [...prev, { productId, sortOrder: prev.length }]);
  }

  function removeAt(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index <= 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next.map((item, i) => ({ ...item, sortOrder: i }));
    });
  }

  function moveDown(index: number) {
    if (index >= items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next.map((item, i) => ({ ...item, sortOrder: i }));
    });
  }

  async function handleSave() {
    setError('');
    setLoading(true);
    try {
      await saveBestSellers(items.map((i) => ({ productId: i.productId, sortOrder: i.sortOrder })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      <div className="flex gap-2 items-center">
        <select
          value=""
          onChange={(e) => {
            addProduct(e.target.value);
            e.target.value = '';
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Add product…</option>
          {products
            .filter((p) => !currentIds.includes(p.id))
            .map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
        </select>
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Save order'}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <ul className="space-y-2">
        {items.map((item, index) => {
          const product = productMap.get(item.productId);
          return (
            <li
              key={`${item.productId}-${index}`}
              className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
            >
              <span className="text-sm text-slate-700">
                {product?.title ?? item.productId}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === items.length - 1}
                  className="text-slate-400 hover:text-slate-600 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {items.length === 0 && (
        <p className="text-sm text-slate-500">No featured products. Add products from the dropdown.</p>
      )}
    </div>
  );
}
