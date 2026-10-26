import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Orders & shipping', message: '' });
  const [status, setStatus] = useState('idle'); // idle | error | sent
  const [error, setError] = useState('');

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (form.name.trim().length < 2) { setError('Please enter your name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return; }
    if (form.message.trim().length < 10) { setError('Message should be at least 10 characters.'); return; }

    // Honest fallback: there is no verified backend endpoint we may claim to send to,
    // so the message is saved locally and we tell the user exactly that.
    try {
      const key = 'iceeit_messages_v3';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify([...prev, { ...form, at: new Date().toISOString() }]));
      setStatus('sent');
    } catch {
      setError('Could not save your message in this browser (private mode?). Email us directly instead.');
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumbs"><Link to="/">Index</Link> / Contact</p>
          <h1 className="display">Get In <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--cyan)', color: 'transparent' }}>Touch</em></h1>
          <p>Questions about sizing, shipping or a piece from the drop? Send it over — we answer within two working days.</p>
        </div>
      </section>

      <div className="container section">
        <div className="grid-2">
          <form onSubmit={submit} noValidate aria-label="Contact form">
            <div className="checkout-block" style={{ margin: 0 }}>
              <h2><i>✳</i>Send a message</h2>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="ct-name">Name</label>
                  <input id="ct-name" value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="ct-email">Email</label>
                  <input id="ct-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" placeholder="you@email.com" />
                </div>
                <div className="field full">
                  <label htmlFor="ct-subject">Topic</label>
                  <select id="ct-subject" value={form.subject} onChange={(e) => set('subject', e.target.value)}>
                    <option>Orders &amp; shipping</option>
                    <option>Sizing help</option>
                    <option>Returns &amp; exchanges</option>
                    <option>Collaborations</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="field full">
                  <label htmlFor="ct-message">Message</label>
                  <textarea id="ct-message" value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us everything…" />
                </div>
              </div>
              {error && <p className="form-note bad">{error}</p>}
              {status === 'sent' && (
                <p className="form-note ok">
                  OK — message logged on this device. Note: no delivery server is connected yet,
                  so for anything urgent reach us via the channels on the right.
                </p>
              )}
              <button type="submit" className="btn btn-solid" style={{ marginTop: 8 }}>Transmit →</button>
            </div>
          </form>

          <aside>
            <div className="checkout-block">
              <h2><i>01</i>Direct lines</h2>
              <div className="pd-meta" style={{ marginTop: 0 }}>
                <div className="pd-meta-row"><span>Email</span><span>hello@iceeit.example</span></div>
                <div className="pd-meta-row"><span>WhatsApp</span><span>+234 800 000 0000</span></div>
                <div className="pd-meta-row"><span>Instagram</span><span>@iceeit</span></div>
              </div>
              <div className="pay-note">Placeholder contact details — replace with real channels before launch.</div>
            </div>
            <div className="checkout-block">
              <h2><i>02</i>Dispatch hours</h2>
              <p style={{ color: 'var(--ink-dim)' }}>Monday – Saturday, 9:00 – 18:00 WAT. Orders placed after 16:00 leave the freezer the next morning.</p>
            </div>
            <div className="checkout-block">
              <h2><i>03</i>Studio</h2>
              <p style={{ color: 'var(--ink-dim)' }}>12 Frostline Avenue, Yaba, Lagos, Nigeria. Visits by appointment only.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
