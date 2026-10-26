import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';

const COLOR_HEX = {
  Black: '#15181d', White: '#eef4f8', 'Ice Grey': '#aebdc6', Stone: '#8d8371',
};

// Short editorial blurbs for each piece (names/prices/specs unchanged — copy only).
const COPY = {
  p1: 'Sealed-seam 90/10 down puffer with a matte storm shell and magnetic storm cuffs. The coldest thing in the room, on purpose.',
  p2: 'A welded three-layer shell coat with taped seams and a hidden hood. Glacier-grade weather protection cut long and lean.',
  p3: 'Heavyweight 480gsm loopback fleece, double-lined hood, kangaroo pocket big enough to lose a hand in. Our warmest everyday hoodie.',
  p4: 'Thermal-brushed 260gsm cotton tee with a boxy shoulder. The base layer that behaves like a statement piece.',
  p5: 'Chunky rib-knit merino blend beanie with a folded frost cuff. One size, zero excuses.',
  p6: 'Ripstop cargo pants with six pockets, articulated knees and a bungee hem. Built for slush, made for streets.',
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { notify } = useToast();

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container empty-state">
        <h2>Ghost Piece</h2>
        <p>This product has thawed out of existence.</p>
        <Link to="/shop" className="btn btn-solid">Back to the drop</Link>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const chosenSize = size || product.sizes[0];
  const chosenColor = color || product.colors[0];

  function add() {
    addToCart(product.id, chosenSize, chosenColor, qty);
    notify(`ADDED — ${product.name.toUpperCase()} × ${qty}`);
  }

  return (
    <>
      <div className="container">
        <nav className="breadcrumbs section" style={{ paddingBottom: 0 }} aria-label="Breadcrumb">
          <Link to="/">Index</Link> / <Link to="/shop">Shop</Link> /{' '}
          <Link to={`/shop?cat=${product.category}`}>{product.category}</Link> / {product.name}
        </nav>

        <div className="pd-grid">
          <div className="pd-media">
            <span className="pd-media-tag">{product.category} // {product.id.toUpperCase()}</span>
            <video src={product.image} muted loop playsInline autoPlay controls preload="metadata" aria-label={`${product.name} product film`} />
          </div>

          <div className="pd-info">
            <span className="mono-label">Collection 03 — Sub-Zero</span>
            <h1 className="display">{product.name}</h1>
            <p className="pd-price">{formatPrice(product.price)}</p>
            <p className="pd-desc">{COPY[product.id]}</p>

            <div className="opt-group">
              <div className="opt-label"><span>Size</span><b>{chosenSize}</b></div>
              <div className="size-row" role="group" aria-label="Choose size">
                {product.sizes.map((s) => (
                  <button key={s} className={`size-btn${s === chosenSize ? ' on' : ''}`} aria-pressed={s === chosenSize} onClick={() => setSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="opt-group">
              <div className="opt-label"><span>Colour</span><b>{chosenColor}</b></div>
              <div className="swatch-row" role="group" aria-label="Choose colour">
                {product.colors.map((c) => (
                  <button key={c} className={`swatch${c === chosenColor ? ' on' : ''}`} aria-pressed={c === chosenColor} onClick={() => setColor(c)}>
                    <span className="swatch-dot" style={{ background: COLOR_HEX[c] || '#888' }} aria-hidden="true" />
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="opt-group">
              <div className="opt-label"><span>Quantity</span></div>
              <div className="qty-stepper">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <output aria-live="polite">{String(qty).padStart(2, '0')}</output>
                <button onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity">+</button>
              </div>
            </div>

            <div className="pd-actions">
              <button className="btn btn-solid" onClick={add}>Add to bag — {formatPrice(product.price * qty)}</button>
              <button className={`btn btn-dark${wished ? ' wish-on' : ''}`} onClick={() => { toggleWishlist(product.id); notify(wished ? 'REMOVED FROM WISHLIST' : '♥ SAVED TO WISHLIST'); }}>
                {wished ? '♥ Saved' : '♡ Wishlist'}
              </button>
            </div>

            <div className="pd-meta">
              <div className="pd-meta-row"><span>Available sizes</span><span>{product.sizes.join(' · ')}</span></div>
              <div className="pd-meta-row"><span>Colourways</span><span>{product.colors.join(' · ')}</span></div>
              <div className="pd-meta-row"><span>Drop status</span><span style={{ color: 'var(--cyan)' }}>Live — single run</span></div>
              <div className="pd-meta-row"><span>Shipping</span><span>Lagos dispatch · worldwide</span></div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container section" aria-labelledby="rel-title">
          <div className="section-head">
            <h2 className="display" id="rel-title" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Same <em style={{ fontStyle: 'normal', WebkitTextStroke: '1.5px var(--ink-dim)', color: 'transparent' }}>Department</em></h2>
            <Link to={`/shop?cat=${product.category}`} className="mono-label">View all →</Link>
          </div>
          <div className="grid-products">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </>
  );
}
