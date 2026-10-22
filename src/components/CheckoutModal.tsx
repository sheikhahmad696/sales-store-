import React, { useState } from 'react';
import { CartItem, Order } from '../types/store';
import { formatPKR, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../utils/format';
import { PAKISTAN_CITIES } from '../data/products';
import { X, CheckCircle, Truck, ShieldCheck, MapPin, Phone, User, Home, ArrowLeft } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedDiscount: number;
  couponCode: string;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedDiscount,
  couponCode,
  onOrderPlaced
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'Lahore',
    address: '',
    nearestLandmark: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal - appliedDiscount + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError('Please provide your name, phone number, and complete address.');
      return;
    }

    if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      setError('Please enter a valid Pakistan mobile number (e.g. 0300 1234567).');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const orderId = `DN-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingNum = `TRX-${Math.floor(10000000 + Math.random() * 90000000)}`;
      
      const newOrder: Order = {
        id: orderId,
        customerName: formData.fullName,
        phone: formData.phone,
        address: `${formData.address}${formData.nearestLandmark ? `, Near: ${formData.nearestLandmark}` : ''}`,
        city: formData.city,
        items: [...items],
        subtotal,
        discount: appliedDiscount,
        shipping: shippingFee,
        total,
        paymentMethod: 'cod',
        status: 'confirmed',
        courier: formData.city === 'Karachi' || formData.city === 'Lahore' ? 'Trax Express' : 'Leopard Courier',
        trackingNumber: trackingNum,
        createdAt: new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' }),
        estimatedDelivery: '2 - 4 Working Days'
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 700);
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
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-neutral-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold">Cash on Delivery Checkout</h3>
              <p className="text-xs text-neutral-400">Zero upfront payment required. Pay when delivered.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ahmad"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                WhatsApp / Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="0300 1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
              />
              <span className="text-[10px] text-neutral-500">We send tracking updates via WhatsApp/SMS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Destination City *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-neutral-950 cursor-pointer"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Nearest Landmark */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nearest Landmark / Sector (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Near Al-Fateh / Commercial Market"
                value={formData.nearestLandmark}
                onChange={(e) => setFormData({ ...formData, nearestLandmark: e.target.value })}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
              />
            </div>
          </div>

          {/* Full Delivery Address */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Complete Delivery Address (House / Flat / Street / Area) *
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. House #12, Street 4, Sector Y, DHA Phase 3"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
            />
          </div>

          {/* Order Summary Strip */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
            <div className="font-bold text-neutral-900 flex justify-between">
              <span>Order Items ({items.reduce((a, b) => a + b.quantity, 0)})</span>
              <span className="tabular-nums">{formatPKR(subtotal)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Voucher ({couponCode})</span>
                <span className="tabular-nums">-{formatPKR(appliedDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Nationwide Shipping</span>
              <span className="font-semibold text-neutral-900 tabular-nums">
                {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm sm:text-base font-black text-neutral-950">
              <span>Payable upon Delivery</span>
              <span className="tabular-nums">{formatPKR(total)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Back to Bag
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Place Cash on Delivery Order ({formatPKR(total)})</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
