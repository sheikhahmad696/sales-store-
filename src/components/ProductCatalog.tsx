import React, { useState, useMemo } from 'react';
import { Product } from '../types/store';
import { formatPKR, calculateDiscount } from '../utils/format';
import { ShoppingBag, Eye, SlidersHorizontal, Check } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onQuickView,
  selectedCategory,
  onSelectCategory
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'View All' },
    { id: 'tops', label: 'Tops (all)' },
    { id: 'bottoms', label: 'Bottoms (all)' },
    { id: 'tracksuits', label: 'Tracksuits/Co-Ord Sets' },
    { id: 'footwear', label: 'Shoes / Footwear' },
    { id: 'fragrances', label: 'Fragrances' },
    { id: 'watches', label: 'Watches' },
    { id: 'combos', label: 'Combo Deals' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      if (selectedCategory === 'cold-collection') {
        list = list.filter(p => p.isColdCollection);
      } else {
        list = list.filter(p => p.category === selectedCategory);
      }
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  const handleAdd = (product: Product) => {
    const defaultSize = product.sizes ? (selectedSizes[product.id] || product.sizes[0]) : undefined;
    onAddToCart(product, defaultSize);

    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <section id="catalog" className="py-12 sm:py-16 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
            Official Storefront
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
            DN STORE COLLECTIONS
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Explore everyday streetwear staples, structured tailoring, and signature scent profiles.
          </p>
        </div>

        {/* Filter Navigation Bar (Interactive Filter Buttons compliant with Design Constitution) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
          
          {/* Category Tabs: Scrollable on mobile, flex on desktop */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-950 text-white shadow-2xs'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs self-end md:self-auto shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-neutral-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-md py-1.5 px-2.5 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-neutral-950 cursor-pointer"
            >
              <option value="featured">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Product Count Indicator */}
        <div className="py-4 text-xs text-neutral-500 font-medium">
          Showing <span className="text-neutral-900 font-bold">{filteredProducts.length}</span> pieces
        </div>

        {/* Responsive Grid: 1 col on small phones, 2 col on tablet/standard mobile, 3-4 col on laptop/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            const currentSize = selectedSizes[product.id] || (product.sizes && product.sizes[0]);
            const isAdded = addedIds[product.id];

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-2xs overflow-hidden"
              >
                {/* Image Slot */}
                <div
                  className="relative aspect-4/3 sm:aspect-1/1 bg-neutral-100 overflow-hidden cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    loading="lazy"
                  />

                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-neutral-950 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      -{discount}%
                    </div>
                  )}

                  {product.isSoldOut && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white px-3 py-1 rounded">
                        Sold Out
                      </span>
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="absolute bottom-3 right-3 p-2 bg-white/95 text-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs flex items-center gap-1 font-medium"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Look</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium mb-1">
                      <span className="uppercase tracking-wider">{product.subCategory || product.category}</span>
                      <span>★ {product.rating} ({product.reviewsCount})</span>
                    </div>

                    <h3
                      onClick={() => onQuickView(product)}
                      className="text-sm sm:text-base font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    {/* Size Selector if available */}
                    {product.sizes && product.sizes.length > 1 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
                          <span>Size:</span>
                          <span className="font-semibold text-neutral-900">{currentSize}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: s }))}
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

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base sm:text-lg font-black text-neutral-950 tabular-nums">
                          {formatPKR(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="block text-xs text-neutral-400 line-through tabular-nums">
                            {formatPKR(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        disabled={product.isSoldOut}
                        className={`px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : product.isSoldOut
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                            : 'bg-neutral-950 hover:bg-neutral-800 text-white active:scale-95 shadow-2xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : product.isSoldOut ? (
                          <span>Sold Out</span>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
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
