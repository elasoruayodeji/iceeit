import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'name', label: 'A–Z' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') || 'all';
  const [sort, setSort] = useState('featured');

  const visible = useMemo(() => {
    let list = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === cat);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [cat, sort]);

  function pickCat(next) {
    if (next === 'all') setParams({});
    else setParams({ cat: next });
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumbs"><a href="#/">Index</a> / Shop</p>
          <h1 className="display">The <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--cyan)', color: 'transparent' }}>Drop</em></h1>
          <p>Every piece in Collection 03 — Sub-Zero. Single runs, no restocks. Filter by department or sort the rack.</p>
        </div>
      </section>

      <div className="container">
        <div className="toolbar" role="region" aria-label="Shop filters">
          <div className="filter-chips">
            {[{ id: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ id: c, label: c }))].map((f) => (
              <button
                key={f.id}
                className={`chip${cat === f.id ? ' on' : ''}`}
                aria-pressed={cat === f.id}
                onClick={() => pickCat(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span className="result-count">{String(visible.length).padStart(2, '0')} PIECES</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="result-count">SORT</span>
              <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>
        </div>

        <section className="section" style={{ paddingTop: 24 }} aria-label="Products">
          {visible.length > 0 ? (
            <div className="grid-products">
              {visible.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Nothing here yet</h2>
              <p>This department is still frozen over.</p>
              <button className="btn btn-ghost" onClick={() => pickCat('all')}>Show all pieces</button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
