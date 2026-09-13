import { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);
const CART_KEY = 'iceeit_cart';

function readCartFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCartFromStorage);

  // Whenever cart changes, save it
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(productId, size, color) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const finalSize = size || product.sizes[0];
    const finalColor = color || product.colors[0];

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.size === finalSize && item.color === finalColor
      );
      if (existing) {
        return prev.map((item) =>
          item.lineId === existing.lineId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          lineId: `${productId}-${finalSize}-${finalColor}-${Date.now()}`,
          productId,
          name: product.name,
          price: product.price,
          image: product.image,
          size: finalSize,
          color: finalColor,
          qty: 1,
        },
      ];
    });
  }

  function removeFromCart(lineId) {
    setCart((prev) => prev.filter((item) => item.lineId !== lineId));
  }

  function updateQty(lineId, qty) {
    setCart((prev) =>
      prev.map((item) => (item.lineId === lineId ? { ...item, qty: Math.max(1, qty) } : item))
    );
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
}
