import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleNewsletterSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('https://formspree.io/f/mppwazrd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, form: 'Newsletter signup' }),
      });
      if (res.ok) {
        setSubscribed(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page-home">
      <section className="hero">
        <img
  className="hero-img"
  src={`${import.meta.env.BASE_URL}images/hero/hero.jpg`}
  width="1400"
  height="1750"
  alt="Model wearing an ICEEIT cold-weather jacket on a city street"
/>
/
        <div className="hero-content">
          <h1>Cut From<br />Ice.</h1>
          <p>Sharp silhouettes and cold-weather essentials, built for the street.</p>
          <Link to="/shop" className="btn btn-primary">Shop the collection</Link>
        </div>
      </section>

      <section className="categories">
        <h2>Shop by category</h2>
        <div className="category-grid">
          <Link to="/shop?category=outerwear" className="category-tile large">
            <video src={`${import.meta.env.BASE_URL}images/categories/outerwear.mp4`} width="900" height="1100" autoPlay loop muted playsInline />
            <span className="category-label">Outerwear</span>
          </Link>
          <Link to="/shop?category=essentials" className="category-tile">
            <video src={`${import.meta.env.BASE_URL}images/categories/essentials.mp4`} width="700" height="850" autoPlay loop muted playsInline />
            <span className="category-label">Essentials</span>
          </Link>
          <Link to="/shop?category=accessories" className="category-tile">
            <video src={`${import.meta.env.BASE_URL}images/categories/accessories.mp4`} width="700" height="850" autoPlay loop muted playsInline />
            <span className="category-label">Accessories</span>
          </Link>
        </div>
      </section>

      <section className="featured">
        <div className="section-heading">
          <h2>Just dropped</h2>
          <Link to="/shop" className="text-link">View all</Link>
        </div>
        <div className="product-grid">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="statement">
        <p>ICEEIT designs for the moments between seasons — where the cold sets in and the city doesn't stop. Every piece is built to move, layer and last.</p>
        <Link to="/about" className="text-link">Our story</Link>
      </section>

      <section className="newsletter">
        <h2>Get early access</h2>
        <p>New drops, restocks and nothing else.</p>
        {subscribed ? (
          <p className="newsletter-success">You're on the list.</p>
        ) : (
                  <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Sending...' : 'Sign up'}
            </button>
            {error && <p className="newsletter-error">Something went wrong — try again.</p>}
          </form>
        )}
      </section>
    </div>
  );
}
