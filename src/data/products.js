// PLACEHOLDER DATA.
// Images/videos point to local files in /public/images/... — to use your own
// file, just replace it (keep the same filename) or change the path below.
// Prices are in Naira (NGN) — placeholder numbers, edit freely.

const BASE = import.meta.env.BASE_URL;

export const PRODUCTS = [
  { id: 'p1', name: 'Frostbite Puffer Jacket', price: 185000, category: 'outerwear',
    image: `${BASE}images/products/p1.mp4`,
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Ice Grey'] },
  { id: 'p2', name: 'Glacier Shell Coat', price: 210000, category: 'outerwear',
    image: `${BASE}images/products/p2.mp4`,
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black'] },
  { id: 'p3', name: 'Cold Front Hoodie', price: 45000, category: 'essentials',
    image: `${BASE}images/products/p3.mp4`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'White', 'Ice Grey'] },
  { id: 'p4', name: 'Thermal Crew Tee', price: 20000, category: 'essentials',
    image: `${BASE}images/products/p4.mp4`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'White'] },
  { id: 'p5', name: 'Permafrost Beanie', price: 15000, category: 'accessories',
    image: `${BASE}images/products/p5.mp4`,
    sizes: ['One Size'], colors: ['Black', 'Ice Grey'] },
  { id: 'p6', name: 'Drift Cargo Pants', price: 55000, category: 'essentials',
    image: `${BASE}images/products/p6.mp4`,
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Stone'] },
];

export const CATEGORIES = ['outerwear', 'essentials', 'accessories'];