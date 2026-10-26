import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null); // { ok, text }

  function subscribe(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ ok: false, text: 'ERR — enter a valid email address.' });
      return;
    }
    // No backend: stored locally so the user sees their subscription persisted.
    try { localStorage.setItem('iceeit_newsletter', email); } catch { /* private mode */ }
    setMsg({ ok: true, text: `OK — ${email} is on the frost list.` });
    setEmail('');
  }

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="logo-word">ICEE<span>IT</span></span>
          <p>Sub-zero streetwear. Cut from ice, built for the streets. Designed in Lagos, worn everywhere the temperature drops.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?cat=outerwear">Outerwear</Link></li>
            <li><Link to="/shop?cat=essentials">Essentials</Link></li>
            <li><Link to="/shop?cat=accessories">Accessories</Link></li>
            <li><Link to="/shop">All products</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>The Frost List</h4>
          <form onSubmit={subscribe} noValidate>
            <div className="nl-form" style={{ flexDirection: 'column' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn btn-solid" style={{ justifyContent: 'center' }}>Join</button>
            </div>
            {msg && <p className={`nl-msg${msg.ok ? '' : ' err'}`}>{msg.text}</p>}
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ICEEIT — ALL RIGHTS FROZEN</span>
        <span>CUT FROM ICE ✳ BUILT FOR THE STREETS</span>
      </div>
    </footer>
  );
}
