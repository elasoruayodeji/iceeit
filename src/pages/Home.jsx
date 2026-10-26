import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useReveal } from '../hooks/useReveal';

const BASE = import.meta.env.BASE_URL;

function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} className={`reveal${visible ? ' in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* ===== ticker ===== */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((n) => (
            <span className="ticker-item" key={n}>
              FREE SHIPPING OVER ₦250,000<i>✳</i>NEW DROP: FROSTBITEN SS26<i>✳</i>DESIGNED IN LAGOS<i>✳</i>BUILT FOR THE STREETS<i>✳</i>WORLDWIDE DELIVERY<i>✳</i>
            </span>
          ))}
        </div>
      </div>

      {/* ===== hero ===== */}
      <section className="hero">
        <span className="hero-ghost display" aria-hidden="true">FROST</span>
        <div className="container hero-grid">
          <div>
            <div className="hero-kicker">
              <span className="rule" aria-hidden="true" />
              <span className="mono-label">Collection 03 — Sub-Zero</span>
            </div>
            <h1 className="hero-title display">
              Cut<br />From <span className="stroke">Ice.</span>
            </h1>
            <p className="hero-sub">
              Heavyweight outerwear and cold-weather essentials engineered for the
              streets. Limited runs. No restocks. When it thaws, it's gone.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-solid">Shop the drop →</Link>
              <Link to="/about" className="btn btn-ghost">The story</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><b>06</b><span>Pieces in drop</span></div>
              <div className="stat"><b>-12°</b><span>Cold-rated builds</span></div>
              <div className="stat"><b>01</b><span>Run only. Ever.</span></div>
            </div>
          </div>

          <div className="hero-media">
            <span className="hero-tag">SS26 // Frostbiten</span>
            <div className="hero-frame">
              <img src={`${BASE}images/hero/hero.jpg`} alt="Model wearing the ICEEIT Frostbite Puffer Jacket on a cold city street" />
              <span className="hero-coords">N 06°27'23&quot; · E 003°23'36&quot; — LAGOS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== categories ===== */}
      <section className="container section" aria-labelledby="cats-title">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title display" id="cats-title">Browse <em>Departments</em></h2>
            <Link to="/shop" className="mono-label">All products →</Link>
          </div>
        </Reveal>
        <Reveal className="cat-strip" as="div">
          {CATEGORIES.map((cat) => (
            <Link key={cat} to={`/shop?cat=${cat}`} className="cat-tile">
              <video src={`${BASE}images/categories/${cat}.mp4`} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
              <span className="cat-tile-label">
                <h3>{cat}</h3>
                <span>{PRODUCTS.filter((p) => p.category === cat).length} pieces →</span>
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ===== marquee band ===== */}
      <section className="band" aria-hidden="true">
        <div className="band-track">
          {[0, 1].map((n) => (
            <span key={n}>
              <span className="band-word hot">Frostbiten</span>
              <span className="band-word">No Restocks</span>
              <span className="band-word hot">Sub-Zero</span>
              <span className="band-word">Built For The Streets</span>
            </span>
          ))}
        </div>
      </section>

      {/* ===== featured ===== */}
      <section className="container section" aria-labelledby="feat-title">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title display" id="feat-title">The <em>Drop</em></h2>
            <Link to="/shop" className="mono-label">View all 06 →</Link>
          </div>
        </Reveal>
        <Reveal className="grid-products" as="div">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </Reveal>
      </section>

      {/* ===== manifesto split ===== */}
      <section className="container">
        <Reveal className="split" as="div">
          <div className="split-media">
            <video src={`${BASE}images/products/p1.mp4`} muted loop playsInline autoPlay preload="metadata" aria-label="Frostbite Puffer Jacket campaign film" />
          </div>
          <div className="split-copy">
            <span className="mono-label">// Manifesto</span>
            <h2 className="display" style={{ fontSize: 'clamp(34px,5vw,64px)', marginTop: 14 }}>
              Cold Is A<br /><em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--cyan)', color: 'transparent' }}>Mindset</em>
            </h2>
            <p>
              ICEEIT started with one question: why does streetwear melt when the
              temperature drops? We build garments like equipment — sealed seams,
              heavyweight shells, thermal layers — then cut them into silhouettes
              that move through the city like frost moves through glass.
            </p>
            <ul className="split-list">
              <li><b>01</b> Limited single-run drops — nothing gets restocked</li>
              <li><b>02</b> Cold-rated fabrics tested down to -12°C</li>
              <li><b>03</b> Designed and packed in Lagos, shipped worldwide</li>
            </ul>
            <div style={{ marginTop: 32 }}>
              <Link to="/about" className="btn btn-ghost">Read the full story</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== newsletter ===== */}
      <section className="container newsletter">
        <Reveal className="newsletter-box" as="div">
          <div>
            <span className="mono-label">// Early access</span>
            <h2 className="display" style={{ marginTop: 12 }}>Get The Drop Before It Thaws</h2>
            <p>Members of the frost list get 24-hour early access to every release, restock alerts on sold-out sizes, and zero spam.</p>
          </div>
          <HomeNewsletter />
        </Reveal>
      </section>
    </>
  );
}

function HomeNewsletter() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);

  function submit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ ok: false, text: 'ERR — enter a valid email address.' });
      return;
    }
    try { localStorage.setItem('iceeit_newsletter', email); } catch { /* private mode */ }
    setMsg({ ok: true, text: 'OK — you are on the frost list. Watch your inbox.' });
    setEmail('');
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="nl-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address for early access"
        />
        <button type="submit" className="btn btn-solid">Join</button>
      </div>
      {msg && <p className={`nl-msg${msg.ok ? '' : ' err'}`}>{msg.text}</p>}
    </form>
  );
}
