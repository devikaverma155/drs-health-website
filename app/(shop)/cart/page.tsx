'use client';

import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import Image from 'next/image';

interface CartItemComponentProps {
  productId: string;
  productName: string;
  price: string;
  quantity: number;
  image?: string;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItemComponent({
  productId,
  productName,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
}: CartItemComponentProps) {
  const itemTotal = (parseFloat(price) * quantity).toFixed(2);

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={productName}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{productName}</h3>
        <p className="text-gray-600 mt-1">₹{price}</p>

        {/* Quantity Control */}
        <div className="flex items-center gap-2 mt-4">
          <label htmlFor={`qty-${productId}`} className="text-sm font-medium">
            Qty:
          </label>
          <input
            id={`qty-${productId}`}
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => onUpdateQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
          />
          <button
            onClick={onRemove}
            className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="flex-shrink-0 text-right">
        <p className="text-lg font-semibold text-gray-900">₹{itemTotal}</p>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearAllItems } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add some products to get started!</p>
          <Link
            href="/shop"
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow">
          {/* Cart Items */}
          <div className="p-6">
            {cart.items.map((item) => (
              <CartItemComponent
                key={item.id}
                productId={item.productId}
                productName={item.productName}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onUpdateQuantity={(quantity) => updateQuantity(item.productId, quantity)}
                onRemove={() => removeFromCart(item.productId)}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total Items:</span>
              <span className="text-lg font-bold text-gray-900">{cart.totalItems}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-gray-900">Total Price:</span>
              <span className="text-2xl font-bold text-blue-600">₹{cart.totalPrice}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={clearAllItems}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 font-medium"
              >
                Clear Cart
              </button>
              <Link
                href="/shop"
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 font-medium text-center"
              >
                Continue Shopping
              </Link>
              <Link
                href="/checkout"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>

        {/* Continue Shopping Link */}
        <div className="mt-6">
          <Link
            href="/shop"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
