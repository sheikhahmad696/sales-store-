import React, { useEffect } from 'react';
import { X, MapPin, Navigation, Copy, Check, ExternalLink, Clock, Phone } from 'lucide-react';

export interface StoreLocation {
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  whatsapp: string;
  landmark?: string;
  routeGuide?: string[];
}

interface DirectionsModalProps {
  location: StoreLocation | null;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ location, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!location) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(location.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(location.name + ' ' + location.address)}`;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with High-Visibility Close Button */}
        <div className="bg-neutral-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold">Store Directions</h3>
              <p className="text-xs text-neutral-400">{location.city} Flagship Outlet</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close Directions Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-200 text-neutral-800 px-2.5 py-1 rounded">
              {location.city} Branch
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-neutral-950 mt-1.5">
              {location.name}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
              {location.address}
            </p>
          </div>

          {/* Copy Address & External Map Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 px-3 rounded-lg border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-neutral-500" />}
              <span>{copied ? 'Address Copied!' : 'Copy Full Address'}</span>
            </button>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-3 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Turn-by-Turn Landmark Guide */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>How To Reach:</span>
            </div>
            <ul className="text-xs text-neutral-600 space-y-1.5 pl-5 list-disc">
              <li>
                {location.city === 'Lahore'
                  ? 'Located on MM Alam Road inside Vogue Towers. Parking available in basement.'
                  : location.city === 'Karachi'
                  ? 'Located inside Dolmen Mall Clifton on the 1st Floor Fashion Boulevard.'
                  : 'Located inside Centaurus Mall on Level 2 near the central atrium.'}
              </li>
              <li>Free customer parking and valet service on site.</li>
              <li>In-store pickup and instant size exchanges available.</li>
            </ul>
          </div>

          {/* Hours & Phone */}
          <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600 pt-1 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="block font-bold text-neutral-900">Hours</span>
                <span>{location.hours}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <span className="block font-bold text-neutral-900">Store Direct Line</span>
                <span>{location.phone}</span>
              </div>
            </div>
          </div>

          {/* Prominent Bottom Close Button so user never gets stuck */}
          <div className="pt-2 border-t border-neutral-200">
            <button
              onClick={onClose}
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close Directions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
