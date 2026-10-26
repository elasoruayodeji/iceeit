import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <h2>Wishlist Empty</h2>
        <p>Tap the ♡ on any piece to freeze it here for later.</p>
        <Link to="/shop" className="btn btn-solid">Browse the drop →</Link>
      </div>
    );
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumbs"><Link to="/">Index</Link> / Wishlist</p>
          <h1 className="display">Your <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--cyan)', color: 'transparent' }}>Wishlist</em></h1>
          <p>{items.length} {items.length === 1 ? 'piece' : 'pieces'} kept on ice.</p>
        </div>
      </section>
      <section className="container section" aria-label="Wishlisted products">
        <div className="grid-products">
          {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </>
  );
}
