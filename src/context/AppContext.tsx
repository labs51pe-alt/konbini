import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  BUSINESS_CONFIG,
  COUPONS,
  DELIVERY_DISTRICTS,
  PRODUCTS,
} from '../data/products';
import {
  CartItem,
  CategoryId,
  CustomerInfo,
  DeliveryDistrict,
  Order,
  PaymentMethod,
  Product,
  ProductVariant,
} from '../types';

export type TabType = 'inicio' | 'explorar' | 'favoritos';

interface AppContextType {
  // Navigation & Screens
  isSplashActive: boolean;
  setIsSplashActive: (active: boolean) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;

  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Products & Modal
  products: Product[];
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (p: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, variantId: string, delta: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Coupon & Tip & District
  couponCode: string;
  appliedCoupon: { code: string; discountPercent?: number; discountFixed?: number; description: string } | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;

  tip: number;
  setTip: (amount: number) => void;

  selectedDistrict: DeliveryDistrict;
  setSelectedDistrict: (district: DeliveryDistrict) => void;
  deliveryFee: number;
  cartFinalTotal: number;

  // Customer & Checkout
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;

  // Orders
  orders: Order[];
  placeOrder: () => Order;
  sendOrderToWhatsApp: (order: Order) => void;
  completedOrder: Order | null;
  setCompletedOrder: (order: Order | null) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Payment Modal
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;

  // QR Modal
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;

  // Copy helper
  copiedText: string | null;
  copyToClipboard: (text: string, label: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Splash Screen: check if already entered this session or let user see it first
  const [isSplashActive, setIsSplashActive] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('konbini_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('konbini_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('konbini_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Products
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('konbini_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('konbini_cart', JSON.stringify(cart));
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // District
  const [selectedDistrict, setSelectedDistrict] = useState<DeliveryDistrict>(DELIVERY_DISTRICTS[0]);

  // Tip
  const [tip, setTip] = useState<number>(0);

  // Coupon
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent?: number;
    discountFixed?: number;
    description: string;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Customer Info
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    try {
      const saved = localStorage.getItem('konbini_customer');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      fullName: '',
      phone: '',
      address: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('konbini_customer', JSON.stringify(customerInfo));
  }, [customerInfo]);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('konbini_favs');
      return saved ? JSON.parse(saved) : ['buldak-carbonara', 'jinro-soju-strawberry'];
    } catch {
      return ['buldak-carbonara', 'jinro-soju-strawberry'];
    }
  });

  useEffect(() => {
    localStorage.setItem('konbini_favs', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Orders History
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('konbini_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Seed with 1 initial sample order so user sees the historical view in Pedidos
    return [
      {
        id: 'KNB-9124',
        createdAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString('es-PE', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
        items: [
          {
            productId: 'buldak-carbonara',
            variantId: 'pack3',
            quantity: 1,
            product: PRODUCTS[0],
            variant: PRODUCTS[0].variants[1],
          },
          {
            productId: 'jinro-soju-strawberry',
            variantId: 'botella',
            quantity: 1,
            product: PRODUCTS[1],
            variant: PRODUCTS[1].variants[0],
          },
        ],
        subtotal: 56.4,
        deliveryFee: 0,
        discountAmount: 0,
        tip: 0,
        total: 56.4,
        customerInfo: {
          fullName: 'Diego Morales',
          phone: '987654321',
          address: 'Av. Giráldez 350, Huancayo',
        },
        status: 'entregado',
        paymentConfirmed: true,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('konbini_orders', JSON.stringify(orders));
  }, [orders]);

  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2200);
  };

  // Cart Calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );

  // Direct free delivery and zero discounts
  const deliveryFee = 0;
  const discountAmount = 0;
  const cartFinalTotal = cartSubtotal;

  const addToCart = (product: Product, variantId?: string, quantity: number = 1) => {
    const selectedVariant: ProductVariant =
      variantId
        ? product.variants.find((v) => v.id === variantId) || product.variants[0]
        : product.variants[0];

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === product.id && i.variantId === selectedVariant.id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            variantId: selectedVariant.id,
            quantity,
            product,
            variant: selectedVariant,
          },
        ];
      }
    });
  };

  const updateCartQuantity = (productId: string, variantId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.variantId === variantId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setTip(0);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = COUPONS[cleanCode];
    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponCode(cleanCode);
      setCouponError(null);
      return true;
    } else {
      setCouponError('Cupón inválido o expirado. Prueba KONBINI10 o COREA5');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError(null);
  };

  // WhatsApp formatted string generator
  const formatWhatsAppMessage = (order: Order): string => {
    const itemsList = order.items
      .map(
        (item) =>
          `• ${item.quantity}x ${item.product.name} (${item.variant.name}) - S/ ${(
            item.variant.price * item.quantity
          ).toFixed(2)}`
      )
      .join('\n');

    const paymentLabel =
      order.customerInfo.paymentMethod === 'yape'
        ? `Yape (Cel: ${BUSINESS_CONFIG.yape.number})`
        : `Transferencia BCP (${BUSINESS_CONFIG.bcp.accountNumber})`;

    const deliveryDistrictName =
      DELIVERY_DISTRICTS.find((d) => d.id === order.customerInfo.districtId)?.name ||
      order.customerInfo.districtId;

    const message = `🛍️ *NUEVO PEDIDO - ${BUSINESS_CONFIG.name.toUpperCase()}*
━━━━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${order.customerInfo.fullName}
📞 *Teléfono:* ${order.customerInfo.phone}
🏠 *Dirección de Entrega:* ${order.customerInfo.address}

🛒 *PRODUCTOS:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL A PAGAR: S/ ${order.total.toFixed(2)}*
💳 *Método de Pago:* Yape (${BUSINESS_CONFIG.yape.number})
━━━━━━━━━━━━━━━━━━━━━━━

✨ ¡Hola! Acabo de hacer este pedido desde la tienda web. En breve les envío la captura del comprobante de pago por Yape para que lo preparen. ¡Muchas gracias!`;

    return encodeURIComponent(message);
  };

  const sendOrderToWhatsApp = (order: Order) => {
    const encoded = formatWhatsAppMessage(order);
    const url = `https://wa.me/${BUSINESS_CONFIG.whatsappDigits}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const placeOrder = (): Order => {
    const orderId = `KNB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toLocaleDateString('es-PE', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      discountAmount,
      couponCode: appliedCoupon?.code,
      tip,
      total: cartFinalTotal,
      customerInfo: { ...customerInfo },
      status: 'preparando',
      paymentConfirmed: false,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCompletedOrder(newOrder);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B72B8', '#FF6B6B', '#4ECDC4', '#FFD166'],
      });
    } catch {
      // ignore
    }

    // Automatically open WhatsApp with order details
    sendOrderToWhatsApp(newOrder);

    // Clear cart
    clearCart();
    setIsCartOpen(false);

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        isSplashActive,
        setIsSplashActive,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        darkMode,
        toggleDarkMode,
        products,
        selectedProductForDetail,
        setSelectedProductForDetail,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        discountAmount,
        tip,
        setTip,
        selectedDistrict,
        setSelectedDistrict,
        deliveryFee,
        cartFinalTotal,
        customerInfo,
        setCustomerInfo,
        orders,
        placeOrder,
        sendOrderToWhatsApp,
        completedOrder,
        setCompletedOrder,
        favorites,
        toggleFavorite,
        isFavorite,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isQrModalOpen,
        setIsQrModalOpen,
        copiedText,
        copyToClipboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
