'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addOrderItem, deleteOrderItem } from './actions';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

type Product = { id: string; name: string };
type OrderItem = { id: string; productId: string | null; quantity: unknown; product?: { name: string } | null };

export function OrderItemsSection({
  orderId,
  items,
  products,
}: { orderId: string; items: OrderItem[]; products: Product[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!productId || !quantity) return;
    setLoading(true);
    try {
      await addOrderItem(orderId, productId, quantity);
      setProductId('');
      setQuantity('');
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(itemId: string) {
    if (!confirm('Remove this item?')) return;
    setLoading(true);
    try {
      await deleteOrderItem(itemId, orderId);
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6">
      <h2 className="font-medium text-slate-900 mb-4">Order items</h2>
      {items.length === 0 ? (
        <p className="text-sm text-slate-500 mb-4">No items yet. Add products below.</p>
      ) : (
        <ul className="space-y-2 text-sm mb-4">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2">
              <span>{item.product?.name ?? 'Product'} × {item.quantity != null ? String(item.quantity) : 0}</span>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={loading}
                className="text-red-600 hover:underline text-xs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-2">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Product</label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Select...</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Qty</label>
          <input
            type="number"
            min="0.01"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm w-24"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !productId || !quantity}
          className="rounded-lg bg-primary text-white px-3 py-2 text-sm font-medium hover:bg-primary-dark disabled:opacity-50 flex items-center gap-1"
        >
          {loading && <LoadingSpinner size="sm" />}
          Add item
        </button>
      </form>
    </div>
  );
}
