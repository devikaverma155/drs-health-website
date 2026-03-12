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
    <div className="flex gap-3 py-4 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={productName}
            width={80}
            height={80}
            className="rounded-lg object-cover w-20 h-20"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{productName}</h3>
        <p className="text-blue-600 font-bold text-sm mt-1">₹{price}</p>

        {/* Quantity Control */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
            className="w-7 h-7 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 text-lg flex items-center justify-center"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(quantity + 1)}
            className="w-7 h-7 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 text-lg flex items-center justify-center"
          >
            +
          </button>
          <button
            onClick={onRemove}
            className="ml-auto text-red-600 hover:text-red-700 text-xs font-medium"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="flex-shrink-0 text-right">
        <p className="font-bold text-gray-900 text-sm">₹{itemTotal}</p>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearAllItems } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center max-w-sm">
          <svg
            className="mx-auto h-16 w-16 text-gray-300 mb-4"
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
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600 text-sm">Add some products to get started!</p>
          <Link
            href="/shop"
            className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-4 inline-flex items-center gap-2">
            ← Back to Shop
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {/* Main Layout: Items + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Items List */}
              <div className="p-4 sm:p-6 divide-y divide-gray-200">
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
            </div>
          </div>

          {/* Cart Summary Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-4 overflow-hidden">
              {/* Header */}
              <div className="bg-primary/10 border-b border-primary/20 text-primary p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold">Order Summary</h2>
                <p className="text-primary/70 text-sm mt-1">Total Items: {cart.totalItems}</p>
              </div>

              {/* Summary Details */}
              <div className="p-4 sm:p-6 space-y-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="text-gray-900 font-semibold">₹{cart.totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Shipping</span>
                  <span className="text-accent-lime font-semibold">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Tax (est.)</span>
                  <span className="text-gray-900 font-semibold">₹0</span>
                </div>
              </div>

              {/* Total */}
              <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl sm:text-3xl font-bold text-primary">₹{cart.totalPrice}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  className="w-full px-4 py-3 bg-accent-lime hover:bg-opacity-90 text-white rounded-lg font-bold text-center transition-colors block mb-3"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping Button */}
                <Link
                  href="/shop"
                  className="w-full px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-center transition-colors block mb-3"
                >
                  Continue Shopping
                </Link>

                {/* Clear Cart Button */}
                <button
                  onClick={clearAllItems}
                  className="w-full px-4 py-3 border border-primary text-primary hover:bg-primary/5 rounded-lg font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              {/* Trust Badge */}
              <div className="p-4 bg-primary/5 border-t border-primary/20">
                <p className="text-xs text-primary text-center font-medium">✓ Secure checkout with encrypted payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
