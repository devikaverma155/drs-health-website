'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/product/ProductCard';

export function NGOProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?limit=6');
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error('Failed to load NGO products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-accent-green/5 via-white to-accent-green/3">
      <div className="container-tight">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-green/10 text-accent-green text-xs font-semibold uppercase tracking-wider mb-4">
            Support Our Mission
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Shop Products, Support Change
          </h2>
          <p className="text-body-muted max-w-2xl mx-auto mb-6">
            Every purchase from DRS Health directly supports the work of Jeev Daya Parmarth Jan Kalyan Samiti. Your wellness is their mission—help us reach more communities in need.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-body-muted">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm"
              >
                Browse All Products
                <span className="ml-2">→</span>
              </Link>
              <p className="text-xs text-body-muted mt-4">
                💚 Every purchase supports our mission to serve communities in need.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-body-muted mb-4">Products coming soon!</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Visit Shop
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
