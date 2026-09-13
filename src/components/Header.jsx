import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  function navLinkClass({ isActive }) {
    return `nav-link${isActive ? ' active' : ''}`;
  }

  return (
    <>
    

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

          <Link to="/" className="wordmark" onClick={() => setMenuOpen(false)}>ICEEIT</Link>

          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/shop" className={navLinkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>Contact</NavLink>
            <NavLink to="/faq" className={navLinkClass} onClick={() => setMenuOpen(false)}>FAQ</NavLink>
          </nav>

          <div className="header-actions">
            <Link to="/wishlist" className="icon-btn" aria-label="View wishlist" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 20s-7-4.4-9.5-8.8C.7 8 2 4.5 5.4 4c2-.3 3.7.7 4.6 2.2C10.9 4.7 12.6 3.7 14.6 4c3.4.5 4.7 4 3 7.2C19.1 15.6 12 20 12 20z" />
              </svg>
              <span className="badge">{wishlistCount}</span>
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="View cart" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 8h12l-1 12H7L6 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className="badge">{cartCount}</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
