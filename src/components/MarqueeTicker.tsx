import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'APKA APNA DN STORE',
    'THE COLD COLLECTION',
    'CASH ON DELIVERY NATIONWIDE',
    'SIGNATURE 2-IN-1 COMBOS',
    'EASY 7-DAY EXCHANGES',
    'LAHORE · KARACHI · ISLAMABAD',
    'APKA APNA DN STORE',
    'HIGH STREET FIT & DRAPE',
  ];

  return (
    <div className="bg-neutral-950 text-white py-3.5 border-y border-neutral-800 overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.concat(items).map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-5">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.25em] uppercase text-neutral-100">
              {text}
            </span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
