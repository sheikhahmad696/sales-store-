import React from 'react';
import { Home, Grid, Sparkles, Video, Truck, ShoppingBag } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => {
          onNavigate('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
          currentPage === 'home' ? 'text-neutral-950 font-bold' : 'text-neutral-500'
        }`}
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>

      <button
        onClick={() => {
          onNavigate('shop');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
          currentPage === 'shop' ? 'text-neutral-950 font-bold' : 'text-neutral-500'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span>Catalog</span>
      </button>

      <button
        onClick={() => {
          onNavigate('combos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
          currentPage === 'combos' ? 'text-amber-600 font-extrabold' : 'text-neutral-500'
        }`}
      >
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span>Combos</span>
      </button>

      <button
        onClick={() => {
          onNavigate('reels');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
          currentPage === 'reels' ? 'text-neutral-950 font-bold' : 'text-neutral-500'
        }`}
      >
        <Video className="w-4 h-4" />
        <span>Reels</span>
      </button>

      <button
        onClick={() => {
          onNavigate('track-order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium cursor-pointer ${
          currentPage === 'track-order' ? 'text-neutral-950 font-bold' : 'text-neutral-500'
        }`}
      >
        <Truck className="w-4 h-4" />
        <span>Track</span>
      </button>

      <button
        onClick={onOpenCart}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-neutral-900 relative cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-neutral-950 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>
    </div>
  );
};
