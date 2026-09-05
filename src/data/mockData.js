// Mock data for School Cart frontend matching the design layout with INR (₹ / Rs) pricing

export const ANNOUNCEMENTS = [
  { icon: 'Truck', text: 'Free Shipping on Orders Over ₹499' },
  { icon: 'Tag', text: '10% OFF Your First Order | Use Code: SCHOOL10' },
  { icon: 'RotateCcw', text: '30-Day Hassle-Free Returns' }
];

export const NAV_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Categories', view: 'categories' },
  { label: 'All Products', view: 'products' },
  { label: 'About Us', view: 'about' },
  { label: 'Contact Us', view: 'contact' }
];

export const VALUE_PROPS = [
  {
    id: 1,
    icon: 'Truck',
    title: 'FREE SHIPPING',
    subtitle: 'On Orders Over ₹499'
  },
  {
    id: 2,
    icon: 'ShieldCheck',
    title: 'SECURE PAYMENT',
    subtitle: '100% UPI & Cards Checkout'
  },
  {
    id: 3,
    icon: 'Award',
    title: 'PREMIUM QUALITY',
    subtitle: 'Carefully Selected'
  },
  {
    id: 4,
    icon: 'RotateCcw',
    title: 'EASY RETURNS',
    subtitle: '30-Day Hassle Free Returns'
  },
  {
    id: 5,
    icon: 'Headphones',
    title: '24/7 SUPPORT',
    subtitle: "We're Here to Help"
  }
];

export const CATEGORIES = [
  {
    id: 'notebooks',
    name: 'NOTEBOOKS',
    itemCount: '120+ Items',
    accentColor: 'var(--color-brand-pink)',
    bgColor: 'var(--color-brand-pink-subtle)',
    icon: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'pens',
    name: 'PENS & PENCILS',
    itemCount: '85+ Items',
    accentColor: 'var(--color-brand-blue)',
    bgColor: 'var(--color-brand-blue-subtle)',
    icon: 'PenTool',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'supplies',
    name: 'OFFICE SUPPLIES',
    itemCount: '95+ Items',
    accentColor: 'var(--color-brand-yellow)',
    bgColor: 'var(--color-brand-yellow-subtle)',
    icon: 'Paperclip',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'bags',
    name: 'BAGS & CASES',
    itemCount: '45+ Items',
    accentColor: 'var(--color-brand-teal)',
    bgColor: 'var(--color-brand-teal-subtle)',
    icon: 'Briefcase',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'art',
    name: 'ART & CRAFT',
    itemCount: '110+ Items',
    accentColor: 'var(--color-brand-ochre)',
    bgColor: 'var(--color-brand-ochre-subtle)',
    icon: 'Palette',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'planners',
    name: 'PLANNERS',
    itemCount: '60+ Items',
    accentColor: 'var(--color-brand-teal)',
    bgColor: 'var(--color-brand-teal-subtle)',
    icon: 'Calendar',
    imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'gifts',
    name: 'GIFT SETS',
    itemCount: '35+ Items',
    accentColor: 'var(--color-brand-pink)',
    bgColor: 'var(--color-brand-pink-subtle)',
    icon: 'Gift',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'kits',
    name: 'KITS',
    itemCount: '12+ Bundles',
    accentColor: 'var(--color-brand-ochre)',
    bgColor: 'var(--color-brand-ochre-subtle)',
    icon: 'Package',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=300&auto=format&fit=crop&q=80'
  }
];

export const BEST_SELLERS = [
  {
    id: 1,
    name: 'Minimal Spiral Notebook',
    subtitle: 'Ruled Pages • 160 Pages 100 GSM',
    category: 'notebooks',
    price: 199,
    originalPrice: 299,
    discountBadge: '33% OFF',
    rating: 4.9,
    reviewsCount: 1245,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Gel Pen Set (10pcs)',
    subtitle: 'Smooth Writing • 0.5mm Quick-Dry Ink',
    category: 'pens',
    price: 249,
    originalPrice: 349,
    discountBadge: '28% OFF',
    rating: 4.8,
    reviewsCount: 2153,
    inStock: true,
    image: '/images/gel-pen-set.jpg'
  },
  {
    id: 3,
    name: 'Pastel Highlighters Set',
    subtitle: 'Chisel Tip • 6 Aesthetic Soft Colors',
    category: 'pens',
    price: 189,
    originalPrice: 299,
    discountBadge: 'HOT',
    rating: 4.9,
    reviewsCount: 1782,
    inStock: true,
    image: '/images/pastel-highlighters.jpg'
  },
  {
    id: 4,
    name: 'Multi-Function Desk Organizer',
    subtitle: 'Tiered Storage • Durable Eco Wooden & Matte',
    category: 'supplies',
    price: 499,
    originalPrice: 699,
    discountBadge: 'POPULAR',
    rating: 4.9,
    reviewsCount: 1012,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'Aesthetic Washi Tape Set',
    subtitle: 'Colorful Decorative Collection • 8 Rolls',
    category: 'art',
    price: 149,
    originalPrice: 249,
    discountBadge: 'SALE',
    rating: 4.7,
    reviewsCount: 943,
    inStock: true,
    image: '/images/washi-tape-set.jpg'
  },
  {
    id: 6,
    name: 'Classic Academic Planner 2026',
    subtitle: 'Weekly & Monthly • Faux Leather Bound',
    category: 'planners',
    price: 549,
    originalPrice: 799,
    discountBadge: 'BESTSELLER',
    rating: 5.0,
    reviewsCount: 1317,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 7,
    name: 'Pastel Travel Pencil Case',
    subtitle: 'Large Capacity • Water-Resistant Canvas',
    category: 'bags',
    price: 299,
    originalPrice: 449,
    discountBadge: '33% OFF',
    rating: 4.9,
    reviewsCount: 885,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 8,
    name: 'Premium Sticky Notes Palette',
    subtitle: 'Self-Adhesive • 6 Pastel Tone Pads',
    category: 'supplies',
    price: 129,
    originalPrice: 199,
    discountBadge: 'NEW',
    rating: 4.8,
    reviewsCount: 654,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80'
  }
];

// Expanded 32+ products for the dedicated All Products Infinite Scroll Catalog
export const KIT_BUNDLES = [
  {
    id: 1001,
    name: 'Back-to-School Starter Kit',
    school: 'Any School',
    className: 'Class 5',
    subtitle: 'Notebook + pen set + planner + organizer',
    category: 'kits',
    price: 1249,
    originalPrice: 1699,
    discountBadge: 'BUNDLE DEAL',
    rating: 4.9,
    reviewsCount: 640,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop&q=80'
    ],
    kitItems: [
      { id: 1, name: 'Minimal Spiral Notebook', price: 199 },
      { id: 2, name: 'Gel Pen Set (10pcs)', price: 249 },
      { id: 6, name: 'Classic Academic Planner 2026', price: 549 },
      { id: 4, name: 'Multi-Function Desk Organizer', price: 499 }
    ]
  },
  {
    id: 1002,
    name: 'Board Exam Revision Kit',
    school: 'Any School',
    className: 'Class 10',
    subtitle: 'Math notebook + highlighters + sticky notes + planner',
    category: 'kits',
    price: 1099,
    originalPrice: 1499,
    discountBadge: 'TOP PICK',
    rating: 5.0,
    reviewsCount: 710,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=900&auto=format&fit=crop&q=80'
    ],
    kitItems: [
      { id: 10, name: 'Graph Grid Math Notebook (3 Pack)', price: 279 },
      { id: 3, name: 'Pastel Highlighters Set', price: 189 },
      { id: 8, name: 'Premium Sticky Notes Palette', price: 129 },
      { id: 19, name: 'Student Habit & Goal Tracker Planner', price: 399 }
    ]
  },
  {
    id: 1003,
    name: 'Creative Artist Starter Kit',
    school: 'Ryan International',
    className: 'Class 8',
    subtitle: 'Brush pens + sketch pad + markers + tote',
    category: 'kits',
    price: 1499,
    originalPrice: 2199,
    discountBadge: 'CREATIVE BUNDLE',
    rating: 4.9,
    reviewsCount: 540,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80'
    ],
    kitItems: [
      { id: 17, name: 'Artist Watercolor Paint Pan Set (36 Colors)', price: 599 },
      { id: 11, name: 'Calligraphy Brush Pen Set (12 Shades)', price: 449 },
      { id: 18, name: 'Heavyweight Mixed Media Pad (A4)', price: 329 },
      { id: 27, name: 'Heavy Canvas Tote Bag with Pen Slots', price: 399 }
    ]
  },
  {
    id: 1004,
    name: 'DPS Primary Learning Kit',
    school: 'Delhi Public School',
    className: 'Class 3',
    subtitle: 'Drawing book + jumbo pencils + crayons + activity notebook',
    category: 'kits',
    price: 899,
    originalPrice: 1199,
    discountBadge: 'PRIMARY PICK',
    rating: 4.8,
    reviewsCount: 312,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80'
    ],
    kitItems: [
      { id: 9, name: 'Colorful Drawing Book', price: 179 },
      { id: 2, name: 'Jumbo Pencil Set', price: 199 },
      { id: 17, name: 'Wax Crayons Set', price: 249 },
      { id: 1, name: 'Activity Notebook', price: 199 }
    ]
  },
  {
    id: 1005,
    name: 'Ryan Middle School Study Kit',
    school: 'Ryan International',
    className: 'Class 8',
    subtitle: 'Subject notebooks + gel pens + index tabs + study planner',
    category: 'kits',
    price: 1199,
    originalPrice: 1599,
    discountBadge: 'STUDY BUNDLE',
    rating: 4.8,
    reviewsCount: 428,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=900&auto=format&fit=crop&q=80'
    ],
    kitItems: [
      { id: 10, name: 'Subject Notebook Set', price: 329 },
      { id: 2, name: 'Gel Pen Set', price: 249 },
      { id: 8, name: 'Index Tabs and Sticky Notes', price: 149 },
      { id: 6, name: 'Study Planner', price: 399 }
    ]
  },
  {
    id: 1006,
    name: 'Kendriya Vidyalaya Exam Kit',
    school: 'Kendriya Vidyalaya',
    className: 'Class 10',
    subtitle: 'Graph notebook + revision cards + highlighters + geometry set',
    category: 'kits',
    price: 999,
    originalPrice: 1399,
    discountBadge: 'EXAM READY',
    rating: 4.9,
    reviewsCount: 516,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&auto=format&fit=crop&q=80'
    ],
    kitItems: [
      { id: 10, name: 'Graph Grid Math Notebook', price: 279 },
      { id: 3, name: 'Pastel Highlighters Set', price: 189 },
      { id: 8, name: 'Revision Cards', price: 159 },
      { id: 4, name: 'Geometry and Math Set', price: 299 }
    ]
  },
  {
    id: 1007,
    name: 'DPS Senior Commerce Kit',
    school: 'Delhi Public School',
    className: 'Class 12',
    subtitle: 'Ledger notebook + planner + sticky notes + premium pens',
    category: 'kits',
    price: 1299,
    originalPrice: 1749,
    discountBadge: 'SENIOR KIT',
    rating: 4.9,
    reviewsCount: 286,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=900&auto=format&fit=crop&q=80'
    ],
    kitItems: [
      { id: 1, name: 'Hardbound Ledger Notebook', price: 349 },
      { id: 6, name: 'Academic Planner', price: 549 },
      { id: 8, name: 'Premium Sticky Notes', price: 129 },
      { id: 2, name: 'Premium Gel Pen Set', price: 249 }
    ]
  }
];

export const ALL_PRODUCTS = [
  ...BEST_SELLERS,
  ...KIT_BUNDLES,
  {
    id: 9,
    name: 'Hardbound Dotted Bullet Journal',
    subtitle: '180gsm Ultra-Thick • No Bleedthrough',
    category: 'notebooks',
    price: 389,
    originalPrice: 499,
    discountBadge: '22% OFF',
    rating: 4.9,
    reviewsCount: 420,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 10,
    name: 'Graph Grid Math Notebook (3 Pack)',
    subtitle: 'Quadrant Ruled • Ideal for Engineering & STEM',
    category: 'notebooks',
    price: 279,
    originalPrice: 399,
    discountBadge: '30% OFF',
    rating: 4.8,
    reviewsCount: 310,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 11,
    name: 'Calligraphy Brush Pen Set (12 Shades)',
    subtitle: 'Flexible Nylon Tips • Water-based Blendable',
    category: 'pens',
    price: 449,
    originalPrice: 650,
    discountBadge: '31% OFF',
    rating: 4.9,
    reviewsCount: 840,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 12,
    name: 'Fineliner Color Sketch Pens (0.4mm)',
    subtitle: 'Precision Metal Clad Tip • 24 Vibrant Inks',
    category: 'pens',
    price: 349,
    originalPrice: 499,
    discountBadge: '30% OFF',
    rating: 4.7,
    reviewsCount: 615,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 13,
    name: 'Matte Metal Stapler & Clip Combo',
    subtitle: 'Heavy-Duty 25 Sheet Capacity • Includes 1000 Pins',
    category: 'supplies',
    price: 229,
    originalPrice: 320,
    discountBadge: '28% OFF',
    rating: 4.6,
    reviewsCount: 230,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 14,
    name: 'Vintage Pastel Binder Clips (30pcs)',
    subtitle: 'Assorted Sizes in Reusable Acrylic Jar',
    category: 'supplies',
    price: 159,
    originalPrice: 229,
    discountBadge: '30% OFF',
    rating: 4.8,
    reviewsCount: 512,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 15,
    name: 'Water-Resistant Campus Backpack 22L',
    subtitle: 'Padded Laptop Sleeve • Ergonomic Shoulder Straps',
    category: 'bags',
    price: 899,
    originalPrice: 1499,
    discountBadge: '40% OFF',
    rating: 4.9,
    reviewsCount: 1580,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 16,
    name: 'Double-Decker Standing Pen Case',
    subtitle: 'Telescopic Pop-up Design • Corduroy Texture',
    category: 'bags',
    price: 249,
    originalPrice: 399,
    discountBadge: 'HOT',
    rating: 4.8,
    reviewsCount: 760,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 17,
    name: 'Artist Watercolor Paint Pan Set (36 Colors)',
    subtitle: 'Includes Refillable Water Brush & Mixing Palette',
    category: 'art',
    price: 599,
    originalPrice: 899,
    discountBadge: '33% OFF',
    rating: 4.9,
    reviewsCount: 920,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 18,
    name: 'Heavyweight Mixed Media Pad (A4)',
    subtitle: '300gsm Cold-Pressed • Ideal for Gouache & Ink',
    category: 'art',
    price: 329,
    originalPrice: 450,
    discountBadge: '27% OFF',
    rating: 4.9,
    reviewsCount: 440,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 19,
    name: 'Student Habit & Goal Tracker Planner',
    subtitle: 'Undated 12-Month • Monthly Milestones & Reflections',
    category: 'planners',
    price: 399,
    originalPrice: 599,
    discountBadge: '33% OFF',
    rating: 4.8,
    reviewsCount: 680,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 20,
    name: 'Daily Desk Time-Block Pad (60 Tear-Offs)',
    subtitle: 'Priority Matrix • Hourly Schedule & Notes',
    category: 'planners',
    price: 179,
    originalPrice: 250,
    discountBadge: '28% OFF',
    rating: 4.7,
    reviewsCount: 390,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 21,
    name: 'Deluxe Back-to-School Hamper Kit',
    subtitle: 'Complete 15-Item Student Stationery Package',
    category: 'gifts',
    price: 999,
    originalPrice: 1599,
    discountBadge: '38% OFF',
    rating: 5.0,
    reviewsCount: 1420,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 22,
    name: 'Young Artist Gift Box with Wooden Easel',
    subtitle: 'Paints, Brushes, Canvases, Palette & Case',
    category: 'gifts',
    price: 1199,
    originalPrice: 1799,
    discountBadge: '33% OFF',
    rating: 4.9,
    reviewsCount: 890,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 23,
    name: 'Precision Geometry Math Box Set',
    subtitle: 'Metal Compass, Divider, Set Squares & Protractor',
    category: 'supplies',
    price: 199,
    originalPrice: 280,
    discountBadge: '29% OFF',
    rating: 4.8,
    reviewsCount: 540,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 24,
    name: 'Mechanical Drafting Pencil Trio (0.5, 0.7, 0.9mm)',
    subtitle: 'Full Metal Body • Non-Slip Knurled Grip + Lead Tubes',
    category: 'pens',
    price: 369,
    originalPrice: 499,
    discountBadge: '26% OFF',
    rating: 4.9,
    reviewsCount: 710,
    inStock: true,
    image: '/images/drafting-pencils.jpg'
  },
  {
    id: 25,
    name: 'Recycled Kraft Spiral Pocket Notebooks (5 Pack)',
    subtitle: 'Eco-Friendly Unbleached Paper • Compact 3.5x5.5"',
    category: 'notebooks',
    price: 219,
    originalPrice: 320,
    discountBadge: '31% OFF',
    rating: 4.8,
    reviewsCount: 430,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 26,
    name: 'Kawaii Animal Eraser Collection (12pcs)',
    subtitle: 'Non-Smudge Thermoplastic • Fun Puzzle Design',
    category: 'supplies',
    price: 119,
    originalPrice: 179,
    discountBadge: '34% OFF',
    rating: 4.7,
    reviewsCount: 650,
    inStock: true,
    image: '/images/kawaii-erasers.jpg'
  },
  {
    id: 27,
    name: 'Heavy Canvas Tote Bag with Pen Slots',
    subtitle: '100% Organic Cotton • Fits Laptops up to 15.6"',
    category: 'bags',
    price: 399,
    originalPrice: 599,
    discountBadge: '33% OFF',
    rating: 4.9,
    reviewsCount: 520,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 28,
    name: 'Dual-Tip Alcohol Art Markers (24 Colors)',
    subtitle: 'Chisel & Fine Nibs • Fast Drying with Zipper Pouch',
    category: 'art',
    price: 749,
    originalPrice: 1099,
    discountBadge: '32% OFF',
    rating: 4.9,
    reviewsCount: 1140,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 29,
    name: 'Study Revision Flashcards Box (200 Cards)',
    subtitle: 'Color-Coded Rings • Heavy Index Cardstock',
    category: 'supplies',
    price: 169,
    originalPrice: 249,
    discountBadge: '32% OFF',
    rating: 4.8,
    reviewsCount: 380,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 30,
    name: 'Teacher Appreciation Gift Box',
    subtitle: 'Laser-Engraved Wooden Pen, Notebook, Mug & Bookmark',
    category: 'gifts',
    price: 849,
    originalPrice: 1200,
    discountBadge: '29% OFF',
    rating: 5.0,
    reviewsCount: 780,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 31,
    name: 'Exam Warrior Transparent Pouch Set (3pcs)',
    subtitle: 'Board Exam Approved • Clear Heavy-Duty PVC',
    category: 'bags',
    price: 149,
    originalPrice: 220,
    discountBadge: '32% OFF',
    rating: 4.8,
    reviewsCount: 940,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 32,
    name: 'Weekly Meal & Fitness Desk Planner',
    subtitle: '52 Tear-off Sheets • Fridge Magnetic Backing',
    category: 'planners',
    price: 249,
    originalPrice: 349,
    discountBadge: '28% OFF',
    rating: 4.7,
    reviewsCount: 290,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=500&auto=format&fit=crop&q=80'
  }
];

export const HERO_SLIDES = [
  {
    eyebrow: 'WRITE. PLAN. CREATE.',
    title: 'Everything You Need, All in One Place.',
    description: 'Discover high-quality stationery and school essentials designed for every idea, lesson, and creative project.',
    primaryCta: 'SHOP NOW',
    secondaryCta: 'EXPLORE COLLECTION',
    badge: 'NEW SCHOOL TERM ARRIVALS',
    image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&auto=format&fit=crop&q=80'
  },
  {
    eyebrow: 'INSPIRE YOUR STUDY ROUTINE',
    title: 'Aesthetic Planners & Smooth Writing Tools',
    description: 'Elevate your daily notes and bullet journals with curated pastel pens, highlighters, and hardbound organizers.',
    primaryCta: 'VIEW PLANNERS',
    secondaryCta: 'PEN KITS',
    badge: 'UP TO 30% OFF',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80'
  },
  {
    eyebrow: 'EXPRESS YOURSELF',
    title: 'Premium Art & Craft Supplies',
    description: 'Bring your imagination to life with our collection of vibrant paints, professional markers, and heavy-weight sketchbooks.',
    primaryCta: 'SHOP ART',
    secondaryCta: 'CRAFT KITS',
    badge: 'CREATIVE ESSENTIALS',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80'
  },
  {
    eyebrow: 'BACK TO CAMPUS',
    title: 'Ergonomic Bags & Smart Organizers',
    description: 'Carry your world effortlessly. Discover our new range of water-resistant, durable backpacks designed for modern students.',
    primaryCta: 'VIEW BAGS',
    secondaryCta: 'ORGANIZERS',
    badge: 'NEW ARRIVALS',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
  }
];

// About Us Page Data
export const ABOUT_DATA = {
  mission: 'To empower students, artists, and creators with thoughtfully designed, eco-friendly stationery that makes learning delightful and accessible to everyone.',
  stats: [
    { value: '50,000+', label: 'Happy Students & Learners' },
    { value: '1,200+', label: 'School Classrooms Supplied' },
    { value: '100%', label: 'Acid-Free Non-Toxic Paper' },
    { value: '4.9 / 5', label: 'Average Customer Rating' }
  ],
  milestones: [
    {
      year: '2021',
      title: 'The Missing Notebook Dilemma',
      description: 'School Cart began in a small college dorm room when our founders realized that premium study notebooks and smooth writing pens were either low-quality or ridiculously overpriced.'
    },
    {
      year: '2023',
      title: 'School Partnership Program',
      description: 'We partnered with over 150 schools across Delhi, Mumbai, and Bengaluru, supplying subsidized examination kits and back-to-school essentials directly to classrooms.'
    },
    {
      year: '2024',
      title: '100% Eco-Conscious Pledge',
      description: 'Eliminated single-use plastics across our packaging and transitioned all paper pulp to FSC-certified renewable sustainable plantations.'
    },
    {
      year: '2026',
      title: 'Empowering 50,000+ Young Creators',
      description: 'Today, School Cart stands as India’s fastest-growing student-centric stationery brand, celebrated for aesthetic designs, ethical pricing, and unmatched durability.'
    }
  ],
  values: [
    {
      id: 1,
      title: 'Eco-Conscious & Sustainable',
      description: 'Every notebook is crafted with 100% acid-free, non-toxic paper and biodegradable plant-based vegetable inks.',
      badge: 'Planet Friendly',
      icon: 'Leaf'
    },
    {
      id: 2,
      title: 'Student-First Affordable Pricing',
      description: 'We cut out distributors and middle-markups to deliver artist-grade supplies at prices every student can afford.',
      badge: 'Fair Prices',
      icon: 'Smile'
    },
    {
      id: 3,
      title: 'Ergonomic Precision & Quality',
      description: 'From non-slip pen grips to smooth lay-flat bindings, every product is rigorously tested for daily heavy study usage.',
      badge: 'Durable Build',
      icon: 'ShieldCheck'
    },
    {
      id: 4,
      title: 'Give-Back Community Pledge',
      description: 'For every 10 notebooks purchased, School Cart donates 1 complete student supply kit to underprivileged school children.',
      badge: '1-for-10 Pledge',
      icon: 'HeartHandshake'
    }
  ],
  team: [
    {
      name: 'Ritesh Yadav',
      role: 'Founder & Product Lead',
      bio: 'Stationery enthusiast obsessed with smooth ballpoint physics, tactile paper grains, and minimalist desk setups.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Aaditya Sharma',
      role: 'Creative Design Director',
      bio: 'Illustrator and typographer behind our pastel palettes, custom planner grids, and vibrant aesthetic covers.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    },
    {
      name: 'Priya Mehra',
      role: 'Student Community & Sustainability Lead',
      bio: 'Former school educator championing eco-friendly packaging and student ambassador clubs across 40+ universities.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
    }
  ],
  testimonials: [
    {
      quote: "The 180 GSM bullet journal changed my medical school notes entirely. No highlighter bleed-through whatsoever, and the spiral binding is built like a tank!",
      author: "Ananya Patel",
      role: "3rd Year MBBS Student, Mumbai"
    },
    {
      quote: "As an art teacher, finding non-toxic, highly pigmented watercolor sets under ₹600 was impossible until School Cart. My students adore the pan sets.",
      author: "Vikram Sengupta",
      role: "High School Art Educator, Kolkata"
    },
    {
      quote: "Delivery is lightning fast and the pastel highlighters are the most aesthetic stationery items on my study desk. Highly recommend!",
      author: "Sneha Roy",
      role: "Class 12 CBSE Aspirant, Bengaluru"
    }
  ]
};

export const MOCK_USER_PROFILE = {
  name: 'Ritesh Yadav',
  email: 'ritesh.yadav@example.com',
  phone: '+91 98765 43210',
  studentId: 'SC-2026-8941',
  institution: 'Delhi Technological University',
  standard: 'Computer Science, 3rd Year',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  memberSince: 'July 2024',
  rewardPoints: 480,
  addresses: [
    {
      id: 1,
      type: 'Home (Default)',
      name: 'Ritesh Yadav',
      phone: '+91 98765 43210',
      addressLine: 'Flat 402, Royal Palms Residency, Sector 14',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Campus / Hostel',
      name: 'Ritesh Yadav',
      phone: '+91 98765 43210',
      addressLine: 'Boys Hostel Block-C, Room 312, DTU Campus, Shahbad Daulatpur',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110042',
      isDefault: false
    }
  ],
  orders: [
    {
      id: 'SC-9824',
      date: '28 Aug 2026',
      status: 'Delivered',
      statusColor: 'green',
      total: 587,
      itemsCount: 3,
      trackingNumber: 'BLUEDART-88392104',
      items: [
        {
          id: 1,
          name: 'Minimal Spiral Notebook',
          quantity: 2,
          price: 199,
          image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=80'
        },
        {
          id: 3,
          name: 'Pastel Highlighters Set',
          quantity: 1,
          price: 189,
          image: '/images/pastel-highlighters.jpg'
        }
      ]
    },
    {
      id: 'SC-9418',
      date: '02 Sep 2026',
      status: 'In Transit',
      statusColor: 'amber',
      total: 449,
      itemsCount: 2,
      trackingNumber: 'DELHIVERY-49910382',
      items: [
        {
          id: 6,
          name: 'Precision Geometry Compass Set',
          quantity: 1,
          price: 249,
          image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=500&auto=format&fit=crop&q=80'
        },
        {
          id: 7,
          name: 'Vintage Sticky Notes Booklet',
          quantity: 2,
          price: 100,
          image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&auto=format&fit=crop&q=80'
        }
      ]
    },
    {
      id: 'SC-8920',
      date: '15 Jul 2026',
      status: 'Delivered',
      statusColor: 'green',
      total: 799,
      itemsCount: 1,
      trackingNumber: 'EKART-99210481',
      items: [
        {
          id: 5,
          name: 'Ergonomic Student Backpack 24L',
          quantity: 1,
          price: 799,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80'
        }
      ]
    }
  ]
};
