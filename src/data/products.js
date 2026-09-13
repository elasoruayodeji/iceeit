// PLACEHOLDER DATA.
// Images point to local files in /public/images/products/ — to use your own
// photo, just replace that file (keep the same filename) or change the path
// below to a new file you've added to that folder. No code changes needed
// beyond this file.
// Prices are in Naira (NGN) — these are placeholder numbers, edit freely.
// To add a product: copy a block below, give it a unique id, and fill in the fields.

export const PRODUCTS = [
  { id: 'p1', name: 'Frostbite Puffer Jacket', price: 140000, category: 'essentials',
    image: '/images/products/p1.mp4',
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Ice Grey'] },
  { id: 'p2', name: 'Round neck', price: 30000, category: 'essentials',
    image: '/images/products/p2.mp4',
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'white'] },
  { id: 'p3', name: 'Harmless', price: 20000, category: 'accessories',
    image: '/images/products/p3.mp4',
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Ice Grey'] },
  { id: 'p4', name: 'Tank Top', price: 12000, category: 'outerwear',
    image: '/images/products/p4.mp4',
    sizes: ['S', 'M', 'L', 'XL'], colors: ['Black'] },
  { id: 'p5', name: 'Double band gogger', price: 60000, category: 'essentials',
    image: '/images/products/p5.mp4',
    sizes: ['One Size'], colors: ['Black', 'Ice Grey'] },
  { id: 'p6', name: 'Jersey', price: 30000, category: 'essentials', 
    image: '/images/products/p6.mp4',
    sizes: ['M', 'L', 'XL'] },
];

export const CATEGORIES = ['outerwear', 'essentials', 'accessories'];
