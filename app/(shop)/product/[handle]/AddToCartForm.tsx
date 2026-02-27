'use client';

import { useState } from 'react';
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

  const variant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const price = variant?.price ?? product.priceRange.minVariantPrice.amount;

  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      addToCart({
        productId: product.id,
        productName: product.title,
        price,
        image: product.featuredImage?.url,
        quantity,
        permalink: product.permalink,
      });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2500);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      productName: product.title,
      price,
      image: product.featuredImage?.url,
      quantity,
      permalink: product.permalink,
    });
    if (product.permalink) {
      window.open(product.permalink, '_blank');
    } else {
      router.push('/cart');
    }
  };

  return (
    <div className="mt-8 space-y-5">
      {/* Variant selector */}
      {product.variants.length > 1 && (
        <div>
          <label htmlFor="variant" className="block text-sm font-medium text-foreground mb-2">
            Variant
          </label>
          <select
            id="variant"
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="w-full rounded-lg border border-input-border bg-white px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity + Add to Cart + Buy Now */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center border border-border rounded-lg overflow-hidden">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="w-10 h-11 flex items-center justify-center text-foreground hover:bg-gray-100 transition-colors text-lg font-medium"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-12 h-11 text-center border-x border-border bg-transparent text-foreground font-medium [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            className="w-10 h-11 flex items-center justify-center text-foreground hover:bg-gray-100 transition-colors text-lg font-medium"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding}
          className="h-11 px-7 bg-primary text-white font-semibold text-sm uppercase tracking-wide rounded-lg
            hover:bg-primary-dark active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md"
        >
          {isAdding ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding…
            </span>
          ) : (
            'Add to Cart'
          )}
        </button>

        {/* Buy Now */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="h-11 px-7 bg-foreground text-white font-semibold text-sm uppercase tracking-wide rounded-lg
            hover:bg-foreground/90 active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
        >
          Buy Now
        </button>
      </div>

      {/* Success notification */}
      {showNotification && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm font-medium">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Added to cart!
          <button
            type="button"
            onClick={() => router.push('/cart')}
            className="ml-auto text-green-800 underline hover:text-green-900"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
