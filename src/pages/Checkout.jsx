import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const ORDERS_KEY = 'iceeit_orders_v3';

function readOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch { return []; }
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);
  const [redirectHome, setRedirectHome] = useState(false);

  if (redirectHome) return <Navigate to="/" replace />;

  // ---- confirmation view ----
  if (placedOrder) {
    return (
      <section className="container section">
        <div className="checkout-block" style={{ maxWidth: 720, marginInline: 'auto', textAlign: 'center' }}>
          <span className="mono-label">// Order confirmed</span>
          <h1 className="display" style={{ fontSize: 'clamp(36px,6vw,72px)', margin: '14px 0 8px' }}>Frozen &amp; Sealed</h1>
          <p style={{ color: 'var(--ink-dim)' }}>
            Order <span className="order-id">{placedOrder.id}</span> is packed and queued for dispatch.
            A confirmation would normally be emailed to <b style={{ color: 'var(--ink)' }}>{placedOrder.email}</b>.
          </p>
          <div className="pay-note" style={{ textAlign: 'left' }}>
            DEMO CHECKOUT — no payment was processed and no order left this browser.
            Orders are stored locally in localStorage only, until a real backend/payment provider is connected.
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 26, flexWrap: 'wrap' }}>
            <button className="btn btn-ghost" onClick={() => setRedirectHome(true)}>Back to index</button>
            <Link to="/shop" className="btn btn-solid">Keep shopping</Link>
          </div>
        </div>
      </section>
    );
  }

  // ---- empty guard ----
  if (cart.length === 0) {
    return (
      <div className="container empty-state">
        <h2>Nothing To Check Out</h2>
        <p>Your bag is empty — add something cold first.</p>
        <Link to="/shop" className="btn btn-solid">Shop the drop →</Link>
      </div>
    );
  }

  const shipping = cartTotal >= 250000 ? 0 : 5000;

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Full name required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email required.';
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Valid phone number required.';
    if (form.address.trim().length < 8) next.address = 'Delivery address required.';
    if (form.city.trim().length < 2) next.city = 'City required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function placeOrder(e) {
    e.preventDefault();
    if (!validate()) return;
    const order = {
      id: 'ICE-' + Date.now().toString(36).toUpperCase().slice(-6),
      createdAt: new Date().toISOString(),
      customer: { ...form },
      items: cart.map(({ productId, name, price, size, color, qty }) => ({ productId, name, price, size, color, qty })),
      subtotal: cartTotal,
      shipping,
      total: cartTotal + shipping,
      status: 'demo-paid',
    };
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...readOrders()]));
    } catch { /* private mode — order still shown in-session */ }
    clearCart();
    setPlacedOrder(order);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumbs"><Link to="/">Index</Link> / <Link to="/cart">Bag</Link> / Checkout</p>
          <h1 className="display">Check<span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--cyan)' }}>out</span></h1>
          <p>Enter delivery details to seal your order. This is a demo checkout — no card is charged.</p>
        </div>
      </section>

      <div className="container checkout-grid">
        <form onSubmit={placeOrder} noValidate aria-label="Checkout details">
          <div className="checkout-block">
            <h2><i>01</i>Contact</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="co-name">Full name</label>
                <input id="co-name" value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
                {errors.name && <span className="form-note bad">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="co-email">Email</label>
                <input id="co-email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" placeholder="you@email.com" />
                {errors.email && <span className="form-note bad">{errors.email}</span>}
              </div>
              <div className="field full">
                <label htmlFor="co-phone">Phone</label>
                <input id="co-phone" type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="+234 800 000 0000" />
                {errors.phone && <span className="form-note bad">{errors.phone}</span>}
              </div>
            </div>
          </div>

          <div className="checkout-block">
            <h2><i>02</i>Delivery</h2>
            <div className="form-grid">
              <div className="field full">
                <label htmlFor="co-address">Street address</label>
                <input id="co-address" value={form.address} onChange={(e) => set('address', e.target.value)} autoComplete="street-address" placeholder="12 Frostline Avenue" />
                {errors.address && <span className="form-note bad">{errors.address}</span>}
              </div>
              <div className="field">
                <label htmlFor="co-city">City</label>
                <input id="co-city" value={form.city} onChange={(e) => set('city', e.target.value)} autoComplete="address-level2" />
                {errors.city && <span className="form-note bad">{errors.city}</span>}
              </div>
              <div className="field">
                <label htmlFor="co-notes">Delivery notes (optional)</label>
                <input id="co-notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Gate code, landmark…" />
              </div>
            </div>
          </div>

          <div className="checkout-block">
            <h2><i>03</i>Payment</h2>
            <div className="size-row" role="group" aria-label="Payment method">
              <span className="chip on" aria-pressed="true">Pay on delivery</span>
              <span className="chip" title="Requires a payment provider account — not configured">Card (coming soon)</span>
              <span className="chip" title="Requires a payment provider account — not configured">Transfer (coming soon)</span>
            </div>
            <div className="pay-note">
              Card and bank-transfer options need a payment provider (e.g. Paystack/Stripe) and an API key before they can work.
              Until then, placing an order records a DEMO order in your browser only — nothing is charged and nothing is sent to a server.
            </div>
          </div>

          <button type="submit" className="btn btn-solid btn-wide">Place order — {formatPrice(cartTotal + shipping)}</button>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h3>Your Order</h3>
          {cart.map((item) => (
            <div className="summary-row" key={item.lineId}>
              <span style={{ maxWidth: '60%' }}>{item.name} <span style={{ color: 'var(--ink-faint)' }}>×{item.qty} · {item.size}/{item.color}</span></span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
          <div className="summary-total"><span>Total</span><span>{formatPrice(cartTotal + shipping)}</span></div>
          <Link to="/cart" className="mono-label" style={{ display: 'inline-block' }}>← Edit bag</Link>
        </aside>
      </div>
    </>
  );
}
