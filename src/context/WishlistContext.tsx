import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/data/products';

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => prev.some(i => i.id === product.id) ? prev : [...prev, product]);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(i => i.id === productId);
  }, [items]);

  const toggleItem = useCallback((product: Product) => {
    setItems(prev => prev.some(i => i.id === product.id)
      ? prev.filter(i => i.id !== product.id)
      : [...prev, product]
    );
  }, []);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggleItem }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
