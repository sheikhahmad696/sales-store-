import React from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreCold: () => void;
  onExploreCombos: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCold, onExploreCombos }) => {
  return (
    <section className="relative bg-[#f4f4f5] border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Campaign Messaging */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
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
              Engineered drop-shoulder knits, heavyweight 400 GSM fleece sweatshirts, drape Korean trousers, and our viral 2-in-1 timepiece pairings. Crafted for effortless everyday presence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onExploreCold}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 text-white text-sm font-semibold rounded-md hover:bg-neutral-800 transition-all shadow-sm active:scale-95"
              >
                <span>The Cold Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCombos}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-neutral-900 border border-neutral-300 text-sm font-semibold rounded-md hover:bg-neutral-50 hover:border-neutral-400 transition-all active:scale-95"
              >
                <span>Explore Combo Offers</span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                  Up to 57% Off
                </span>
              </button>
            </div>

            {/* Micro Stats */}
            <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-lg sm:text-2xl font-black text-neutral-950 tabular-nums">100K+</p>
                <p className="text-xs text-neutral-500 font-medium">Parcels Delivered</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-neutral-950 tabular-nums">4.9 / 5</p>
                <p className="text-xs text-neutral-500 font-medium">Customer Reviews</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black text-neutral-950 tabular-nums">100%</p>
                <p className="text-xs text-neutral-500 font-medium">Cash on Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-900 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 group">
              <img
                src={HERO_IMAGE}
                alt="DN Store The Cold Collection Model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  Featured Capsule
                </span>
                <p className="text-lg sm:text-2xl font-bold tracking-tight">
                  Ribbed Quarter-Zip & Pleated Korean Bottoms
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-neutral-300">
                  <span>Available in Charcoal, Oat & Black</span>
                  <button
                    onClick={onExploreCold}
                    className="underline hover:text-white font-medium cursor-pointer"
                  >
                    View Capsule &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Trust Grid below the Hero */}
        <div className="mt-10 pt-8 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-neutral-700">
          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-neutral-200/70">
            <div className="p-2 rounded bg-neutral-100 text-neutral-900 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-neutral-900">Cash on Delivery</p>
              <p className="text-neutral-500 text-[11px]">Pay upon receiving parcel</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-neutral-200/70">
            <div className="p-2 rounded bg-neutral-100 text-neutral-900 shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-neutral-900">7 Days Easy Exchange</p>
              <p className="text-neutral-500 text-[11px]">Hassle-free size swaps</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-neutral-200/70">
            <div className="p-2 rounded bg-neutral-100 text-neutral-900 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-neutral-900">100% Quality Guaranteed</p>
              <p className="text-neutral-500 text-[11px]">Premium combed fabrics</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/70 rounded-lg border border-neutral-200/70">
            <div className="p-2 rounded bg-neutral-100 text-neutral-900 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-neutral-900">Viral 2-in-1 Combos</p>
              <p className="text-neutral-500 text-[11px]">Curated styling sets</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
