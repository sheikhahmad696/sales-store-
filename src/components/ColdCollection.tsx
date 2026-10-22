import React from 'react';
import { Product } from '../types/store';
import { formatPKR, calculateDiscount } from '../utils/format';
import { ShoppingBag, Eye, Snowflake, ArrowUpRight } from 'lucide-react';

interface ColdCollectionProps {
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ColdCollection: React.FC<ColdCollectionProps> = ({
  products,
  onAddToCart,
  onQuickView
}) => {
  const coldItems = products.filter(p => p.isColdCollection || p.category === 'tops' && p.subCategory?.includes('Cold'));

  return (
    <section id="cold-collection" className="py-12 sm:py-16 bg-[#f9fafb] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
              <Snowflake className="w-4 h-4 text-sky-600" />
              <span>Heavyweight Knitwear & Fleece</span>
              <span>·</span>
              <span>Winter 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              The Cold Collection
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-lg">
            Built for winter drape and comfort: Heavyweight quarter-zip sweaters, 400 GSM brushed fleece sweatshirts, and structured Korean pleated trousers.
          </p>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coldItems.map((item) => {
            const discount = calculateDiscount(item.price, item.originalPrice);

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-2xs overflow-hidden"
              >
                <div
                  className="relative aspect-4/3 sm:aspect-1/1 bg-neutral-100 overflow-hidden cursor-pointer"
                  onClick={() => onQuickView(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />
                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-neutral-900 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      -{discount}%
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(item);
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-white/95 text-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs flex items-center gap-1 font-medium"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mb-1">
                      {item.subCategory}
                    </div>
                    <h3
                      onClick={() => onQuickView(item)}
                      className="text-sm sm:text-base font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-neutral-950 tabular-nums">
                        {formatPKR(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="block text-xs text-neutral-400 line-through tabular-nums">
                          {formatPKR(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3.5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
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
