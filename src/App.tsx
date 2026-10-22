import React, { useState, useEffect } from 'react';
import { PRODUCTS, SHOP_THE_LOOK_REELS } from './data/products';
import { Product, CartItem, Order } from './types/store';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductQuickView } from './components/ProductQuickView';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { SearchModal } from './components/SearchModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ColdCollectionView } from './views/ColdCollectionView';
import { CombosView } from './views/CombosView';
import { ShopTheLookView } from './views/ShopTheLookView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { StoresView } from './views/StoresView';
import { Check } from 'lucide-react';

export default function App() {
  // Navigation Page Routing State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [shopCategory, setShopCategory] = useState<string>('all');

  // Cart State with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dn_cart_items');
      return saved ? JSON.parse(saved) : [
        {
          product: PRODUCTS[0], // Baggy Jeans × Cartier Tank combo
          quantity: 1,
          selectedSize: '32'
        }
      ];
    } catch {
      return [];
    }
  });

  // Orders State with localStorage for real-time tracking
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('dn_user_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & UI State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Discount voucher
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0);
  const [checkoutCoupon, setCheckoutCoupon] = useState<string>('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('dn_cart_items', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('dn_user_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleNavigate = (page: string, category?: string) => {
    if (category) {
      setShopCategory(category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.selectedSize === size
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
      }
    });

    showToast(`Added "${product.name}" to your bag`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size?: string) => {
    setCartItems(prev =>
      prev.filter(item => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleProceedToCheckout = (appliedDiscount: number, couponCode: string) => {
    setCheckoutDiscount(appliedDiscount);
    setCheckoutCoupon(couponCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setLastPlacedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-neutral-900 selection:text-white pb-16 md:pb-0">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-neutral-950 text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-neutral-800 animate-in slide-in-from-right duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Dynamic Page Views */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            products={PRODUCTS}
            reels={SHOP_THE_LOOK_REELS}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentPage === 'shop' && (
          <ShopView
            products={PRODUCTS}
            initialCategory={shopCategory}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentPage === 'cold-collection' && (
          <ColdCollectionView
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentPage === 'combos' && (
          <CombosView
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentPage === 'reels' && (
          <ShopTheLookView
            reels={SHOP_THE_LOOK_REELS}
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentPage === 'track-order' && (
          <OrderTrackingView
            orders={orders}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'stores' && (
          <StoresView />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Mobile Bottom Navigation Dock */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Cash on Delivery Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedDiscount={checkoutDiscount}
        couponCode={checkoutCoupon}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Product Quick View Detail Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={lastPlacedOrder}
        onClose={() => setLastPlacedOrder(null)}
        onOpenTracking={() => {
          setLastPlacedOrder(null);
          handleNavigate('track-order');
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onSelectCategory={(cat) => handleNavigate('shop', cat)}
      />

    </div>
  );
}
