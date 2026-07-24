"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  [key: string]: any;
}

export interface AppContextType {
  cart: CartItem[];
  wishlist: any[];
  compareList: any[];
  addToCart: (product: any, qty?: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateCartQty: (productId: string | number, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (productId: string | number) => boolean;
  toggleCompare: (product: any) => void;
  isInCompare: (productId: string | number) => boolean;
  clearCompare: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("st_cart");
      const storedWishlist = localStorage.getItem("st_wishlist");
      const storedCompare = localStorage.getItem("st_compare");

      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
      if (storedCompare) setCompareList(JSON.parse(storedCompare));
    } catch (e) {
      console.error("Failed to load local storage state:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save states to localStorage whenever they change
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("st_cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("st_wishlist", JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("st_compare", JSON.stringify(compareList));
  }, [compareList, isLoaded]);

  // Cart operations
  const addToCart = (product: any, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQty = (productId: string | number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product: any) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string | number) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Compare operations
  const toggleCompare = (product: any) => {
    setCompareList((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("You can add Max 4 Products to compare!");
        return prev;
      }
      return [...prev, product];
    });
  };

  const isInCompare = (productId: string | number) => {
    return compareList.some((item) => item.id === productId);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
