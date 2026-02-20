'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PLACEHOLDER_IMAGES } from '@/lib/placeholderImages';

interface Product {
  id: number;
  title: string;
  name: string;
  description: string;
  image: string;
  videoThumbnail: string;
  price: string;
  originalPrice: string;
  discount: string;
  views: string;
  videoUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Liver Restore Tablets',
    name: 'Liver Restore Tablets',
    description: '8 hafte mein',
    image: PLACEHOLDER_IMAGES.product1,
    videoThumbnail: PLACEHOLDER_IMAGES.product1,
    price: '₹599.00',
    originalPrice: '₹666.00',
    discount: '10% Off',
    views: '11.8K Views',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Apple Cider Vinegar - ACV',
    name: 'Apple Cider Vinegar - ACV',
    description: 'Natural wellness supplement',
    image: PLACEHOLDER_IMAGES.product2,
    videoThumbnail: PLACEHOLDER_IMAGES.product2,
    price: '₹280.00',
    originalPrice: '₹311.00',
    discount: '10% Off',
    views: '6.7K Views',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'Herboslim Tablets',
    name: 'Herboslim Tablets for Weight',
    description: 'Iske baad main koi',
    image: PLACEHOLDER_IMAGES.product3,
    videoThumbnail: PLACEHOLDER_IMAGES.product3,
    price: '₹558.00',
    originalPrice: '₹656.00',
    discount: '15% Off',
    views: '5.0K Views',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: 4,
    title: 'Liver Care Tablets',
    name: 'Liver Care Tablets - Daily',
    description: 'Daily liver support formula',
    image: PLACEHOLDER_IMAGES.product4,
    videoThumbnail: PLACEHOLDER_IMAGES.product4,
    price: '₹506.00',
    originalPrice: '₹562.00',
    discount: '10% Off',
    views: '4.2K Views',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
];

export function ReelsSection() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent-blue/5 via-soft-bg to-primary/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-4">Watch & Shop</h2>
          <p className="text-lg text-body-muted max-w-2xl mx-auto">
            See our products in action and shop directly from customer testimonials
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all cursor-pointer group border border-border ${
                selectedProduct.id === product.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-square overflow-hidden bg-body-muted/10">
                <Image
                  src={product.videoThumbnail}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                
                {/* Play Icon */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lg">▶</span>
                  </div>
                </div>

                {/* Views Badge */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {product.views}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h4 className="font-semibold text-sm text-foreground line-clamp-2 mb-2">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-primary">
                    {product.price}
                  </span>
                  <span className="text-xs text-body-muted line-through">
                    {product.originalPrice}
                  </span>
                </div>
                <div className="text-xs text-body-muted mb-3">{product.discount}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className="w-full bg-primary-dark hover:bg-primary text-white text-xs font-bold py-2 rounded-lg transition-colors"
                >
                  ADD TO CART
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
