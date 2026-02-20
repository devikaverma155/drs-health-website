'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import type { Product } from '@/lib/woocommerce';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Validate product data exists
      if (!product.id || !product.title || !product.priceRange?.minVariantPrice?.amount) {
        console.error('Invalid product data');
        return;
      }

      addToCart({
        productId: product.id,
        productName: product.title,
        price: product.priceRange.minVariantPrice.amount,
        image: product.featuredImage?.url,
        quantity,
        permalink: product.permalink,
      });

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min="1"
          max="100"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
        />
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      {showNotification && (
        <div className="text-green-600 text-sm font-medium animate-fade-out">
          ✓ Added to cart!
        </div>
      )}
    </div>
  );
}
