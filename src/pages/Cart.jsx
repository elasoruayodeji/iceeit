import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container empty-state">
        <h2>Your Bag Is Empty</h2>
        <p>Nothing in the freezer. Go find something cold.</p>
        <Link to="/shop" className="btn btn-solid">Shop the drop →</Link>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumbs"><Link to="/">Index</Link> / Bag</p>
          <h1 className="display">Your <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--cyan)', color: 'transparent' }}>Bag</em></h1>
          <p>{cartCount} {cartCount === 1 ? 'piece' : 'pieces'} held at sub-zero temperature.</p>
        </div>
      </section>

      <div className="container cart-grid">
        <section aria-label="Bag items">
          {cart.map((item) => (
            <article className="cart-line" key={item.lineId}>
              <Link to={`/product/${item.productId}`} className="cart-line-media" aria-label={`View ${item.name}`}>
                <video src={item.image} muted playsInline preload="metadata" autoPlay loop aria-hidden="true" />
              </Link>
              <div>
                <h3><Link to={`/product/${item.productId}`}>{item.name}</Link></h3>
                <p className="cart-line-spec">{item.size} · {item.color}</p>
                <button className="cart-line-remove" onClick={() => removeFromCart(item.lineId)} aria-label={`Remove ${item.name} from bag`}>
                  Remove
                </button>
              </div>
              <div className="cart-line-right">
                <span className="cart-line-price">{formatPrice(item.price * item.qty)}</span>
                <div className="qty-stepper" role="group" aria-label={`Quantity for ${item.name}`}>
                  <button onClick={() => updateQty(item.lineId, item.qty - 1)} aria-label="Decrease quantity">−</button>
                  <output>{String(item.qty).padStart(2, '0')}</output>
                  <button onClick={() => updateQty(item.lineId, item.qty + 1)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="summary" aria-label="Order summary">
          <h3>Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{cartTotal >= 250000 ? 'FREE' : formatPrice(5000)}</span></div>
          <div className="summary-total"><span>Total</span><span>{formatPrice(cartTotal + (cartTotal >= 250000 ? 0 : 5000))}</span></div>
          <Link to="/checkout" className="btn btn-solid btn-wide">Checkout →</Link>
          <p style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-faint)', lineHeight: 1.7 }}>
            FREE SHIPPING ON ORDERS OVER ₦250,000. DEMO STORE — NO REAL PAYMENT IS TAKEN.
          </p>
        </aside>
      </div>
    </>
  );
}
