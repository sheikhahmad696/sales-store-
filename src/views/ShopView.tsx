import React, { useState, useMemo } from 'react';
import { Product } from '../types/store';
import { formatPKR, calculateDiscount } from '../utils/format';
import { ShoppingBag, Eye, Search, SlidersHorizontal, Check, X } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  initialCategory?: string;
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory = 'all',
  onAddToCart,
  onQuickView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under3k' | '3k-6k' | 'over6k'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'tops', label: 'Tops & Knits' },
    { id: 'bottoms', label: 'Bottoms & Denim' },
    { id: 'combos', label: 'Combo Deals' },
    { id: 'tracksuits', label: 'Tracksuits & Sets' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'fragrances', label: 'Fragrances' },
    { id: 'watches', label: 'Watches' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'cold-collection') {
        list = list.filter(p => p.isColdCollection || p.subCategory?.includes('Cold'));
      } else {
        list = list.filter(p => p.category === selectedCategory);
      }
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q) ||
          p.comboItems?.some(item => item.toLowerCase().includes(q))
      );
    }

    // Price filter
    if (priceFilter === 'under3k') {
      list = list.filter(p => p.price < 3000);
    } else if (priceFilter === '3k-6k') {
      list = list.filter(p => p.price >= 3000 && p.price <= 6000);
    } else if (priceFilter === 'over6k') {
      list = list.filter(p => p.price > 6000);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, searchTerm, priceFilter, sortBy]);

  const handleAdd = (product: Product) => {
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    onAddToCart(product, defaultSize);

    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header Banner */}
      <div className="border-b border-neutral-200 pb-6 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Official Store Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1">
          Shop All Collections
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
          Browse contemporary Pakistani streetwear, signature 2-in-1 combo packs, heavy winter knits, and genuine leather footwear.
        </p>
      </div>

      {/* Control Bar: Categories & Search */}
      <div className="space-y-4 mb-8">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search in catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-8 py-2 rounded-lg border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto text-xs">
            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as any)}
              className="bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-lg py-2 px-3 text-xs font-medium cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="under3k">Under Rs. 3,000</option>
              <option value="3k-6k">Rs. 3,000 - Rs. 6,000</option>
              <option value="over6k">Rs. 6,000+</option>
            </select>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-lg py-2 px-3 text-xs font-medium cursor-pointer"
            >
              <option value="featured">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-6">
        <span>Showing <strong className="text-neutral-950 font-bold">{filteredProducts.length}</strong> items</span>
        {(searchTerm || priceFilter !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setPriceFilter('all');
            }}
            className="text-neutral-950 font-bold underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-neutral-50 rounded-2xl border border-neutral-200">
          <p className="text-base font-bold text-neutral-900">No matching pieces found</p>
          <p className="text-xs text-neutral-500">Try adjusting your category or search keywords.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setPriceFilter('all');
            }}
            className="px-4 py-2 bg-neutral-950 text-white rounded-md text-xs font-bold"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const discount = calculateDiscount(product.price, product.originalPrice);
            const isAdded = addedIds[product.id];

            return (
              <div
                key={product.id}
                className="group flex flex-col bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 transition-all duration-300 shadow-2xs overflow-hidden"
              >
                <div
                  className="relative aspect-1/1 bg-neutral-100 overflow-hidden cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
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

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium mb-1">
                      <span className="uppercase tracking-wider">{product.subCategory || product.category}</span>
                      <span>★ {product.rating}</span>
                    </div>

                    <h3
                      onClick={() => onQuickView(product)}
                      className="text-sm font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-neutral-950 tabular-nums">
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
                      className={`px-3.5 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : product.isSoldOut
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
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
