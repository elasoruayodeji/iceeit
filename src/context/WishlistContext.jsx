import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext(null);
const WISHLIST_KEY = 'iceeit_wishlist';

function readWishlistFromStorage() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(readWishlistFromStorage);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  function toggleWishlist(productId) {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function isWishlisted(productId) {
    return wishlist.includes(productId);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, wishlistCount: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside a WishlistProvider');
  return ctx;
}
