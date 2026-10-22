import React from 'react';
import { LookReel, Product } from '../types/store';
import { ShopTheLook } from '../components/ShopTheLook';

interface ShopTheLookViewProps {
  reels: LookReel[];
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopTheLookView: React.FC<ShopTheLookViewProps> = ({
  reels,
  products,
  onAddToCart,
  onQuickView
}) => {
  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Streetwear in Motion
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1">
          Shop The Look (Video Reels)
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1">
          Watch styling reels in full 9:16 vertical video format. Tap any piece to inspect fabric specifications or instantly add it to your bag.
        </p>
      </div>

      <ShopTheLook
        reels={reels}
        products={products}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};
