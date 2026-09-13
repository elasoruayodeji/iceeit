import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/formatPrice';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <div className="page-placeholder">
        <h1>Product not found</h1>
        <Link to="/shop" className="text-link">Back to shop</Link>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product.id, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="product-detail">
      <div className="product-detail-image">
        <video src={product.image} autoPlay loop muted playsInline width="700" height="900" />
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-price">{formatPrice(product.price)}</p>

        <div className="option-group">
          <span className="option-label">Color</span>
          <div className="option-buttons">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`option-btn ${selectedColor === color ? 'active' : ''}`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <span className="option-label">Size</span>
          <div className="option-buttons">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`option-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail-actions">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            {justAdded ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className={`wishlist-toggle static ${isWishlisted(product.id) ? 'active' : ''}`}
            aria-label="Toggle wishlist"
            onClick={() => toggleWishlist(product.id)}
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
              <path d="M12 20s-7-4.4-9.5-8.8C.7 8 2 4.5 5.4 4c2-.3 3.7.7 4.6 2.2C10.9 4.7 12.6 3.7 14.6 4c3.4.5 4.7 4 3 7.2C19.1 15.6 12 20 12 20z" />
            </svg>
          </button>
        </div>

        <p className="product-detail-note">
          Full sizing guide and product details are coming soon.
        </p>
      </div>
    </div>
  );
}
