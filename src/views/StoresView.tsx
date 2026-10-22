import React, { useState } from 'react';
import { STORE_LOCATIONS } from '../data/products';
import { MapPin, Navigation, Clock, Phone, MessageSquare, ShieldCheck, Check } from 'lucide-react';
import { DirectionsModal, StoreLocation } from '../components/DirectionsModal';

export const StoresView: React.FC = () => {
  const [selectedDirection, setSelectedDirection] = useState<StoreLocation | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-left border-b border-neutral-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Flagship Experience Hubs
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1">
          Physical Stores & Locations
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
          Visit our flagship concept stores to try sizes in person, feel fabric weights, or get instant doorstep exchanges.
        </p>
      </div>

      {/* Stores Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STORE_LOCATIONS.map((store, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between bg-white rounded-2xl border border-neutral-200 hover:border-neutral-400 p-6 shadow-sm transition-all space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white px-2.5 py-1 rounded">
                  {store.city} Flagship
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Open Today
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-neutral-950">
                  {store.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                  {store.address}
                </p>
              </div>

              <div className="space-y-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{store.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>{store.phone}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2">
              <button
                onClick={() => setSelectedDirection(store)}
                className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Get Directions & Route</span>
              </button>

              <a
                href={`https://wa.me/${store.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hi ${store.name}, I'm inquiring about store stock and availability.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Store Manager</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Store Features Policy */}
      <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
        <div className="flex items-center gap-2 text-neutral-950 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>In-Store Pickups & Free Exchanges:</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Online orders can be swapped for a different size or article directly at our physical stores in Lahore, Karachi, or Islamabad within 7 days. Simply present your electronic receipt or Order ID at the counter.
        </p>
      </div>

      {/* Guaranteed Close Directions Modal */}
      <DirectionsModal
        location={selectedDirection}
        onClose={() => setSelectedDirection(null)}
      />

    </div>
  );
};
