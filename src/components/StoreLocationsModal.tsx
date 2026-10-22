import React, { useState, useEffect } from 'react';
import { STORE_LOCATIONS } from '../data/products';
import { X, MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { DirectionsModal, StoreLocation } from './DirectionsModal';

interface StoreLocationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocationsModal: React.FC<StoreLocationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeDirections, setActiveDirections] = useState<StoreLocation | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-neutral-950 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-base sm:text-lg font-bold">DN Store Physical Locations</h3>
                <p className="text-xs text-neutral-400">Experience hubs in Lahore, Karachi & Islamabad</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
              aria-label="Close Store Locations"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {STORE_LOCATIONS.map((loc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-all bg-neutral-50/60 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded">
                      {loc.city}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-neutral-950 mt-1">
                      {loc.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveDirections(loc)}
                    className="px-3 py-1.5 rounded-md bg-white border border-neutral-300 hover:bg-neutral-100 text-xs font-semibold text-neutral-900 flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-neutral-700" />
                    <span>View Directions</span>
                  </button>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {loc.address}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1 border-t border-neutral-200/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{loc.phone}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
              <span className="font-bold">Store Exchange Policy:</span> Online orders can also be swapped or exchanged at any of our physical outlets within 7 days with your order ID.
            </div>

            {/* Bottom Close Button */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Close Window</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Nested Directions Modal with guaranteed close button */}
      <DirectionsModal
        location={activeDirections}
        onClose={() => setActiveDirections(null)}
      />
    </>
  );
};
