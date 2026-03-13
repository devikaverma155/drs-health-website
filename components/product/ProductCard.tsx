'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
    <div className="flex items-center justify-center gap-2">
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`} className="text-accent-orange text-sm">★</span>
        ))}
        {half ? <span className="text-accent-orange text-sm">★</span> : null}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} className="text-gray-300 text-sm">★</span>
        ))}
      </div>
      <span className="text-xs sm:text-sm font-semibold text-foreground">{rating.toFixed(2)}</span>
      <span className="text-xs sm:text-sm text-body-muted">| {reviewCount}</span>
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
  const discountPercent = hasDiscount
    ? Math.round((1 - parseFloat(price) / parseFloat(comparePrice!)) * 100)
    : 0;
  const isSoldOut = variant?.available === false;
  const handleAddToCart = () => {
    if (isSoldOut) return;
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
    <article className="product-card group flex flex-col h-full  overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">

      {/* ── IMAGE ── */}
      <Link
        href={`/product/${product.handle}`}
        className="block relative w-full overflow-hidden"
        style={{ aspectRatio: '1 / 1' }}
      >
        {/* Neutral warm background so product pops */}
        <div className="absolute inset-0 bg-[#f5f0eb]" />

        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${isSoldOut ? 'opacity-60' : ''}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-body-muted text-xs">
            No image
          </div>
        )}

        {/* ────────────────────────────────────────────────
            % OFF BADGE
            Uses a strong red gradient so it's ALWAYS
            visible regardless of image background color.
        ──────────────────────────────────────────────── */}
        {hasDiscount && !isSoldOut && (
          <span
            className="absolute top-2.5 left-2.5 z-10 text-white text-[11px] font-extrabold px-2.5 py-[5px] rounded-full shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)',
              boxShadow: '0 2px 8px rgba(193,18,31,0.45)',
              letterSpacing: '0.03em',
            }}
          >
            {discountPercent}% OFF
          </span>
        )}

        {/* SOLD OUT OVERLAY */}
        {isSoldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30 backdrop-blur-[2px]">
            <span className="bg-white/90 text-foreground font-bold text-sm px-5 py-2 rounded-full shadow border border-gray-200 tracking-widest uppercase">
              Sold Out
            </span>
          </div>
        )}

        {/* WISHLIST — visible on hover */}
        <div className="absolute top-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <WishlistButton product={product} variant="icon" />
        </div>
      </Link>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-5 sm:px-5 sm:pt-5 sm:pb-6 text-center">

        {/* Category label */}
        {product.category && (
          <p className="text-[10px] sm:text-[11px] text-body-muted uppercase tracking-widest font-semibold">
            {product.category}
          </p>
        )}

        {/* Product name */}
        <Link href={`/product/${product.handle}`} className="mt-2 block">
          <h3 className="font-extrabold text-foreground hover:text-primary transition-colors line-clamp-2 text-sm sm:text-base leading-tight">
            {product.title}
          </h3>
        </Link>

        {/* Short description / subtitle */}
        {product.shortDescription && (
          <p className="mt-1.5 text-xs sm:text-sm text-body-muted line-clamp-2">
            {product.shortDescription}
          </p>
        )}

        {/* Star rating - centered */}
        {product.rating != null && product.reviewCount != null && (
          <div className="mt-2 flex justify-center">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-lg sm:text-2xl font-extrabold text-foreground leading-none">
            ₹{parseFloat(price).toLocaleString('en-IN')}
          </span>
          {hasDiscount && (
            <span className="text-xs sm:text-sm text-body-muted line-through">
              ₹{parseFloat(comparePrice!).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Variant selector - styled as button with dropdown */}
        {product.variants.length > 1 && (
          <div className="mt-4">
            <label className="sr-only">Variant</label>
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full max-w-xs mx-auto rounded-full border-2 border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-foreground hover:border-primary/50 focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                paddingRight: '32px',
              }}
            >
              {product.variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Spacer: pushes stepper + button to bottom */}
        <div className="flex-1 min-h-2" />

        {/* ── QUANTITY STEPPER ── */}
        <div className="mt-4 flex items-center justify-between border-2 border-gray-200 bg-white">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={isSoldOut}
            onClick={() => setQuantity((q) => Math.max(minQty, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-foreground hover:text-primary font-bold text-lg transition-colors disabled:opacity-40"
          >
            −
          </button>
          <span
            className="flex-1 text-center text-sm font-bold tabular-nums text-foreground"
            aria-live="polite"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={isSoldOut}
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-foreground hover:text-primary font-bold text-lg transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>

        {/* ── ADD TO CART BUTTON ── */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`
            mt-3 w-full  py-3
            text-xs sm:text-sm font-extrabold tracking-widest uppercase
            transition-all duration-200 active:scale-[0.97]
            ${isSoldOut
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:brightness-110 shadow-sm hover:shadow-md'
            }
          `}
        >
          {isSoldOut ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}