'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/woocommerce';
import { getCheckoutUrl } from '@/lib/woocommerce';

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = getCheckoutUrl(product.id, quantity);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {product.variants.length > 1 && (
        <div>
          <label htmlFor="variant" className="block text-sm font-medium text-foreground mb-1">
            Variant
          </label>
          <select
            id="variant"
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="w-full rounded-md border border-input-border bg-white px-4 py-3 text-foreground"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-1">
          Quantity
        </label>
        <div className="flex items-center border border-border rounded-md w-fit">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-gray-100"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-14 text-center border-0 bg-transparent [appearance:textfield]"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="w-11 h-11 flex items-center justify-center text-foreground hover:bg-gray-100"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      </div>
      <Button type="submit" variant="primary">
        Add to Cart
      </Button>
    </form>
  );
}
