import React, { useState } from 'react';
import { LookReel, Product } from '../types/store';
import { formatPKR } from '../utils/format';
import { Volume2, VolumeX, Maximize2, Play, Pause, ShoppingBag, Eye, X } from 'lucide-react';

interface ShopTheLookProps {
  reels: LookReel[];
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ShopTheLook: React.FC<ShopTheLookProps> = ({
  reels,
  products,
  onQuickView,
  onAddToCart
}) => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({
    'reel-1': true,
    'reel-2': true,
    'reel-3': true,
    'reel-4': true,
    'reel-5': true,
    'reel-6': true,
  });

  const togglePlay = (id: string) => {
    setIsPlaying(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const findProduct = (productId: string) => {
    return products.find(p => p.id === productId) || products[0];
  };

  const handleOpenFullscreen = (index: number) => {
    setActiveReelIndex(index);
  };

  return (
    <section id="shop-the-look" className="py-12 sm:py-16 bg-[#111113] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Watch · Discover · Shop Instantly</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Shop The Look (Video Lookbook)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors border border-white/10"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isMuted ? "Sound Off" : "Sound On"}</span>
            </button>
            <span className="text-xs text-neutral-400 hidden md:inline">
              Tap any video to view styling in motion
            </span>
          </div>
        </div>

        {/* Reels Horizontal Scroll on Mobile, 3-6 Columns on Tablet/Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {reels.map((reel, index) => {
            const product = findProduct(reel.productId);
            const playing = isPlaying[reel.id] ?? true;

            return (
              <div
                key={reel.id}
                className="group relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-9/16 flex flex-col justify-between shadow-lg"
              >
                {/* Visual Media Background */}
                <div className="absolute inset-0">
                  <img
                    src={reel.image}
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/hero_cold_collection.jpg';
                    }}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      playing ? 'group-hover:scale-106' : 'grayscale-30'
                    }`}
                  />
                  {/* Contrast Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40"></div>
                </div>

                {/* Top Overlay Controls */}
                <div className="relative z-10 p-2.5 sm:p-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-neutral-300">
                    {reel.views}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(reel.id);
                      }}
                      className="p-1 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-colors"
                      aria-label={playing ? "Pause Reel" : "Play Reel"}
                    >
                      {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenFullscreen(index);
                      }}
                      className="p-1 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-colors"
                      aria-label="Expand Reel Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay: Product Info & Shop Now */}
                <div className="relative z-10 p-3 sm:p-3.5 flex flex-col justify-end space-y-2">
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider truncate">
                      {reel.tags[0]}
                    </p>
                    <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 leading-snug">
                      {reel.productName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="font-extrabold text-white tabular-nums">
                        {formatPKR(reel.price)}
                      </span>
                      {reel.originalPrice && (
                        <span className="text-[10px] text-neutral-400 line-through tabular-nums">
                          {formatPKR(reel.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      onClick={() => onQuickView(product)}
                      className="w-full py-1.5 px-2 bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold rounded backdrop-blur-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full py-1.5 px-2 bg-white text-neutral-950 hover:bg-neutral-200 text-[11px] font-bold rounded flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Shop</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Reel Modal */}
        {activeReelIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-sm w-full bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl aspect-9/16 flex flex-col justify-between">
              
              <button
                onClick={() => setActiveReelIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/90"
                aria-label="Close Fullscreen Reel"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute inset-0">
                <img
                  src={reels[activeReelIndex].image}
                  alt={reels[activeReelIndex].title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/hero_cold_collection.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40"></div>
              </div>

              <div className="relative z-10 p-4 pt-5">
                <span className="text-xs bg-red-600 font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider">
                  Live Lookbook Reel
                </span>
                <p className="text-xs text-neutral-300 mt-2">{reels[activeReelIndex].views} styling views</p>
              </div>

              <div className="relative z-10 p-5 space-y-4 bg-neutral-950/80 backdrop-blur-md border-t border-neutral-800">
                <div>
                  <h4 className="text-base font-bold text-white">
                    {reels[activeReelIndex].productName}
                  </h4>
                  <p className="text-lg font-black text-amber-400 tabular-nums">
                    {formatPKR(reels[activeReelIndex].price)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const prod = findProduct(reels[activeReelIndex].productId);
                      setActiveReelIndex(null);
                      onQuickView(prod);
                    }}
                    className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Product Details</span>
                  </button>
                  <button
                    onClick={() => {
                      const prod = findProduct(reels[activeReelIndex].productId);
                      onAddToCart(prod);
                      setActiveReelIndex(null);
                    }}
                    className="flex-1 py-2.5 bg-white text-neutral-950 hover:bg-neutral-100 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Quick Buy</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
