export type CategoryId = 'all' | 'ramen_spicy' | 'ramen_mild' | 'drinks_soju' | 'snacks_candy' | 'packs_combos';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  weightOrVolume: string;
}

export interface Product {
  id: string;
  name: string;
  nativeName?: string; // Korean / Chinese characters
  brand: string;
  category: CategoryId;
  description: string;
  price: number; // default/base price in Soles (S/)
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isNew?: boolean;
  isSpicy?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3 | 4 | 5; // 0=none, 1=mild, 2=medium, 3=hot, 4=very hot, 5=extreme
  inStock: boolean;
  ingredients?: string[];
  preparationTime?: string;
  origin: string; // e.g. "Corea del Sur", "China", "Japón"
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface DeliveryDistrict {
  id: string;
  name: string;
  fee: number; // in S/
  estimatedMinutes: string;
}

export type PaymentMethod = 'yape' | 'bcp';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
  paymentMethod?: PaymentMethod;
  deliveryType?: 'delivery' | 'pickup';
  districtId?: string;
  reference?: string;
  notes?: string;
}

export interface Order {
  id: string; // e.g. "KNB-7492"
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  couponCode?: string;
  tip: number;
  total: number;
  customerInfo: CustomerInfo;
  status: 'preparando' | 'en_camino' | 'entregado';
  paymentConfirmed?: boolean;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  image: string;
  bgColor: string;
  targetCategory?: CategoryId;
  targetProductId?: string;
}
