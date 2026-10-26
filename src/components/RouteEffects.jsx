import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top on every route change; also updates the document title per page.
const TITLES = {
  '/': 'ICEEIT — Sub-Zero Streetwear',
  '/shop': 'Shop — ICEEIT',
  '/cart': 'Your Bag — ICEEIT',
  '/wishlist': 'Wishlist — ICEEIT',
  '/checkout': 'Checkout — ICEEIT',
  '/about': 'About — ICEEIT',
  '/contact': 'Contact — ICEEIT',
  '/faq': 'FAQ — ICEEIT',
};

export default function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pathname.startsWith('/product/')
      ? 'Product — ICEEIT'
      : TITLES[pathname] || 'ICEEIT — Sub-Zero Streetwear';
  }, [pathname]);

  return null;
}
