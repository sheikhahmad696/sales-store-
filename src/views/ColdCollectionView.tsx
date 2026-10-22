import React, { useState } from 'react';
import { Product } from '../types/store';
import { HERO_IMAGE } from '../data/products';
import { formatPKR, calculateDiscount } from '../utils/format';
import { Snowflake, ShoppingBag, Eye, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface ColdCollectionViewProps {
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ColdCollectionView: React.FC<ColdCollectionViewProps> = ({
  products,
  onAddToCart,
  onQuickView
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const coldProducts = products.filter(
    p => p.isColdCollection || p.subCategory?.includes('Cold') || p.category === 'tracksuits'
  );

  const handleAdd = (product: Product) => {
    const size = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : undefined);
    onAddToCart(product, size);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Campaign Editorial Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[460px]">
          <div className="lg:col-span-6 p-6 sm:p-12 flex flex-col justify-center space-y-5 text-left z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sky-300 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full w-fit">
              <Snowflake className="w-4 h-4 text-sky-400" />
              <span>Official Winter Drop</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              The Cold Collection
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md">
              Engineered for structure, warmth, and heavy draping. Ribbed quarter-zips, 400 GSM brushed fleece sweatshirts, and flowing Korean pleated trousers tailored for the Pakistani urban winter.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="block font-black text-lg text-white">400 GSM</span>
                <span className="text-neutral-400 text-[11px]">Brushed Fleece</span>
              </div>
              <div>
                <span className="block font-black text-lg text-white">Italian</span>
                <span className="text-neutral-400 text-[11px]">Ribbed Gauge</span>
              </div>
              <div>
                <span className="block font-black text-lg text-white">Korean</span>
                <span className="text-neutral-400 text-[11px]">Drape Fabrics</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Cold Collection Streetwear"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/hero_cold_collection.jpg';
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-900 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Fabric Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-neutral-200">
          <p className="text-xs font-bold text-neutral-900 mb-1">Pre-Shrunk 100% Combed Cotton</p>
          <p className="text-[11px] text-neutral-500">Zero shape deformation after washing. Maintains boxy drop-shoulder silhouette.</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-neutral-200">
          <p className="text-xs font-bold text-neutral-900 mb-1">Heavy Gauge Metal Pullers</p>
          <p className="text-[11px] text-neutral-500">Custom matte-finished hardware engineered for smooth, lifetime zip operation.</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-neutral-200">
          <p className="text-xs font-bold text-neutral-900 mb-1">Wrinkle-Free Korean Fabric</p>
          <p className="text-[11px] text-neutral-500">Flowy fluid drape that lands effortlessly over sneakers or chelsea boots.</p>
        </div>
      </div>

      {/* Cold Collection Products Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-neutral-950 tracking-tight">
            Cold Collection Pieces ({coldProducts.length})
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Available in limited batch quantities with Cash on Delivery nationwide.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coldProducts.map((item) => {
            const discount = calculateDiscount(item.price, item.originalPrice);
            const isAdded = addedIds[item.id];
            const currentSize = selectedSizes[item.id] || (item.sizes ? item.sizes[0] : '');

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-2xs overflow-hidden"
              >
                <div
                  className="relative aspect-1/1 bg-neutral-100 overflow-hidden cursor-pointer"
                  onClick={() => onQuickView(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/hero_cold_collection.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-neutral-950 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      -{discount}%
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(item);
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-white/95 text-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 font-medium"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Look</span>
                  </button>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      {item.subCategory}
                    </span>
                    <h3
                      onClick={() => onQuickView(item)}
                      className="text-sm font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    {/* Size Selector */}
                    {item.sizes && item.sizes.length > 1 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
                          <span>Size:</span>
                          <span className="font-semibold text-neutral-900">{currentSize}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedSizes(prev => ({ ...prev, [item.id]: s }))}
                              className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                                currentSize === s
                                  ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-black text-neutral-950 tabular-nums">
                          {formatPKR(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="block text-xs text-neutral-400 line-through tabular-nums">
                            {formatPKR(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(item)}
                        disabled={item.isSoldOut}
                        className={`px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : item.isSoldOut
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                            : 'bg-neutral-950 hover:bg-neutral-800 text-white active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
