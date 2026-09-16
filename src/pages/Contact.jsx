import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mppwazrd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, form: 'Contact page' }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <p className="contact-lede">Questions about an order, sizing, or anything else — send us a message and we'll get back to you.</p>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-info-item">
            <span className="option-label">Phone / WhatsApp</span>
            <p>+2348142485613</p>
          </div>
          <div className="contact-info-item">
            <span className="option-label">Email</span>
            <p>elasoruayodeji@gmail.com</p>
          </div>
          <div className="contact-info-item">
            <span className="option-label">Location</span>
            <p>Lagos, Nigeria</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
          </label>
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
          {status === 'sent' && <p className="form-success">Message sent — we'll be in touch soon.</p>}
          {status === 'error' && <p className="newsletter-error">Something went wrong — try again.</p>}
        </form>
      </div>
    </div>
  );
}
