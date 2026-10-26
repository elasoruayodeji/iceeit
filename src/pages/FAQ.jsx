import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'Is this store actually selling?',
    a: 'Not yet. ICEEIT.vercel.app is currently a fully functional demo — cart, wishlist and checkout all work in your browser, but no payment is processed and no order leaves your device. Real payments need a provider account (e.g. Paystack or Stripe) before the store can take money.',
  },
  {
    q: 'What does "single run, no restocks" mean?',
    a: 'Every collection is produced once. When a size or colourway sells out in a real launch, it never comes back. The frost list gets early access so you can claim pieces before they retire.',
  },
  {
    q: 'How do I choose my size?',
    a: 'Outerwear is cut for layering — if you plan to wear a hoodie underneath, take your normal size; for a slim fit, size down. Essentials run boxy by design. Accessories are one-size. Still unsure? Contact us with your measurements.',
  },
  {
    q: 'Where do you ship from and how long does it take?',
    a: 'Everything dispatches from Lagos, Nigeria. Local orders typically arrive in 2–4 working days; international delivery runs 7–15 working days depending on customs.',
  },
  {
    q: 'What is the shipping cost?',
    a: 'Flat ₦5,000 within Nigeria for orders under ₦250,000 — free above that threshold. International rates are quoted at checkout once a courier partner is connected.',
  },
  {
    q: 'Can I return or exchange a piece?',
    a: 'In a live launch: unworn pieces with tags attached can be exchanged for size within 14 days of delivery; refunds within 7 days. Final-sale items are marked clearly on the product page.',
  },
  {
    q: 'Why do products show videos instead of photos?',
    a: 'Each piece is filmed on a turntable so you can see fabric movement, hardware and silhouette from every angle — something a flat photo can\u2019t show for technical outerwear.',
  },
  {
    q: 'How is my data handled?',
    a: 'This demo stores your cart, wishlist and any messages only in your own browser (localStorage). Nothing is uploaded to a server. Clearing your browser data erases everything.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumbs"><Link to="/">Index</Link> / FAQ</p>
          <h1 className="display">Frequently <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--cyan)', color: 'transparent' }}>Asked</em></h1>
          <p>Everything about sizing, shipping, returns and how this store works.</p>
        </div>
      </section>

      <section className="container section">
        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className="faq-item" key={item.q}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{String(i + 1).padStart(2, '0')} · {item.q}</span>
                  <span className="sign" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div className={`faq-a${isOpen ? ' open' : ''}`} id={`faq-a-${i}`} role="region" aria-label={item.q}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="newsletter-box" style={{ marginTop: 64, gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
          <div>
            <h2 className="display" style={{ fontSize: 'clamp(26px,4vw,40px)' }}>Still Frozen Out?</h2>
            <p>If your question isn't here, send it straight to the studio.</p>
          </div>
          <Link to="/contact" className="btn btn-solid">Contact us →</Link>
        </div>
      </section>
    </>
  );
}
