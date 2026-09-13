# ICEEIT — Project Notes

Running log of decisions so we don't lose track of anything. Newest entries at the top.

---

## Phase 2 — Migrated to React + Vite

**Why we switched:** Now building from a laptop, so a real dev environment (terminal, npm) is practical. React lets us manage cart/wishlist/product state as reusable components instead of manual DOM updates — cleaner as the site grows. Everything from Phase 1 (design system, copy, product data, layout) carried over — nothing was thrown away.

**Stack:**
- React 19 + Vite (dev server with instant live-reload)
- react-router-dom (v7) for real page routing
- Plain CSS (`src/index.css`) — same design system as before, no CSS framework/library added
- State: React Context (`CartContext`, `WishlistContext`) backed by `localStorage`, same persistence behavior as Phase 1

**Why HashRouter instead of BrowserRouter:** the site will be hosted on GitHub Pages, which doesn't support client-side routing on a page refresh without extra server config. HashRouter (URLs like `/#/shop`) works with zero setup on GitHub Pages.

**Project structure:**
```
src/
  main.jsx              — entry point, wraps app in HashRouter
  App.jsx               — routes + context providers
  index.css             — design system + all page styles
  data/products.js      — product data (PLACEHOLDER — edit here to add real products)
  context/
    CartContext.jsx      — cart state + localStorage
    WishlistContext.jsx  — wishlist state + localStorage
  components/
    Header.jsx           — nav, mobile menu, cart/wishlist badges
    Footer.jsx
    ProductCard.jsx       — reusable product card (used on Home, Shop, Wishlist)
  pages/
    Home.jsx, Shop.jsx, ProductDetail.jsx, Cart.jsx, Wishlist.jsx,
    Checkout.jsx, About.jsx, Contact.jsx, FAQ.jsx
```

**Built and working in this step:**
- Full routing — every nav link goes to a real page/URL
- Home page (hero, categories, featured products, newsletter)
- Shop page — real product grid + category filter pills (All / Outerwear / Essentials / Accessories)
- Product detail page — image, price, color/size selection, add to cart, wishlist toggle
- Cart page — real item list, quantity controls, remove, subtotal
- Wishlist page — shows saved products
- Header cart/wishlist badges update live everywhere

**Still placeholders (next steps):**
- Checkout flow (shipping info, order summary, confirmation)
- About page content
- Contact form (needs a way to actually send messages — no backend yet)
- FAQ content
- Shop page search + price sorting

**Open questions for later:**
- Contact form sending: options are Formspree or EmailJS (both free, no backend needed) vs. a simple mailto fallback.
- Checkout: no payment processor connected yet. Since this is a portfolio project, checkout can end with an order summary/confirmation screen rather than real payment — but real payment (e.g. Stripe) is an option if you want to push it further later.

**Placeholder content to swap later:**
- All images are generic stock photos from picsum.photos — replace with real photography in `src/data/products.js` and `src/pages/Home.jsx` when ready.

**How to run locally:**
```
npm install
npm run dev
```
Opens a live preview (usually http://localhost:5173) that updates instantly as you save files.

**How to deploy (GitHub Pages):**
```
npm run build
```
This creates a `dist/` folder with the final static files — we'll walk through publishing that to GitHub Pages when you're ready to deploy.

---

## Phase 1 — Vanilla HTML/CSS/JS foundation (superseded)

Built the original single-file version (mobile-first workflow) with the same design system, hero, categories, featured products, working cart/wishlist via localStorage, and hash-based page routing. Superseded by the React version above, but the design decisions carried forward:
- Colors: Void `#12151A`, Frost `#F1F4F5`, Paper `#FFFFFF`, Ink `#14171C`, Steel `#6E7680`, Glacier `#12B4B4`
- Fonts: Space Grotesk (headings), Inter (body)
- Sharp corners, hairline borders, one deliberate hero animation on load
