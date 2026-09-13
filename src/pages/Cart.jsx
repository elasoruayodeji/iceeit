import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page-placeholder">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop" className="btn btn-primary">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your cart</h1>

      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.lineId}>
            <img src={item.image} alt={item.name} width="140" height="180" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p className="cart-item-meta">{item.color} · {item.size}</p>
              <p className="cart-item-price">{formatPrice(item.price)}</p>

              <div className="qty-control">
                <button onClick={() => updateQty(item.lineId, item.qty - 1)} aria-label="Decrease quantity">−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.lineId, item.qty + 1)} aria-label="Increase quantity">+</button>
              </div>

              <button className="text-link remove-link" onClick={() => removeFromCart(item.lineId)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <p className="cart-summary-note">Shipping and taxes calculated at checkout.</p>
        <Link to="/checkout" className="btn btn-primary btn-block">Go to checkout</Link>
      </div>
    </div>
  );
}
