'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/woocommerce';
import { useCart } from '@/lib/cartContext';
import { useRouter } from 'next/navigation';

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const variant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
      const price = variant?.price ?? product.priceRange.minVariantPrice.amount;

      addToCart({
        productId: product.id,
        productName: product.title,
        price,
        image: product.featuredImage?.url,
        quantity,
        permalink: product.permalink,
      });

      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
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
      <div className="flex gap-3">
        <Button type="submit" variant="primary" disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </div>
      {showNotification && (
        <div className="text-green-600 text-sm font-medium animate-fade-out">
          ✓ Added to cart! <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push('/cart');
            }}
            className="ml-2 text-green-700 underline hover:text-green-800"
          >
            View Cart
          </button>
        </div>
      )}
    </form>
  );
}
