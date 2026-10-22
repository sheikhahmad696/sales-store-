import React, { useState } from 'react';
import { Mail, Check, ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, category?: string) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSearch,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Be The First To Know
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Get updates on new drops, secret combo restocks & VIP discounts.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
              Get an update of all our latest collections, discounts & features coming up directly to your inbox.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 p-3 bg-neutral-900 border border-neutral-700 rounded-lg text-emerald-400 text-xs font-semibold">
                <Check className="w-4 h-4" />
                <span>You're on the VIP list! Welcome to APKA APNA DN STORE.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs sm:text-sm px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder:text-neutral-500 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white hover:bg-neutral-200 text-neutral-950 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <h4
              onClick={() => onNavigate('home')}
              className="text-xl font-black tracking-[0.2em] text-white uppercase cursor-pointer hover:opacity-80"
            >
              DN STORE
            </h4>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Pakistan's contemporary streetwear destination. Engineered drape, premium heavyweight combed textiles, and signature timepiece pairings.
            </p>
            <div className="pt-2 text-xs text-neutral-400 space-y-1">
              <p><span className="font-semibold text-neutral-200">Customer Helpline:</span> +92 (042) 35789123</p>
              <p><span className="font-semibold text-neutral-200">WhatsApp:</span> +92 300 1234567</p>
              <p><span className="font-semibold text-neutral-200">Email:</span> support@dnstore.pk</p>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Menu
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={onOpenSearch} className="hover:text-white transition-colors cursor-pointer">
                  Search Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('combos')} className="hover:text-white transition-colors cursor-pointer">
                  Combo Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cold-collection')} className="hover:text-white transition-colors cursor-pointer">
                  Cold Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reels')} className="hover:text-white transition-colors cursor-pointer">
                  Shop The Look Reels
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Support
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('track-order')} className="hover:text-white transition-colors text-amber-300 font-bold cursor-pointer">
                  Order Tracking
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Helpline (24/7)
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('track-order')} className="hover:text-white transition-colors cursor-pointer">
                  Doorstep Size Exchange
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('stores')} className="hover:text-white transition-colors cursor-pointer">
                  Physical Store Returns
                </button>
              </li>
            </ul>
          </div>

          {/* Physical Stores & Company */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              Physical Stores
            </h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigate('stores')} className="hover:text-white transition-colors text-left text-amber-300 font-bold cursor-pointer">
                  See Locations (Lahore & Karachi) &rarr;
                </button>
              </li>
              <li>
                <span className="block text-neutral-300 font-medium">MM Alam Rd, Lahore</span>
                <span className="text-[11px] text-neutral-500">12:00 PM - 11:00 PM</span>
              </li>
              <li>
                <span className="block text-neutral-300 font-medium">Dolmen Mall, Karachi</span>
                <span className="text-[11px] text-neutral-500">11:30 AM - 11:30 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Value Proposition Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-4 text-neutral-300 font-semibold">
            <span>COD Available</span>
            <span>·</span>
            <span>Easy Exchange</span>
            <span>·</span>
            <span>Nationwide Delivery</span>
          </div>
          <div>
            © 2026 DN Store. All Rights Reserved. · Terms and Policies
          </div>
        </div>
      </div>

    </footer>
  );
};
