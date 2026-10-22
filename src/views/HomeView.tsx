import React from 'react';
import { Product, LookReel } from '../types/store';
import { HERO_IMAGE, COMBO_DENIM_WATCH_IMAGE, PERCEPTION_PERFUME_IMAGE, CHELSEA_BOOTS_IMAGE } from '../data/products';
import { formatPKR, calculateDiscount } from '../utils/format';
import { ArrowRight, ShoppingBag, Eye, Sparkles, Snowflake, Video, ShieldCheck, RefreshCw, Truck, Check } from 'lucide-react';
import { MarqueeTicker } from '../components/MarqueeTicker';

interface HomeViewProps {
  onNavigate: (page: string, category?: string) => void;
  products: Product[];
  reels: LookReel[];
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  products,
  reels,
  onAddToCart,
  onQuickView
}) => {
  const featuredCombos = products.filter(p => p.category === 'combos').slice(0, 4);
  const coldHighlights = products.filter(p => p.isColdCollection || p.subCategory?.includes('Cold')).slice(0, 3);

  const categoryCards = [
    { id: 'combos', label: 'Combo Deals', count: '8 Value Packs', image: COMBO_DENIM_WATCH_IMAGE, tag: 'Save 57%' },
    { id: 'cold-collection', label: 'Cold Collection', count: 'Heavyweight Knits', image: HERO_IMAGE, tag: 'Winter Drop' },
    { id: 'tops', label: 'Tops & Shirts', count: 'Polos, Sweaters, Shirts', image: HERO_IMAGE },
    { id: 'bottoms', label: 'Bottoms', count: 'Korean Pants & Baggy Denim', image: COMBO_DENIM_WATCH_IMAGE },
    { id: 'footwear', label: 'Footwear', count: 'Leather Chelsea Boots', image: CHELSEA_BOOTS_IMAGE },
    { id: 'fragrances', label: 'Fragrances', count: 'Perception EDP', image: PERCEPTION_PERFUME_IMAGE },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* 1. CAMPAIGN HERO */}
      <section className="relative bg-[#f4f4f5] border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-600 bg-white border border-neutral-200 px-3 py-1.5 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Winter 2026 Drop</span>
                <span className="text-neutral-300">·</span>
                <span className="text-neutral-900">The Cold Collection</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight leading-[1.08] text-balance">
                Redefining Pakistani Streetwear & Daily Combos.
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                Engineered drop-shoulder knits, heavyweight 400 GSM fleece sweatshirts, drape Korean trousers, and our viral 2-in-1 timepiece pairings.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => onNavigate('cold-collection')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 text-white text-sm font-semibold rounded-md hover:bg-neutral-800 transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>The Cold Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('combos')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-neutral-900 border border-neutral-300 text-sm font-semibold rounded-md hover:bg-neutral-50 hover:border-neutral-400 transition-all active:scale-95 cursor-pointer"
                >
                  <span>Combo Offers</span>
                  <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                    Up to 57% Off
                  </span>
                </button>
              </div>

              {/* Micro Stats */}
              <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-lg sm:text-2xl font-black text-neutral-950 tabular-nums">100K+</p>
                  <p className="text-xs text-neutral-500 font-medium">Orders Delivered</p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-black text-neutral-950 tabular-nums">4.9 / 5</p>
                  <p className="text-xs text-neutral-500 font-medium">Customer Rating</p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-black text-neutral-950 tabular-nums">100%</p>
                  <p className="text-xs text-neutral-500 font-medium">Cash On Delivery</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                onClick={() => onNavigate('cold-collection')}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-900 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group cursor-pointer"
              >
                <img
                  src={HERO_IMAGE}
                  alt="DN Store The Cold Collection Model"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/hero_cold_collection.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                    Featured Capsule
                  </span>
                  <p className="text-lg sm:text-2xl font-bold tracking-tight">
                    Ribbed Quarter-Zip & Pleated Korean Bottoms
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-neutral-300">
                    <span>Available in Charcoal, Oat & Black</span>
                    <span className="underline hover:text-white font-medium">
                      Explore Drop &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MARQUEE TICKER */}
      <MarqueeTicker />

      {/* 3. QUICK CATEGORY NAVIGATION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Department Store
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Shop By Collection
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs sm:text-sm font-bold text-neutral-900 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categoryCards.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('shop', cat.id)}
              className="group relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-3/4 flex flex-col justify-end p-3.5 cursor-pointer shadow-2xs hover:shadow-md transition-all"
            >
              <img
                src={cat.image}
                alt={cat.label}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/hero_cold_collection.jpg';
                }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

              {cat.tag && (
                <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase bg-amber-400 text-neutral-950 px-2 py-0.5 rounded shadow-xs">
                  {cat.tag}
                </span>
              )}

              <div className="relative z-10 text-white">
                <h3 className="text-xs sm:text-sm font-bold leading-tight group-hover:text-amber-300 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[10px] text-neutral-300 mt-0.5 truncate">
                  {cat.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VIRAL COMBO DEALS SPOTLIGHT */}
      <section className="bg-white border-y border-neutral-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Most Popular Multi-Packs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                Signature Combo Offers
              </h2>
            </div>
            <button
              onClick={() => onNavigate('combos')}
              className="px-4 py-2 bg-neutral-950 text-white rounded-md text-xs font-bold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>View All 8 Combos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCombos.map((combo) => {
              const discount = calculateDiscount(combo.price, combo.originalPrice);
              const savings = (combo.originalPrice || 0) - combo.price;

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
                    />
                    <div className="absolute top-3 left-3 bg-neutral-950 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      Save {discount}%
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(combo);
                      }}
                      className="absolute bottom-3 right-3 p-2 bg-white/95 text-neutral-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-emerald-700 font-semibold mb-1">
                        Save {formatPKR(savings)}
                      </div>
                      <h3
                        onClick={() => onQuickView(combo)}
                        className="text-sm font-bold text-neutral-950 hover:text-neutral-700 transition-colors cursor-pointer line-clamp-1"
                      >
                        {combo.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                        {combo.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
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
                        onClick={() => onAddToCart(combo)}
                        className="px-3.5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SHOP THE LOOK REELS TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111113] text-white rounded-2xl p-6 sm:p-10 border border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Video className="w-4 h-4" />
              <span>Watch · Discover · Shop Instantly</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Shop The Look Video Lookbook
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Experience the fabric weight, flow, and watch stacking in motion through our authentic 9:16 streetwear video reels.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('reels')}
                className="px-5 py-3 bg-white text-neutral-950 font-bold text-xs sm:text-sm rounded-lg hover:bg-neutral-200 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Video Reels ({reels.length} Looks)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reel preview thumbnails */}
          <div className="flex items-center gap-3 overflow-hidden">
            {reels.slice(0, 3).map((r) => (
              <div
                key={r.id}
                onClick={() => onNavigate('reels')}
                className="relative w-24 sm:w-28 aspect-9/16 rounded-xl overflow-hidden border border-neutral-700 cursor-pointer group shrink-0"
              >
                <img
                  src={r.image}
                  alt={r.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                  <span className="text-[9px] font-bold uppercase text-amber-300 truncate">
                    {r.productName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRUST VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-800">
          <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-950">Cash On Delivery (COD)</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Zero advance payment necessary. Order with confidence and inspect your package upon delivery anywhere in Pakistan.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-950">7-Day Easy Exchange</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Wrong fit? We arrange doorstep size swap across all major cities or exchange at our physical retail stores in Lahore & Karachi.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-neutral-200 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-neutral-950">100% Quality Guaranteed</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Pre-shrunk 100% combed cotton, 400 GSM heavy fleece, and genuine leather watches with Japanese Miyota movements.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
