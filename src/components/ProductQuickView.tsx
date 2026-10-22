import React, { useState } from 'react';
import { Product } from '../types/store';
import { formatPKR, calculateDiscount } from '../utils/format';
import { X, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Star, Info } from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0].name : '');
  const [isAdded, setIsAdded] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAdd = () => {
    onAddToCart(product, selectedSize || undefined, selectedColor || undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-neutral-600 hover:text-neutral-950 shadow-sm transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Side */}
          <div className="relative bg-neutral-100 aspect-1/1 md:aspect-auto flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-xl"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-neutral-950 text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Product Purchasing Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span className="uppercase font-semibold tracking-wider">
                  {product.subCategory || product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mt-2">
                <span className="text-2xl font-black text-neutral-950 tabular-nums">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through tabular-nums">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Save {formatPKR(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Combo Items breakdown */}
              {product.comboItems && (
                <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-200/80 space-y-1.5">
                  <p className="text-xs font-bold text-neutral-900">Included in this combo:</p>
                  {product.comboItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-neutral-700">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-2">
                    <span>Colorway:</span>
                    <span className="text-neutral-900">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor === color.name
                            ? 'scale-110 border-neutral-950 ring-2 ring-neutral-300'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold text-neutral-700 mb-2">
                    <span>Select Size:</span>
                    <span className="text-neutral-900">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                          selectedSize === size
                            ? 'bg-neutral-950 text-white border-neutral-950'
                            : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features / Specs */}
              {product.features && (
                <div className="mt-4 border-t border-neutral-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Fabric & Craftsmanship
                  </p>
                  <ul className="text-xs text-neutral-600 space-y-1">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-neutral-400">·</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Add to Bag Action */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <button
                onClick={handleAdd}
                disabled={product.isSoldOut}
                className={`w-full py-3.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : product.isSoldOut
                    ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                    : 'bg-neutral-950 hover:bg-neutral-800 text-white active:scale-98'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : product.isSoldOut ? (
                  <span>Sold Out</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · {formatPKR(product.price)}</span>
                  </>
                )}
              </button>

              {/* Delivery Micro-Badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-500" />
                  <span>COD Across Pakistan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                  <span>7-Day Hassle-Free Swap</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
