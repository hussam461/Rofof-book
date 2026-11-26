"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

export type CartLine = { bookId: string; quantity: number };
export type CartNotice = { bookId: string; id: number };

type StoreContextValue = {
  cart: CartLine[];
  favorites: string[];
  cartNotice: CartNotice | null;
  addToCart: (bookId: string) => void;
  dismissCartNotice: () => void;
  toggleFavorite: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartNotice, setCartNotice] = useState<CartNotice | null>(null);
  const noticeId = useRef(0);

  function addToCart(bookId: string) {
    setCart((current) => {
      const existing = current.find((line) => line.bookId === bookId);
      return existing
        ? current.map((line) => line.bookId === bookId ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { bookId, quantity: 1 }];
    });
    noticeId.current += 1;
    setCartNotice({ bookId, id: noticeId.current });
  }

  const dismissCartNotice = useCallback(() => setCartNotice(null), []);

  function toggleFavorite(bookId: string) {
    setFavorites((current) => current.includes(bookId)
      ? current.filter((item) => item !== bookId)
      : [...current, bookId]);
  }

  function updateQuantity(bookId: string, quantity: number) {
    setCart((current) => quantity <= 0
      ? current.filter((line) => line.bookId !== bookId)
      : current.map((line) => line.bookId === bookId ? { ...line, quantity } : line));
  }

  return (
    <StoreContext.Provider value={{ cart, favorites, cartNotice, addToCart, dismissCartNotice, toggleFavorite, updateQuantity }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
