import React, { useState } from 'react';
import { ShoppingBag, Search, MapPin, Truck, Menu, X, Sparkles } from 'lucide-react';
import { formatPKR } from '../utils/format';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, category?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const [promoDismissed, setPromoDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All' },
    { id: 'cold-collection', label: 'Cold Collection' },
    { id: 'combos', label: 'Combo Deals', hasBadge: true },
    { id: 'reels', label: 'Shop The Look' },
    { id: 'track-order', label: 'Track Order' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Top Thin Utility Bar */}
      {!promoDismissed && (
        <div className="bg-neutral-950 text-white text-[11px] sm:text-xs py-2 px-4 font-medium tracking-wide flex items-center justify-between border-b border-neutral-800">
          <div className="mx-auto flex items-center gap-3">
            <span className="hidden sm:inline">🇵🇰</span>
            <span>COD Available Nationwide</span>
            <span className="opacity-40">·</span>
            <span>Easy 7-Day Exchange</span>
            <span className="opacity-40">·</span>
            <span className="text-amber-300 font-semibold">Free Delivery on Rs. 5,000+</span>
          </div>
          <button
            onClick={() => setPromoDismissed(true)}
            aria-label="Dismiss banner"
            className="text-neutral-400 hover:text-white transition-colors text-xs cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar: 3 Zones Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-6 sm:gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 -ml-2 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="text-xl sm:text-2xl font-black tracking-[0.22em] text-neutral-950 uppercase select-none hover:opacity-80 transition-opacity"
          >
            DN STORE
          </a>
        </div>

        {/* Zone 2: Clean Multi-Page Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium tracking-tight text-neutral-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 py-1.5 border-b-2 cursor-pointer relative ${
                currentPage === link.id
                  ? 'border-neutral-950 text-neutral-950 font-bold'
                  : 'border-transparent text-neutral-600'
              }`}
            >
              <span>{link.label}</span>
              {link.hasBadge && (
                <span className="ml-1.5 text-[10px] bg-amber-400 text-neutral-950 font-extrabold px-1.5 py-0.2 rounded-full">
                  Sale
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => handleLinkClick('stores')}
            className={`hover:text-neutral-950 transition-colors whitespace-nowrap shrink-0 text-xs flex items-center gap-1 cursor-pointer ${
              currentPage === 'stores' ? 'text-neutral-950 font-bold' : 'text-neutral-500'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Stores</span>
          </button>
        </nav>

        {/* Zone 3: Search, Track & Bag Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="Search Catalog"
            className="p-2 sm:px-3 sm:py-2 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline text-neutral-400">Search products...</span>
          </button>

          <button
            onClick={() => handleLinkClick('track-order')}
            aria-label="Track Order"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
          >
            <Truck className="w-4 h-4 text-neutral-600" />
            <span>Track</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label={`Shopping Bag (${cartCount} items)`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 rounded-md transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="bg-white/20 text-white text-[11px] px-1.5 py-0.5 rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-neutral-950 text-white font-bold'
                    : 'bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleLinkClick('track-order')}
              className="flex items-center gap-1.5 p-2.5 rounded-lg bg-neutral-50 text-neutral-800 font-semibold"
            >
              <Truck className="w-4 h-4 text-neutral-600" />
              <span>Track Parcel</span>
            </button>
            <button
              onClick={() => handleLinkClick('stores')}
              className="flex items-center gap-1.5 p-2.5 rounded-lg bg-neutral-50 text-neutral-800 font-semibold"
            >
              <MapPin className="w-4 h-4 text-neutral-600" />
              <span>Physical Stores</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
