import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);
const CART_KEY = 'iceeit_cart_v3';

function readStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(CART_KEY));

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // qty is optional (defaults to 1) so callers can add multiple at once
  const addToCart = useCallback((productId, size, color, qty = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return false;
    const finalSize = size || product.sizes[0];
    const finalColor = color || product.colors[0];

    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.size === finalSize && i.color === finalColor
      );
      if (existing) {
        return prev.map((i) =>
          i.lineId === existing.lineId ? { ...i, qty: Math.min(99, i.qty + qty) } : i
        );
      }
      return [...prev, {
        lineId: `${productId}-${finalSize}-${finalColor}`,
        productId, name: product.name, price: product.price, image: product.image,
        size: finalSize, color: finalColor, qty,
      }];
    });
    return true;
  }, []);

  const removeFromCart = useCallback((lineId) => {
    setCart((prev) => prev.filter((i) => i.lineId !== lineId));
  }, []);

  const updateQty = useCallback((lineId, qty) => {
    setCart((prev) =>
      prev.flatMap((i) => {
        if (i.lineId !== lineId) return [i];
        if (qty <= 0) return [];
        return [{ ...i, qty: Math.min(99, qty) }];
      })
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
}
