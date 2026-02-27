'use client';

import { useWishlist } from '@/lib/wishlistContext';
import type { Product } from '@/lib/woocommerce';

interface WishlistButtonProps {
  product: Product;
  /** 'icon' = small heart icon (for cards), 'full' = text + icon (for product page) */
  variant?: 'icon' | 'full';
  className?: string;
}

export function WishlistButton({ product, variant = 'icon', className = '' }: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const price = product.variants[0]?.price ?? product.priceRange.minVariantPrice.amount;
  const comparePrice = product.variants[0]?.compareAtPrice ?? product.compareAtPriceRange?.minVariantPrice.amount;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      productId: product.id,
      productName: product.title,
      price,
      compareAtPrice: comparePrice,
      image: product.featuredImage?.url,
      handle: product.handle,
      category: product.category,
    });
  };

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 text-sm font-medium transition-colors
          ${wishlisted
            ? 'text-red-500 hover:text-red-600'
            : 'text-body-muted hover:text-red-500'
          } ${className}`}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          className="w-5 h-5 transition-transform active:scale-125"
          viewBox="0 0 24 24"
          fill={wishlisted ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={wishlisted ? 0 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
    );
  }

  // Icon-only variant (for product cards)
  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all
        ${wishlisted
          ? 'text-red-500 bg-red-50 hover:bg-red-100'
          : 'text-body-muted bg-white/80 hover:bg-white hover:text-red-500 shadow-sm'
        } ${className}`}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className="w-5 h-5 transition-transform active:scale-125"
        viewBox="0 0 24 24"
        fill={wishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={wishlisted ? 0 : 2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
