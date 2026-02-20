/**
 * Cart storage utilities
 * Manages cart data in localStorage (client-side)
 */

import type { Cart, CartItem } from '@/types/cart';

const CART_STORAGE_KEY = 'drs-health-cart';

/**
 * Get cart from localStorage
 */
export function getCartFromStorage(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], totalItems: 0, totalPrice: '0', createdAt: new Date(), updatedAt: new Date() };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return { items: [], totalItems: 0, totalPrice: '0', createdAt: new Date(), updatedAt: new Date() };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading cart from storage:', error);
    return { items: [], totalItems: 0, totalPrice: '0', createdAt: new Date(), updatedAt: new Date() };
  }
}

/**
 * Save cart to localStorage
 */
export function saveCartToStorage(cart: Cart): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(items: CartItem[]): { totalItems: number; totalPrice: string } {
  let totalItems = 0;
  let totalPrice = 0;

  items.forEach((item) => {
    totalItems += item.quantity;
    const price = parseFloat(item.price) || 0;
    totalPrice += price * item.quantity;
  });

  return {
    totalItems,
    totalPrice: totalPrice.toFixed(2),
  };
}

/**
 * Add or update item in cart
 */
export function addOrUpdateItem(cart: Cart, item: Omit<CartItem, 'id'>): Cart {
  const existingIndex = cart.items.findIndex((i) => i.productId === item.productId);

  let updatedItems: CartItem[];
  if (existingIndex >= 0) {
    updatedItems = [...cart.items];
    updatedItems[existingIndex].quantity += item.quantity;
  } else {
    updatedItems = [...cart.items, { id: `${item.productId}-${Date.now()}`, ...item }];
  }

  const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

  const updatedCart: Cart = {
    items: updatedItems,
    totalItems,
    totalPrice,
    createdAt: cart.createdAt,
    updatedAt: new Date(),
  };

  saveCartToStorage(updatedCart);
  return updatedCart;
}

/**
 * Remove item from cart
 */
export function removeItem(cart: Cart, productId: string): Cart {
  const updatedItems = cart.items.filter((item) => item.productId !== productId);
  const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

  const updatedCart: Cart = {
    items: updatedItems,
    totalItems,
    totalPrice,
    createdAt: cart.createdAt,
    updatedAt: new Date(),
  };

  saveCartToStorage(updatedCart);
  return updatedCart;
}

/**
 * Update item quantity
 */
export function updateItemQuantity(cart: Cart, productId: string, quantity: number): Cart {
  if (quantity <= 0) {
    return removeItem(cart, productId);
  }

  const updatedItems = cart.items.map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );

  const { totalItems, totalPrice } = calculateCartTotals(updatedItems);

  const updatedCart: Cart = {
    items: updatedItems,
    totalItems,
    totalPrice,
    createdAt: cart.createdAt,
    updatedAt: new Date(),
  };

  saveCartToStorage(updatedCart);
  return updatedCart;
}

/**
 * Clear entire cart
 */
export function clearCart(): Cart {
  const emptyCart: Cart = {
    items: [],
    totalItems: 0,
    totalPrice: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  return emptyCart;
}
