import { Product, LookReel } from '../types/store';
import heroImg from '../assets/images/hero_cold_collection_1792648854211.jpg';
import comboImg from '../assets/images/combo_denim_watch_1792648854688.jpg';
import perfumeImg from '../assets/images/perception_perfume_1792648855411.jpg';
import bootsImg from '../assets/images/leather_chelsea_boots_1792648855661.jpg';

// Bundled Vite assets with public folder fallbacks
export const HERO_IMAGE: string = heroImg || '/images/hero_cold_collection.jpg';
export const COMBO_DENIM_WATCH_IMAGE: string = comboImg || '/images/combo_denim_watch.jpg';
export const PERCEPTION_PERFUME_IMAGE: string = perfumeImg || '/images/perception_perfume.jpg';
export const CHELSEA_BOOTS_IMAGE: string = bootsImg || '/images/leather_chelsea_boots.jpg';

export const PRODUCTS: Product[] = [
  // --- COMBO OFFERS ---
  {
    id: 'combo-baggy-tank',
    name: 'Baggy Jeans × Cartier Tank',
    category: 'combos',
    subCategory: 'Signature Combo',
    price: 2999,
    originalPrice: 7000,
    image: COMBO_DENIM_WATCH_IMAGE,
    isSale: true,
    rating: 4.9,
    reviewsCount: 184,
    description: 'DN signature duo: Heavyweight 14oz washed relaxed baggy denim paired with the timeless rectangular Tank gold-accented dress watch with genuine embossed leather strap.',
    features: ['14oz Premium Washed Denim', 'High-grade Quartz Tank Watch', 'Reinforced Rivets & YKK Zip', 'Complimentary Luxury Gift Box'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Washed Black & Gold Tank', hex: '#1C1C1E' },
      { name: 'Vintage Blue & Silver Tank', hex: '#3B4E6B' },
    ],
    comboItems: ['DN Heavyweight Baggy Denim Jeans', 'Cartier Tank-Style Rectangular Leather Watch']
  },
  {
    id: 'combo-eclipse-prx',
    name: 'Eclipse × PRX Combo (2 in 1)',
    category: 'combos',
    subCategory: '2 in 1 Deal',
    price: 4450,
    originalPrice: 8000,
    image: COMBO_DENIM_WATCH_IMAGE,
    isSale: true,
    rating: 4.8,
    reviewsCount: 128,
    description: 'DN Eclipse oversized waffle thermal crewneck alongside the integrated-bracelet PRX mechanical homage timepiece.',
    features: ['Waffle Textured 340 GSM Cotton', 'Stainless Steel Integrated Bracelet', 'Water Resistant Watch Case', 'Oversized Streetwear Silhouette'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#18181B' },
      { name: 'Stone Grey', hex: '#71717A' }
    ],
    comboItems: ['DN Eclipse Heavy Thermal Shirt', 'Integrated PRX Steel Watch']
  },
  {
    id: 'combo-linen-pp-square',
    name: 'Linen Cropped + PP Square',
    category: 'combos',
    subCategory: 'Summer Luxury Deal',
    price: 3850,
    originalPrice: 5950,
    image: HERO_IMAGE,
    isSale: true,
    rating: 4.7,
    reviewsCount: 96,
    description: 'Breathable structured Irish linen cropped box-fit overshirt matched with the modern square bezel luxury sport watch.',
    features: ['100% Pure Crinkled Linen', 'Cropped Boxy Silhouette', 'Square Bezel Textured Dial Watch', 'Natural Mother of Pearl Buttons'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sand Khaki', hex: '#C2B280' },
      { name: 'Pure Chalk', hex: '#F4F4F5' }
    ],
    comboItems: ['Box-Fit Cropped Linen Overshirt', 'PP Square Geometric Sport Watch']
  },
  {
    id: 'combo-tank-prx-dual',
    name: 'Tank-Prx Combo (2 in 1)',
    category: 'combos',
    subCategory: 'Double Timepiece Pack',
    price: 3500,
    originalPrice: 8000,
    image: COMBO_DENIM_WATCH_IMAGE,
    isSale: true,
    rating: 4.9,
    reviewsCount: 210,
    description: 'The ultimate watch enthusiasts package: 1 Cartier Tank style dress watch for formal occasions + 1 PRX steel sports watch for everyday streetwear.',
    features: ['2 Luxury Homage Timepieces', 'Hardened Mineral Crystal Glass', 'Hypoallergenic Stainless Steel Back', 'Dual Presentation Boxes'],
    sizes: ['One Size (Adjustable Links)'],
    colors: [
      { name: 'Gold Tank + Silver PRX', hex: '#D4AF37' }
    ],
    comboItems: ['Classic Black Leather Tank Watch', 'Brushed Steel PRX Bracelet Watch']
  },
  {
    id: 'combo-max-pack-3',
    name: 'MAX Combo Pack (Any 3)',
    category: 'combos',
    subCategory: 'Mega Wardrobe Bundle',
    price: 9950,
    originalPrice: 18000,
    image: HERO_IMAGE,
    isSale: true,
    rating: 5.0,
    reviewsCount: 74,
    description: 'Build your entire capsule wardrobe: Pick any 1 Heavy Cold Collection Top, 1 Korean Streetwear Pant, and 1 Watch or Fragrance of your choice.',
    features: ['Pick Any 3 Items', 'Maximum Bundle Discount of 45%', 'Free Express Courier Across Pakistan', 'Priority Dispatch'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Custom Curated Pack', hex: '#27272A' }
    ],
    comboItems: ['1 Top (Quarter Zip or Sweatshirt)', '1 Bottom (Korean Pant or Denim)', '1 Luxury Watch or Fragrance']
  },
  {
    id: 'combo-baggy-tracksuit',
    name: 'DN Baggy Tracksuit (Box-Fit Baggy Shirt + Korean Pants)',
    category: 'combos',
    subCategory: 'Streetwear Co-Ord',
    price: 6500,
    originalPrice: 9999,
    image: HERO_IMAGE,
    isSale: true,
    rating: 4.9,
    reviewsCount: 165,
    description: 'The viral DN Baggy set: Drop-shoulder boxy heavyweight cotton t-shirt coupled with wide-leg Korean pleated drape pants.',
    features: ['280 GSM Interlock Cotton Top', 'Flowy Wrinkle-Resistant Korean Fabric', 'Deep Side Pockets & Elastic Drawstring Waist', 'Designed for Casual & Dressed-Up Looks'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Black', hex: '#18181B' },
      { name: 'Mocha Brown', hex: '#4A3B32' },
      { name: 'Slate Olive', hex: '#4B5320' }
    ],
    comboItems: ['Box-Fit Heavy Cotton Baggy Shirt', 'Wide-Leg Korean Drape Pants']
  },
  {
    id: 'combo-islamic-deal',
    name: 'Islamic Deal (3 in 1)',
    category: 'combos',
    subCategory: 'Special Curated Set',
    price: 2850,
    originalPrice: 6100,
    image: PERCEPTION_PERFUME_IMAGE,
    isSale: true,
    rating: 4.9,
    reviewsCount: 340,
    description: 'Specially curated modest essentials: 1 Non-alcoholic long-lasting concentrated Attar oil, 1 Natural Oudh Prayer Beads (Tasbeeh), and 1 Minimalist Linen Kurta Shirt.',
    features: ['100% Pure Non-Alcoholic Fragrance', 'Solid Sandalwood Tasbeeh Beads', 'Lightweight Breathable Linen Blend', 'Traditional Heritage Packaging'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Off-White & Oudh', hex: '#F5F5F0' }
    ],
    comboItems: ['Non-Alcoholic Oudh Concentrated Fragrance', 'Handcrafted Natural Wood Tasbeeh', 'Relaxed Linen Kurta Shirt']
  },
  {
    id: 'combo-linen-coord',
    name: 'Linen Co-ord Set',
    category: 'combos',
    subCategory: 'Resort & Casual',
    price: 4250,
    originalPrice: 8999,
    image: HERO_IMAGE,
    isSale: true,
    isSoldOut: false,
    rating: 4.8,
    reviewsCount: 112,
    description: 'Relaxed resort collar Cuban shirt with matching drawstring straight-cut linen trousers. Lightweight and ultra-comfortable.',
    features: ['Premium Irish Linen & Cotton Blend', 'Relaxed Camp Collar', 'Drawcord Elastic Waist', 'Breathable Summer Weave'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive Sage', hex: '#556B2F' },
      { name: 'Ecru Chalk', hex: '#EAE6DF' }
    ],
    comboItems: ['Camp Collar Linen Shirt', 'Relaxed Straight Linen Trouser']
  },

  // --- THE COLD COLLECTION ---
  {
    id: 'cold-quarter-zip',
    name: 'Knitted Quarter Zip Sweater',
    category: 'tops',
    subCategory: 'The Cold Collection',
    price: 3650,
    originalPrice: 5800,
    image: HERO_IMAGE,
    isSale: true,
    isNew: true,
    isColdCollection: true,
    rating: 4.9,
    reviewsCount: 88,
    description: 'DN signature chunky ribbed knit quarter-zip pullover. Features an engineered metal zip, high funnel neck collar, and relaxed drop-shoulder drape.',
    features: ['Heavyweight Ribbed Cotton-Wool Blend', 'Custom Matte Metal Puller', 'Drop Shoulder Relaxed Fit', 'Anti-Pilling Yarn Formulation'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Melange Charcoal', hex: '#374151' },
      { name: 'Oatmeal Cream', hex: '#D6CEBE' }
    ]
  },
  {
    id: 'cold-baggy-sweatshirt',
    name: 'Baggy Fleece Sweatshirt',
    category: 'tops',
    subCategory: 'The Cold Collection',
    price: 2950,
    originalPrice: 4800,
    image: HERO_IMAGE,
    isSale: true,
    isColdCollection: true,
    rating: 4.8,
    reviewsCount: 142,
    description: '400 GSM brushed heavyweight cotton fleece crewneck with extra-wide sleeves, ribbed cuffs, and an oversized silhouette engineered for warmth.',
    features: ['400 GSM Ultra-Soft Brushed Fleece', 'Pre-Shrunk 100% Combed Cotton', 'Boxy Streetwear Silhouette', 'Minimal Tone-on-Tone DN Hem Embroidery'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Washed Black', hex: '#1C1917' },
      { name: 'Forest Moss', hex: '#2E3A2F' }
    ]
  },
  {
    id: 'cold-bomber-jacket',
    name: 'DN Oversized Puffer Bomber Jacket',
    category: 'tops',
    subCategory: 'The Cold Collection',
    price: 5499,
    originalPrice: 8500,
    image: HERO_IMAGE,
    isSale: true,
    isColdCollection: true,
    rating: 5.0,
    reviewsCount: 67,
    description: 'Weather-resistant technical shell packed with thermal insulation. Double front storm flap, deep fleece-lined handwarmer pockets.',
    features: ['Water-Repellent Poly Shell', 'Thermal Down-Alternative Fill', 'Heavy Gauge Two-Way Front Zipper', 'Ribbed Storm Cuffs & Hem'],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Matte Black', hex: '#0F172A' },
      { name: 'Gunmetal Slate', hex: '#475569' }
    ]
  },
  {
    id: 'cold-korean-pants',
    name: 'Korean Pleated Drape Trousers',
    category: 'bottoms',
    subCategory: 'The Cold Collection',
    price: 3200,
    originalPrice: 5200,
    image: HERO_IMAGE,
    isSale: true,
    isColdCollection: true,
    rating: 4.9,
    reviewsCount: 104,
    description: 'Clean double front pleats with a relaxed, flowing straight leg that falls cleanly over sneakers and chelsea boots.',
    features: ['Wrinkle-Free Heavy Poly-Viscose Drape', 'Double Front Reverse Pleats', 'Hidden Waist Extenders for Perfect Fit', 'Tailored Pocket Linings'],
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Deep Charcoal', hex: '#1F2937' },
      { name: 'Coffee Brown', hex: '#3E2723' }
    ]
  },

  // --- TOPS (ALL) ---
  {
    id: 'top-turkish-polo',
    name: 'Turkish Knitted Polo',
    category: 'tops',
    subCategory: 'Polos & Shirts',
    price: 2750,
    originalPrice: 4500,
    image: HERO_IMAGE,
    isSale: true,
    rating: 4.9,
    reviewsCount: 135,
    description: 'Textured open-weave Turkish knit polo featuring a Johnny collar and ribbed waistband for a clean retro-modern aesthetic.',
    features: ['100% Breathable Turkish Combed Yarn', 'Open Johnny Collar (No Buttons)', 'Fine Ottoman Knit Structure', 'Ribbed Sleeve Bands'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mocha Taupe', hex: '#7D6E63' },
      { name: 'Ivory Cream', hex: '#FAF7F2' }
    ]
  },
  {
    id: 'top-needle-polo',
    name: 'Knitted Polo Drop Needle Fabric',
    category: 'tops',
    subCategory: 'Polos & Shirts',
    price: 2899,
    originalPrice: 4700,
    image: HERO_IMAGE,
    isSale: true,
    rating: 4.7,
    reviewsCount: 82,
    description: 'Vertical drop-needle textured fabric with delicate micro-striping and relaxed cut. High breathability for all-season styling.',
    features: ['Drop-Needle Vertical Jacquard Knit', 'Camp Collar Neckline', 'Silky Soft Handfeel', 'Pre-Washed for Zero Shrinkage'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy Midnight', hex: '#1E293B' },
      { name: 'Desert Sand', hex: '#C2B280' }
    ]
  },
  {
    id: 'top-linen-shirt',
    name: 'Relaxed Fit Linen Shirt',
    category: 'tops',
    subCategory: 'Polos & Shirts',
    price: 2650,
    originalPrice: 4200,
    image: HERO_IMAGE,
    isSale: true,
    rating: 4.8,
    reviewsCount: 94,
    description: 'Classic button-down long sleeve shirt crafted from airy pure linen. Garment washed for effortless relaxed texture.',
    features: ['Pure European Linen', 'Garment Dyed & Washed', 'Curved Hem for Untucked Styling', 'Horn-Style Buttons'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive Green', hex: '#3F4E3C' },
      { name: 'Chalk White', hex: '#F9FAFB' }
    ]
  },

  // --- FOOTWEAR & SHOES ---
  {
    id: 'shoes-chelsea-boots',
    name: 'Leather Chelsea Boots',
    category: 'footwear',
    subCategory: 'Handcrafted Footwear',
    price: 5850,
    originalPrice: 9500,
    image: CHELSEA_BOOTS_IMAGE,
    isSale: true,
    rating: 4.9,
    reviewsCount: 154,
    description: 'Artisanal hand-burnished genuine leather Chelsea boots with heavy-duty stretch gussets, cushioned memory insole, and durable Blake-stitched rubber soles.',
    features: ['100% Genuine Full-Grain Cow Leather', 'Breathable Leather Lining & Insole', 'Elasticated Ankle Side Panels', 'Anti-Slip Tread Outsole'],
    sizes: ['40 (6)', '41 (7)', '42 (8)', '43 (9)', '44 (10)', '45 (11)'],
    colors: [
      { name: 'Midnight Black', hex: '#111111' },
      { name: 'Rich Dark Brown', hex: '#3E2723' }
    ]
  },

  // --- FRAGRANCES ---
  {
    id: 'fragrance-perception',
    name: 'Perception by DN Store',
    category: 'fragrances',
    subCategory: 'Signature Eau De Parfum',
    price: 2450,
    originalPrice: 4500,
    image: PERCEPTION_PERFUME_IMAGE,
    isSale: true,
    rating: 5.0,
    reviewsCount: 312,
    description: 'DN signature fragrance: A magnetic blend of Italian bergamot, smoky amber, roasted tonka bean, and velvety cedarwood. Over 12 hours of longevity.',
    features: ['Eau De Parfum 100ml / 3.4 FL OZ', 'Top Notes: Bergamot & Pink Pepper', 'Heart Notes: Ambergris & French Lavender', 'Base Notes: Virginian Cedar & Tonka Bean', 'Magnetic Heavy Cap'],
    sizes: ['100ml EDP']
  },

  // --- WATCHES ---
  {
    id: 'watch-tank-gold',
    name: 'DN Heritage Tank Timepiece',
    category: 'watches',
    subCategory: 'Classic Dress Watch',
    price: 1950,
    originalPrice: 4200,
    image: COMBO_DENIM_WATCH_IMAGE,
    isSale: true,
    rating: 4.9,
    reviewsCount: 189,
    description: 'Iconic rectangular tank design with roman numeral dial markers, blued hands, gold-plated case, and genuine croc-patterned leather strap.',
    features: ['Japanese Miyota Quartz Movement', 'Polished 316L Stainless Steel', 'Hardened Anti-Scratch Mineral Glass', 'Water Resistant 3ATM'],
    sizes: ['Standard Case (Adjustable Strap)']
  }
];

export const SHOP_THE_LOOK_REELS: LookReel[] = [
  {
    id: 'reel-1',
    title: 'Signature Scent & Aura',
    productName: 'Perception by DN Store',
    price: 2450,
    originalPrice: 4500,
    productId: 'fragrance-perception',
    image: PERCEPTION_PERFUME_IMAGE,
    tags: ['Fragrance', 'Signature', 'Long-lasting'],
    views: '48.2K'
  },
  {
    id: 'reel-2',
    title: 'Modern Tailoring with Chelsea Stride',
    productName: 'Leather Chelsea Boots',
    price: 5850,
    originalPrice: 9500,
    productId: 'shoes-chelsea-boots',
    image: CHELSEA_BOOTS_IMAGE,
    tags: ['Footwear', 'Genuine Leather', 'Handmade'],
    views: '72.4K'
  },
  {
    id: 'reel-3',
    title: 'Double Timepiece Stacking',
    productName: 'Tank PRX Combo',
    price: 3500,
    originalPrice: 8000,
    productId: 'combo-tank-prx-dual',
    image: COMBO_DENIM_WATCH_IMAGE,
    tags: ['Watches', '2 in 1 Deal', 'Hot Combo'],
    views: '94.1K'
  },
  {
    id: 'reel-4',
    title: 'Effortless Summer Texture',
    productName: 'Knitted Polo Drop Needle Fabric',
    price: 2899,
    originalPrice: 4700,
    productId: 'top-needle-polo',
    image: HERO_IMAGE,
    tags: ['Tops', 'Drop Needle', 'Relaxed'],
    views: '33.9K'
  },
  {
    id: 'reel-5',
    title: 'Crisp Lightweight Layering',
    productName: 'Linen Shirt',
    price: 2650,
    originalPrice: 4200,
    productId: 'top-linen-shirt',
    image: HERO_IMAGE,
    tags: ['Pure Linen', 'Resort', 'Breathable'],
    views: '29.5K'
  },
  {
    id: 'reel-6',
    title: 'Chunky Minimalist Knitwear',
    productName: 'Turkish Knitted Polo',
    price: 2750,
    originalPrice: 4500,
    productId: 'top-turkish-polo',
    image: HERO_IMAGE,
    tags: ['Turkish Knit', 'Retro Modern', 'Best Seller'],
    views: '54.7K'
  }
];

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Gujrat',
  'Mardan',
  'Mirpur (AJK)',
  'Sukkur'
];

export const STORE_LOCATIONS = [
  {
    name: 'DN Store Flagship - Lahore MM Alam',
    address: 'Shop #14, Ground Floor, Vogue Towers, MM Alam Road, Gulberg III, Lahore',
    city: 'Lahore',
    phone: '+92 42 35789123',
    hours: '12:00 PM - 11:00 PM (Daily)',
    whatsapp: '+92 300 1234567'
  },
  {
    name: 'DN Store Experience Center - Karachi Dolmen Mall',
    address: 'First Floor, Fashion Boulevard, Dolmen Mall Clifton, Marine Drive, Karachi',
    city: 'Karachi',
    phone: '+92 21 35298456',
    hours: '11:30 AM - 11:30 PM (Daily)',
    whatsapp: '+92 300 7654321'
  },
  {
    name: 'DN Store Concept Hub - Islamabad Centaurus',
    address: 'Level 2, Centaurus Mall, Jinnah Avenue, F-8, Islamabad',
    city: 'Islamabad',
    phone: '+92 51 2801456',
    hours: '11:00 AM - 11:00 PM (Daily)',
    whatsapp: '+92 300 9876543'
  }
];
