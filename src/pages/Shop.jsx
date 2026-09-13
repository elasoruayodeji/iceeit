import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const visibleProducts =
    activeCategory === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  function setCategory(category) {
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Shop</h1>
        <div className="filter-pills">
          <button
            className={`pill ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <p className="empty-state">No products in this category yet.</p>
      )}
    </div>
  );
}
