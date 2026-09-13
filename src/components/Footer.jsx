import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="wordmark">ICEEIT</span>
          <p>© 2026 ICEEIT. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h3>Shop</h3>
            <Link to="/shop">All products</Link>
            <Link to="/shop?category=outerwear">Outerwear</Link>
            <Link to="/shop?category=essentials">Essentials</Link>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <Link to="/about">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
