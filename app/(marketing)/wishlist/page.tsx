'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearAll } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: typeof wishlist.items[0]) => {
    addToCart({
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      image: item.image,
      quantity: 1,
      permalink: `/product/${item.handle}`,
    });
    removeFromWishlist(item.productId);
  };

  const handleMoveAllToCart = () => {
    wishlist.items.forEach((item) => {
      addToCart({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        image: item.image,
        quantity: 1,
        permalink: `/product/${item.handle}`,
      });
    });
    clearAll();
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-body-muted mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Wishlist</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            My Wishlist
            {wishlist.items.length > 0 && (
              <span className="text-lg font-normal text-body-muted ml-2">
                ({wishlist.items.length} {wishlist.items.length === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>

          {wishlist.items.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={handleMoveAllToCart}
                className="text-sm font-semibold text-white bg-primary hover:bg-primary-dark px-5 py-2.5 rounded-lg transition-colors shadow-sm"
              >
                Add All to Cart
              </button>
              <button
                onClick={clearAll}
                className="text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 px-4 py-2.5 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {wishlist.items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-body-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-body-muted mb-8 max-w-md mx-auto">
              Browse our products and add your favorites here. We&apos;ll keep them saved for you!
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
            >
              Continue Shopping
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.items.map((item) => {
              const hasDiscount = item.compareAtPrice && parseFloat(item.compareAtPrice) > parseFloat(item.price);

              return (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 border border-border rounded-xl hover:shadow-sm transition-shadow bg-white"
                >
                  {/* Product image */}
                  <Link href={`/product/${item.handle}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-50">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-body-muted text-xs">
                          No image
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    {item.category && (
                      <p className="text-xs text-body-muted uppercase tracking-wider mb-1">{item.category}</p>
                    )}
                    <Link href={`/product/${item.handle}`} className="block">
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                        {item.productName}
                      </h3>
                    </Link>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">₹{parseFloat(item.price).toFixed(2)}</span>
                      {hasDiscount && (
                        <span className="text-sm text-body-muted line-through">₹{parseFloat(item.compareAtPrice!).toFixed(2)}</span>
                      )}
                    </div>
                    <p className="text-xs text-body-muted mt-1">
                      Added {new Date(item.addedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 sm:flex-none sm:w-40 flex items-center justify-center gap-2 bg-primary text-white font-semibold text-sm py-2.5 px-4 rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.productId)}
                      className="flex items-center justify-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium py-2.5 px-4 rounded-lg border border-red-200 hover:border-red-300 hover:bg-red-50 transition-colors sm:w-40"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue shopping link */}
        {wishlist.items.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
