'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Wishlist, WishlistItem } from '@/types/wishlist';
import {
  getWishlistFromStorage,
  addWishlistItem,
  removeWishlistItem,
  isInWishlist as checkInWishlist,
  clearWishlist,
} from './wishlistStorage';

interface WishlistContextType {
  wishlist: Wishlist;
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  clearAll: () => void;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist>({ items: [], updatedAt: new Date().toISOString() });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setWishlist(getWishlistFromStorage());
    setMounted(true);
  }, []);

  const addToWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    setWishlist((prev) => addWishlistItem(prev, item));
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => removeWishlistItem(prev, productId));
  };

  const isInWishlist = (productId: string) => {
    if (!mounted) return false;
    return checkInWishlist(wishlist, productId);
  };

  const toggleWishlist = (item: Omit<WishlistItem, 'addedAt'>) => {
    if (checkInWishlist(wishlist, item.productId)) {
      removeFromWishlist(item.productId);
    } else {
      addToWishlist(item);
    }
  };

  const clearAll = () => {
    setWishlist(clearWishlist());
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        clearAll,
        itemCount: wishlist.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
