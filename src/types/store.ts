export interface Product {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'tracksuits' | 'footwear' | 'fragrances' | 'watches' | 'combos';
  subCategory?: string;
  price: number; // in PKR
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  isSale?: boolean;
  isSoldOut?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  isColdCollection?: boolean;
  comboItems?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface LookReel {
  id: string;
  title: string;
  productName: string;
  price: number;
  originalPrice?: number;
  productId: string;
  image: string;
  videoPlaceholderUrl?: string;
  tags: string[];
  views: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'cod';
  status: 'confirmed' | 'packed' | 'in_transit' | 'out_for_delivery' | 'delivered';
  courier: string;
  trackingNumber: string;
  createdAt: string;
  estimatedDelivery: string;
}
