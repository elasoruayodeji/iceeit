import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const products = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (products.length === 0) {
    return (
      <div className="page-placeholder">
        <h1>Your wishlist</h1>
        <p>Nothing saved yet — tap the heart on any product to add it here.</p>
        <Link to="/shop" className="btn btn-primary">Browse the shop</Link>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Your wishlist</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
