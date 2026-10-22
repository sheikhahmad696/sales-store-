import React, { useState } from 'react';
import { Order } from '../types/store';
import { formatPKR } from '../utils/format';
import { X, Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle, MapPin } from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrder: Order | null;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrder
}) => {
  const [searchInput, setSearchInput] = useState(recentOrder ? recentOrder.id : '');
  const [searched, setSearched] = useState(Boolean(recentOrder));
  const [activeTab, setActiveTab] = useState<'status' | 'faq'>('status');

  if (!isOpen) return null;

  const currentOrder = recentOrder || {
    id: searchInput || 'DN-78219',
    customerName: 'Muhammad Ahmad',
    phone: '0300 1234567',
    address: 'DHA Phase 5, Sector C',
    city: 'Lahore',
    items: [],
    subtotal: 6500,
    discount: 0,
    shipping: 0,
    total: 6500,
    paymentMethod: 'cod' as const,
    status: 'in_transit' as const,
    courier: 'Trax Logistics Pakistan',
    trackingNumber: 'TRX-94819201',
    createdAt: 'Today',
    estimatedDelivery: 'Tomorrow by 5:00 PM'
  };

  const steps = [
    { title: 'Order Booked', desc: 'Received & verified via system', done: true, time: '10:15 AM' },
    { title: 'Packed & Quality Checked', desc: 'Lahore Central Fulfillment Facility', done: true, time: '02:40 PM' },
    { title: 'Handed Over to Courier', desc: `In transit via ${currentOrder.courier}`, done: true, time: '06:10 PM' },
    { title: 'Out for Delivery', desc: 'Rider assigned for doorstep delivery', done: false, time: 'Expected Tomorrow' },
    { title: 'Delivered & COD Collected', desc: 'Payment upon parcel handoff', done: false, time: 'Pending' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearched(true);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-neutral-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold">Track Your Parcel</h3>
              <p className="text-xs text-neutral-400">Real-time status across Trax & Leopard Couriers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1"
            aria-label="Close Order Tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. DN-78219) or Phone"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-neutral-950 uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-950 text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Track
            </button>
          </form>

          {/* Quick Order Overview Card */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-950">
                Tracking ID: <span className="font-mono">{currentOrder.id}</span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                In Transit
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 pt-1">
              <div>
                <span className="text-neutral-400 block text-[11px]">Courier:</span>
                <span className="font-semibold text-neutral-900">{currentOrder.courier}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Estimated Arrival:</span>
                <span className="font-semibold text-neutral-900">{currentOrder.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-4 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Shipment Milestones
            </h4>
            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start justify-between">
                  {/* Step circle */}
                  <div
                    className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      step.done
                        ? 'bg-neutral-950 text-white ring-4 ring-neutral-100'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {step.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${step.done ? 'text-neutral-950' : 'text-neutral-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-[11px] text-neutral-500">{step.desc}</p>
                  </div>
                  <span className="text-[11px] font-medium text-neutral-400 tabular-nums">
                    {step.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Help notice */}
          <div className="p-3 bg-neutral-100 rounded-lg text-xs text-neutral-600 flex items-center justify-between">
            <span>Need urgent delivery support?</span>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-950 font-bold hover:underline"
            >
              WhatsApp Support &rarr;
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
