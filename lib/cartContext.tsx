'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Cart, CartItem } from '@/types/cart';
import {
  getCartFromStorage,
  addOrUpdateItem,
  removeItem,
  updateItemQuantity,
  clearCart,
} from './cartStorage';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearAllItems: () => void;
  isLoading: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
    setIsLoading(false);
  }, []);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const updatedCart = addOrUpdateItem(cart, item);
    setCart(updatedCart);
    // Open drawer when item is added from landing page
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = removeItem(cart, productId);
    setCart(updatedCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = updateItemQuantity(cart, productId, quantity);
    setCart(updatedCart);
  };

  const clearAllItems = () => {
    const emptyCart = clearCart();
    setCart(emptyCart);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearAllItems,
        isLoading,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
