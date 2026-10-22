import React from 'react';
import { Order } from '../types/store';
import { formatPKR } from '../utils/format';
import { CheckCircle2, Truck, Package, MapPin, Phone, Copy, Check, ArrowRight } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onOpenTracking: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onOpenTracking
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!order) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
          aria-label="Close Confirmation"
        >
          <span className="text-lg leading-none font-bold">×</span>
        </button>

        {/* Success Banner */}
        <div className="bg-emerald-700 text-white p-6 sm:p-8 text-center space-y-3">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">
              Cash on Delivery Order Confirmed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Thank You, {order.customerName}!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-sm mx-auto">
              Your parcel is booked with {order.courier}. Pay {formatPKR(order.total)} when your rider arrives.
            </p>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Order Reference Number */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div>
              <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                Order Tracking ID
              </p>
              <p className="text-lg font-black text-neutral-950 tabular-nums">
                {order.id}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-md bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>

          {/* Delivery & Dispatch Summary */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg border border-neutral-200/80">
              <span className="text-neutral-400 font-semibold block mb-1">Assigned Courier</span>
              <p className="font-bold text-neutral-900">{order.courier}</p>
              <p className="text-neutral-500 text-[11px]">Consignment: {order.trackingNumber}</p>
            </div>
            <div className="p-3.5 rounded-lg border border-neutral-200/80">
              <span className="text-neutral-400 font-semibold block mb-1">Estimated Delivery</span>
              <p className="font-bold text-neutral-900">{order.estimatedDelivery}</p>
              <p className="text-emerald-700 font-semibold text-[11px]">Nationwide Dispatch</p>
            </div>
          </div>

          {/* Destination */}
          <div className="text-xs text-neutral-600 border-t border-neutral-100 pt-4 space-y-1">
            <p className="font-semibold text-neutral-900">Delivery Address:</p>
            <p className="text-neutral-700">{order.address}, {order.city}</p>
            <p className="text-neutral-500">Contact: {order.phone}</p>
          </div>

          {/* Items Preview */}
          <div className="border-t border-neutral-100 pt-4">
            <p className="text-xs font-bold text-neutral-900 mb-2">Booked Items ({order.items.length}):</p>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-neutral-700">
                  <span className="truncate pr-2">
                    {item.quantity}× {item.product.name} {item.selectedSize ? `(${item.selectedSize})` : ''}
                  </span>
                  <span className="font-semibold tabular-nums shrink-0">
                    {formatPKR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenTracking();
              }}
              className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <Truck className="w-4 h-4" />
              <span>Track Parcel Live</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
