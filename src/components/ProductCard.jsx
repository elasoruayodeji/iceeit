import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`}>
          <video src={product.image} autoPlay loop muted playsInline width="700" height="900" />
        </Link>
        <button
          className={`wishlist-toggle ${isWishlisted(product.id) ? 'active' : ''}`}
          aria-label={`Toggle wishlist for ${product.name}`}
          onClick={() => toggleWishlist(product.id)}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
            <path d="M12 20s-7-4.4-9.5-8.8C.7 8 2 4.5 5.4 4c2-.3 3.7.7 4.6 2.2C10.9 4.7 12.6 3.7 14.6 4c3.4.5 4.7 4 3 7.2C19.1 15.6 12 20 12 20z" />
          </svg>
        </button>
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button className={`btn btn-outline btn-add ${justAdded ? 'added' : ''}`} onClick={handleAddToCart}>
          {justAdded ? 'Added' : 'Add to cart'}
        </button>
      </div>
    </article>
  );
}
