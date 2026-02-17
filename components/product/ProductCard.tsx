'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/woocommerce';
import { getCheckoutUrl } from '@/lib/woocommerce';

type ProductCardProps = {
  product: Product;
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <div className="flex items-center gap-1.5 mt-2">
      <div className="flex" aria-hidden>
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`} className="text-accent-orange">★</span>
        ))}
        {half ? <span className="text-accent-orange">½</span> : null}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} className="text-gray-300">★</span>
        ))}
      </div>
      <span className="text-sm text-body-muted">{reviewCount} reviews</span>
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const variant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const price = variant?.price ?? product.priceRange.minVariantPrice.amount;
  const comparePrice = variant?.compareAtPrice ?? product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = comparePrice && parseFloat(comparePrice) > parseFloat(price);

  const handleAddToCart = () => {
    window.location.href = getCheckoutUrl(product.id, quantity);
  };

  return (
    <article className="group flex flex-col h-full border border-border rounded-2xl overflow-hidden bg-white shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1">
      <Link href={`/product/${product.handle}`} className="block relative aspect-square bg-soft-bg">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-body-muted text-sm">
            No image
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-lg">
            {Math.round((1 - parseFloat(price) / parseFloat(comparePrice!)) * 100)}% Off
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        {product.category && (
          <p className="text-xs text-body-muted uppercase tracking-wider">{product.category}</p>
        )}
        <Link href={`/product/${product.handle}`}>
          <h3 className="mt-1 font-semibold text-foreground hover:underline line-clamp-2">
            {product.title}
          </h3>
        </Link>
        {product.rating != null && product.reviewCount != null && (
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold">₹{price}</span>
          {comparePrice && parseFloat(comparePrice) > parseFloat(price) && (
            <span className="text-sm text-body-muted line-through">₹{comparePrice}</span>
          )}
        </div>
        {product.variants.length > 1 && (
          <div className="mt-3">
            <label className="sr-only">Variant</label>
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full rounded-xl border border-input-border bg-white px-3 py-2 text-sm"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center border border-border rounded-xl">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-gray-100"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-10 text-center text-sm" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-gray-100"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          <Button variant="primary" className="flex-1" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
