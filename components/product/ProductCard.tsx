'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/woocommerce';
import { useCart } from '@/lib/cartContext';
import { WishlistButton } from '@/components/WishlistButton';

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
  const { addToCart } = useCart();
  const minQty = product.minQuantity ?? 1;
  const [quantity, setQuantity] = useState(minQty);
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const variant = product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];
  const price = variant?.price ?? product.priceRange.minVariantPrice.amount;
  const comparePrice = variant?.compareAtPrice ?? product.compareAtPriceRange?.minVariantPrice.amount;
  const hasDiscount = comparePrice && parseFloat(comparePrice) > parseFloat(price);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.title,
      price,
      image: product.featuredImage?.url,
      quantity,
      permalink: `/product/${product.handle}`,
    });
    setQuantity(minQty);
  };

  return (
    <article className="product-card group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/0 to-amber-100/0 group-hover:from-amber-100/5 group-hover:to-amber-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 rounded-2xl"></div>
      
      <Link href={`/product/${product.handle}`} className="block relative aspect-square bg-soft-bg overflow-hidden">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-body-muted text-sm">
            No image
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
            {Math.round((1 - parseFloat(price) / parseFloat(comparePrice!)) * 100)}% Off
          </span>
        )}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <WishlistButton product={product} variant="icon" />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1 relative z-10">
        {product.category && (
          <p className="text-xs text-body-muted uppercase tracking-wider font-medium">{product.category}</p>
        )}
        <Link href={`/product/${product.handle}`}>
          <h3 className="mt-2 font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-base">
            {product.title}
          </h3>
        </Link>
        {product.rating != null && product.reviewCount != null && (
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        )}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">₹{price}</span>
          {comparePrice && parseFloat(comparePrice) > parseFloat(price) && (
            <span className="text-sm text-body-muted line-through">₹{comparePrice}</span>
          )}
        </div>
        {product.variants.length > 1 && (
          <div className="mt-4">
            <label className="sr-only">Variant</label>
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full rounded-lg border border-input-border bg-white px-3 py-2 text-sm hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex items-center justify-center border border-border rounded-lg bg-white/50 backdrop-blur-sm">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-sm"
              onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary transition-colors text-sm"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          <Button variant="primary" className="w-full sm:flex-1" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
