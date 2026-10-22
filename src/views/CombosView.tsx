import React, { useState } from 'react';
import { Product } from '../types/store';
import { formatPKR, calculateDiscount } from '../utils/format';
import { ShoppingBag, Eye, Tag, Sparkles, Check, Gift } from 'lucide-react';

interface CombosViewProps {
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const CombosView: React.FC<CombosViewProps> = ({
  products,
  onAddToCart,
  onQuickView
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const combos = products.filter(p => p.category === 'combos');

  const handleAdd = (combo: Product) => {
    const size = selectedSizes[combo.id] || (combo.sizes ? combo.sizes[0] : undefined);
    onAddToCart(combo, size);
    setAddedIds(prev => ({ ...prev, [combo.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [combo.id]: false }));
    }, 1200);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Banner */}
      <div className="bg-amber-500 text-neutral-950 rounded-2xl p-6 sm:p-10 border border-amber-600 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950 text-white text-[11px] font-extrabold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            <span>Official DN Store Combo Packs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Curated 2-in-1 & 3-in-1 Combo Offers
          </h1>
          <p className="text-xs sm:text-sm text-neutral-900 font-medium leading-relaxed">
            Pair oversized baggy denim with classic Tank watches, or Korean drape pants with boxy tees. Instant matching style with up to 57% savings.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white/90 backdrop-blur-xs border border-amber-400 text-neutral-950 text-center min-w-[200px] shadow-sm">
          <span className="text-xs font-bold uppercase text-neutral-500 block">Average Savings</span>
          <span className="text-3xl sm:text-4xl font-black block tabular-nums text-neutral-950">
            50% OFF
          </span>
          <span className="text-[11px] font-semibold text-emerald-800">
            Complimentary Packaging Included
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {combos.map((combo) => {
          const discount = calculateDiscount(combo.price, combo.originalPrice);
          const savings = (combo.originalPrice || 0) - combo.price;
          const currentSize = selectedSizes[combo.id] || (combo.sizes && combo.sizes[0]);
          const isAdded = addedIds[combo.id];

          return (
            <div
              key={combo.id}
              className="group flex flex-col bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-2xs overflow-hidden"
            >
              <div
                className="relative aspect-1/1 bg-neutral-100 overflow-hidden cursor-pointer"
                onClick={() => onQuickView(combo)}
              >
                <img
                  src={combo.image}
                  alt={combo.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/combo_denim_watch.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute top-3 left-3 bg-neutral-950 text-white text-[11px] font-bold px-2.5 py-1 rounded">
                  Save {discount}%
                </div>

                {combo.isSoldOut && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white px-3 py-1 rounded">
                      Sold Out
                    </span>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(combo);
                  }}
                  className="absolute bottom-3 right-3 p-2 bg-white/95 text-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 font-medium"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick Look</span>
                </button>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium mb-1">
                    <span>{combo.subCategory || 'Combo Deal'}</span>
                    <span className="text-emerald-700 font-bold">Save {formatPKR(savings)}</span>
                  </div>

                  <h3
                    onClick={() => onQuickView(combo)}
                    className="text-sm font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                  >
                    {combo.name}
                  </h3>

                  {combo.comboItems && (
                    <div className="mt-2.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600 space-y-1">
                      {combo.comboItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] truncate">
                          <span className="text-neutral-400 font-bold">+</span>
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100">
                  {/* Size Selector */}
                  {combo.sizes && combo.sizes.length > 1 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
                        <span>Select Size:</span>
                        <span className="font-semibold text-neutral-900">{currentSize}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {combo.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSizes(prev => ({ ...prev, [combo.id]: s }))}
                            className={`text-[11px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                              currentSize === s
                                ? 'bg-neutral-950 text-white border-neutral-950 font-semibold'
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
                        {formatPKR(combo.price)}
                      </span>
                      {combo.originalPrice && (
                        <span className="block text-xs text-neutral-400 line-through tabular-nums">
                          {formatPKR(combo.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAdd(combo)}
                      disabled={combo.isSoldOut}
                      className={`px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : combo.isSoldOut
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
                          <span>Add Deal</span>
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
  );
};
