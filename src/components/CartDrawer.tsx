import React, { useState } from 'react';
import { CartItem } from '../types/store';
import { formatPKR, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../utils/format';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Tag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string) => void;
  onRemoveItem: (productId: string, size?: string) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const discountAmount = couponCode === 'DN10' ? Math.round(subtotal * 0.1) : 0;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (clean === 'DN10') {
      setCouponCode('DN10');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try "DN10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-neutral-200">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-lg font-bold text-neutral-950">
                Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-neutral-50 border-b border-neutral-200">
            {amountUntilFreeShipping > 0 ? (
              <p className="text-xs text-neutral-700 font-medium mb-1.5">
                Add <span className="font-bold text-neutral-950">{formatPKR(amountUntilFreeShipping)}</span> more for <span className="text-emerald-700 font-bold">Free Nationwide Delivery!</span>
              </p>
            ) : (
              <p className="text-xs text-emerald-800 font-bold mb-1.5 flex items-center gap-1">
                <span>🎉</span> You have unlocked FREE Express Delivery across Pakistan!
              </p>
            )}
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-neutral-900 h-full transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-neutral-900">Your bag is empty</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Explore our viral combo offers and cold collection knitwear.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-neutral-950 text-white text-xs font-semibold rounded-md hover:bg-neutral-800"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 p-3 rounded-lg border border-neutral-200/80 bg-neutral-50/50"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/hero_cold_collection.jpg';
                    }}
                    className="w-20 h-20 object-cover rounded-md bg-neutral-200 shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-950 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedSize && (
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Size: <span className="font-semibold text-neutral-800">{item.selectedSize}</span>
                        </p>
                      )}

                      <p className="text-xs font-extrabold text-neutral-950 mt-1 tabular-nums">
                        {formatPKR(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-neutral-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <span className="text-[11px] text-neutral-500 font-medium tabular-nums ml-auto">
                        Total: {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white space-y-4">
              
              {/* Voucher Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code (try DN10)"
                    className="w-full text-xs uppercase px-3 py-2 border border-neutral-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-neutral-950"
                  />
                  {couponCode && (
                    <span className="absolute right-2 top-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      10% Applied
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-md hover:bg-neutral-800"
                >
                  Apply
                </button>
              </form>
              {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">{formatPKR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount (10%)</span>
                    <span className="tabular-nums">-{formatPKR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Courier Shipping</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total (Cash On Delivery)</span>
                  <span className="tabular-nums">{formatPKR(total)}</span>
                </div>
              </div>

              {/* COD Trust Note */}
              <div className="flex items-center gap-2 p-2 rounded bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Pay securely in cash when rider arrives at your doorstep.</span>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => onProceedToCheckout(discountAmount, couponCode)}
                className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-md shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Checkout (Cash On Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
