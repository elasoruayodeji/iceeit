import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

const BASE = import.meta.env.BASE_URL;

function Reveal({ children, as: Tag = 'div', className = '' }) {
  const [ref, visible] = useReveal();
  return <Tag ref={ref} className={`reveal${visible ? ' in' : ''} ${className}`}>{children}</Tag>;
}

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumbs"><Link to="/">Index</Link> / About</p>
          <h1 className="display">Born <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--cyan)', color: 'transparent' }}>Below Zero</em></h1>
          <p>ICEEIT is a streetwear label obsessed with one idea: clothing that behaves like winter equipment and moves like street culture.</p>
        </div>
      </section>

      <section className="container">
        <Reveal className="split" as="div">
          <div className="split-copy">
            <span className="mono-label">// The origin</span>
            <h2 className="display" style={{ fontSize: 'clamp(30px,4.6vw,54px)', marginTop: 12 }}>Lagos Heat,<br />Arctic Mind</h2>
            <p>
              It started as a joke between friends — the warmest city on earth making
              the coldest clothes around. But the joke became a design brief: build
              garments so seriously weatherproof that wearing them in Lagos was an act
              of pure fashion will. Puffers with sealed seams. Shells welded like
              sailcloth. Fleeces heavy enough to anchor a boat.
            </p>
            <p>
              Today ICEEIT releases in single-run collections. Every drop is numbered,
              every piece retires forever when it sells out. No restocks. No repeats.
              Frost only comes once.
            </p>
          </div>
          <div className="split-media">
            <video src={`${BASE}images/products/p2.mp4`} muted loop playsInline autoPlay preload="metadata" aria-label="Glacier Shell Coat campaign film" />
          </div>
        </Reveal>
      </section>

      <section className="container section" aria-labelledby="values-title">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title display" id="values-title">The <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--ink-dim)', color: 'transparent' }}>Code</em></h2>
          </div>
        </Reveal>
        <Reveal className="value-cards" as="div">
          <div className="value-card">
            <b>RULE 01</b><h3>Single Runs Only</h3>
            <p>Each collection is produced once. When a size disappears, it's gone for good — scarcity isn't a tactic, it's the model.</p>
          </div>
          <div className="value-card">
            <b>RULE 02</b><h3>Equipment Standards</h3>
            <p>Sealed seams, taped shells, thermal linings. If it wouldn't survive a night on a glacier, it doesn't carry the ICEEIT tag.</p>
          </div>
          <div className="value-card">
            <b>RULE 03</b><h3>Street-First Cuts</h3>
            <p>Warmth means nothing if you can't move. Every silhouette is patterned for the city — layers over hoodies, pockets for transit cards, hems for sneakers.</p>
          </div>
        </Reveal>
      </section>

      <section className="container newsletter">
        <Reveal className="newsletter-box" as="div">
          <div>
            <span className="mono-label">// Next chapter</span>
            <h2 className="display" style={{ marginTop: 12 }}>Collection 04 Thaws Soon</h2>
            <p>The frost list gets the lookbook first — and 24 hours of early access before the public sees anything.</p>
          </div>
          <Link to="/contact" className="btn btn-solid" style={{ justifySelf: 'start' }}>Talk to us</Link>
        </Reveal>
      </section>
    </>
  );
}
