import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';

export default function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { notify } = useToast();
  const wished = isWishlisted(product.id);

  return (
    <article className="p-card">
      <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
        <div className="p-card-media">
          <video src={product.image} muted loop playsInline autoPlay preload="metadata" aria-hidden="true" />
          <span className="p-card-index">{String(index + 1).padStart(2, '0')}</span>
        </div>
      </Link>

      <button
        className={`wish-btn${wished ? ' active' : ''}`}
        aria-pressed={wished}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        onClick={() => {
          toggleWishlist(product.id);
          notify(wished ? 'REMOVED FROM WISHLIST' : '♥ SAVED TO WISHLIST');
        }}
      >
        <svg viewBox="0 0 24 24" fill={wished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 20s-7-4.6-7-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.5C19 15.4 12 20 12 20Z" />
        </svg>
      </button>

      <div className="p-card-body">
        <span className="p-card-cat">{product.category}</span>
        <h3 className="p-card-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="p-card-foot">
          <span className="p-card-price">{formatPrice(product.price)}</span>
          <span className="p-card-sizes">{product.sizes.join(' / ')}</span>
        </div>
      </div>

      <button
        className="quick-add"
        onClick={() => {
          addToCart(product.id, product.sizes[0], product.colors[0]);
          notify(`ADDED — ${product.name.toUpperCase()}`);
        }}
      >
        Quick add +
      </button>
    </article>
  );
}
