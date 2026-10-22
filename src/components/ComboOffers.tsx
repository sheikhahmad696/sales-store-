import React, { useState } from 'react';
import { Product } from '../types/store';
import { formatPKR, calculateDiscount } from '../utils/format';
import { ShoppingBag, Eye, Check, Tag } from 'lucide-react';

interface ComboOffersProps {
  combos: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ComboOffers: React.FC<ComboOffersProps> = ({
  combos,
  onAddToCart,
  onQuickView
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: Product) => {
    const defaultSize = product.sizes ? (selectedSizes[product.id] || product.sizes[0]) : undefined;
    onAddToCart(product, defaultSize);

    // Trigger visual feedback
    setAddedAnimation(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="combos" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              <Tag className="w-3.5 h-3.5 text-neutral-900" />
              <span>Curated Value Sets</span>
              <span>·</span>
              <span>Exclusive To DN Store</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Combo Offers & Multi-Packs
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md">
            Complete outfit solutions engineered to match. Get pants, tees, and luxury homage timepieces together for massive savings.
          </p>
        </div>

        {/* Combos Grid - Responsive 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {combos.map((combo) => {
            const discount = calculateDiscount(combo.price, combo.originalPrice);
            const savings = (combo.originalPrice || 0) - combo.price;
            const currentSize = selectedSizes[combo.id] || (combo.sizes && combo.sizes[0]);
            const isAdded = addedAnimation[combo.id];

            return (
              <div
                key={combo.id}
                className="group flex flex-col bg-white rounded-xl border border-neutral-200/90 hover:border-neutral-400/90 transition-all duration-300 shadow-2xs hover:shadow-md overflow-hidden"
              >
                {/* Visual Image Box with fallback */}
                <div className="relative aspect-4/3 sm:aspect-1/1 bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(combo)}>
                  <img
                    src={combo.image}
                    alt={combo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Clean unboxed discount tag */}
                  <div className="absolute top-3 left-3 bg-neutral-950 text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-tight">
                    Save {discount}%
                  </div>

                  {combo.isSoldOut && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white px-3 py-1 rounded">
                        Sold Out
                      </span>
                    </div>
                  )}

                  {/* Quick View Button on Desktop */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(combo);
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs flex items-center gap-1 font-medium"
                    aria-label={`Quick View ${combo.name}`}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Quick Look</span>
                  </button>
                </div>

                {/* Card Content Area */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Quiet category metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium mb-1">
                      <span>{combo.subCategory || 'Combo Deal'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-semibold">Save {formatPKR(savings)}</span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(combo)}
                      className="text-base font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {combo.name}
                    </h3>

                    {/* Included Items Pill-free List */}
                    {combo.comboItems && (
                      <div className="mt-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600 space-y-1">
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
                    {/* Size Selector if applicable */}
                    {combo.sizes && combo.sizes.length > 1 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5 font-medium">
                          <span>Size:</span>
                          <span className="font-semibold text-neutral-900">{currentSize}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {combo.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSizeSelect(combo.id, s)}
                              className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
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

                    {/* Price and Add CTA */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-neutral-950 tabular-nums">
                          {formatPKR(combo.price)}
                        </span>
                        {combo.originalPrice && (
                          <span className="text-xs text-neutral-400 line-through tabular-nums">
                            {formatPKR(combo.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(combo)}
                        disabled={combo.isSoldOut}
                        className={`px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : combo.isSoldOut
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-white active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : combo.isSoldOut ? (
                          <span>Sold Out</span>
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
    </section>
  );
};
