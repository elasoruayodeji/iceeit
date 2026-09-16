import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  function navLinkClass({ isActive }) {
    return `nav-link${isActive ? ' active' : ''}`;
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <div className="announce-bar">Free shipping on orders over 100k</div>

      <header className="site-header">
        <div className="header-inner">
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>

          <Link to="/" className="wordmark" onClick={closeMenu}>ICEEIT</Link>

          {/* Desktop nav lives here — hidden on mobile via CSS */}
          <nav className="main-nav main-nav-desktop">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/faq" className={navLinkClass}>FAQ</NavLink>
          </nav>

          <div className="header-actions">
            <Link to="/wishlist" className="icon-btn" aria-label="View wishlist" onClick={closeMenu}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 20s-7-4.4-9.5-8.8C.7 8 2 4.5 5.4 4c2-.3 3.7.7 4.6 2.2C10.9 4.7 12.6 3.7 14.6 4c3.4.5 4.7 4 3 7.2C19.1 15.6 12 20 12 20z" />
              </svg>
              <span className="badge">{wishlistCount}</span>
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="View cart" onClick={closeMenu}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className="badge">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile full-screen nav — rendered OUTSIDE the header on purpose.
          The header uses backdrop-filter (frosted glass), and that breaks
          position:fixed for anything nested inside it. Keeping this as a
          sibling of <header>, not a child, is what makes it cover the
          full screen correctly on mobile. */}
      <nav className={`main-nav-mobile ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/shop" className={navLinkClass} onClick={closeMenu}>Shop</NavLink>
        <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/faq" className={navLinkClass} onClick={closeMenu}>FAQ</NavLink>
      </nav>
    </>
  );
}
