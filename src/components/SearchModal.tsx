import React, { useState, useMemo } from 'react';
import { Product } from '../types/store';
import { formatPKR } from '../utils/format';
import { X, Search, ArrowRight, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onQuickView: (product: Product) => void;
  onSelectCategory: (cat: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onQuickView,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickTerms = ['Baggy Jeans', 'Cartier Tank', 'Quarter Zip', 'Korean Pants', 'Chelsea Boots', 'Perception', 'Combo'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q) ||
        p.comboItems?.some(item => item.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 pt-16 sm:pt-24">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search sweatshirts, quarter-zips, combos, watches..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-md"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
            Popular:
          </span>
          {quickTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 text-xs bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400 rounded-md whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="p-5 max-h-96 overflow-y-auto space-y-3">
          {query && results.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 text-xs">
              No results found for "{query}". Try checking spelling or browse collections.
            </div>
          ) : results.length > 0 ? (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onQuickView(product);
                }}
                className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors border border-transparent hover:border-neutral-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/hero_cold_collection.jpg';
                  }}
                  className="w-14 h-14 object-cover rounded-lg bg-neutral-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-neutral-400">
                    {product.subCategory || product.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-950 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-black text-neutral-900 tabular-nums">
                      {formatPKR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-neutral-400 line-through tabular-nums">
                        {formatPKR(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-neutral-400">
              Type keywords above to instantly browse all menswear, combos, and footwear.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
