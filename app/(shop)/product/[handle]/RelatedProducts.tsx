'use client';

import { ProductCard } from '@/components/product/ProductCard';
import type { Product } from '@/lib/woocommerce';
import { useMemo, useRef, useState } from 'react';

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

export function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
  const relatedByCategory = useMemo(() => {
    if (!currentProduct.category) return [];
    return allProducts
      .filter(
        (p) =>
          p.category === currentProduct.category &&
          p.id !== currentProduct.id
      )
      .slice(0, 8);
  }, [currentProduct, allProducts]);

  const otherRecommendations = useMemo(() => {
    const categoryIds = new Set(relatedByCategory.map((p) => p.id));
    return allProducts
      .filter(
        (p) =>
          p.id !== currentProduct.id &&
          !categoryIds.has(p.id)
      )
      .slice(0, 8);
  }, [currentProduct, allProducts, relatedByCategory]);

  const relatedScrollRef = useRef<HTMLDivElement>(null);
  const recommendationsScrollRef = useRef<HTMLDivElement>(null);
  const [relatedCanScrollLeft, setRelatedCanScrollLeft] = useState(false);
  const [relatedCanScrollRight, setRelatedCanScrollRight] = useState(true);
  const [recCanScrollLeft, setRecCanScrollLeft] = useState(false);
  const [recCanScrollRight, setRecCanScrollRight] = useState(true);

  const checkScroll = (ref: React.RefObject<HTMLDivElement>, setLeft: Function, setRight: Function) => {
    if (ref.current) {
      setLeft(ref.current.scrollLeft > 0);
      setRight(ref.current.scrollLeft < ref.current.scrollWidth - ref.current.clientWidth - 10);
    }
  };

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = 300;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(() => {
      if (ref === relatedScrollRef) {
        checkScroll(ref, setRelatedCanScrollLeft, setRelatedCanScrollRight);
      } else {
        checkScroll(ref, setRecCanScrollLeft, setRecCanScrollRight);
      }
    }, 300);
  };

  if (relatedByCategory.length === 0 && otherRecommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      {/* Row 1: Related Products Carousel */}
      {relatedByCategory.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Related Products
          </h2>
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={relatedScrollRef}
              onScroll={() => checkScroll(relatedScrollRef, setRelatedCanScrollLeft, setRelatedCanScrollRight)}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {relatedByCategory.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            {relatedCanScrollLeft && (
              <button
                onClick={() => scroll(relatedScrollRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-4 z-10 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors hidden sm:flex items-center justify-center"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Arrow */}
            {relatedCanScrollRight && (
              <button
                onClick={() => scroll(relatedScrollRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-4 z-10 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors hidden sm:flex items-center justify-center"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Row 2: You Might Also Like Carousel */}
      {otherRecommendations.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            You Might Also Like
          </h2>
          <div className="relative">
            {/* Scroll Container */}
            <div
              ref={recommendationsScrollRef}
              onScroll={() => checkScroll(recommendationsScrollRef, setRecCanScrollLeft, setRecCanScrollRight)}
              className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {otherRecommendations.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            {recCanScrollLeft && (
              <button
                onClick={() => scroll(recommendationsScrollRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-4 z-10 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors hidden sm:flex items-center justify-center"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Arrow */}
            {recCanScrollRight && (
              <button
                onClick={() => scroll(recommendationsScrollRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-4 z-10 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors hidden sm:flex items-center justify-center"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
