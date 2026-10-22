import React, { useState } from 'react';
import { Order } from '../types/store';
import { formatPKR } from '../utils/format';
import { Search, Truck, CheckCircle2, Clock, PackageCheck, AlertCircle, MapPin, Copy, Check, MessageSquare, RefreshCw } from 'lucide-react';

interface OrderTrackingViewProps {
  orders: Order[];
  onNavigateHome: () => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({ orders, onNavigateHome }) => {
  const [searchQuery, setSearchQuery] = useState(orders.length > 0 ? orders[0].id : '');
  const [selectedOrderId, setSelectedOrderId] = useState(orders.length > 0 ? orders[0].id : 'DN-84910');
  const [copiedId, setCopiedId] = useState(false);

  // Mock sample orders for instant testing if user hasn't made an order yet
  const sampleOrders: Record<string, Order> = {
    'DN-84910': {
      id: 'DN-84910',
      customerName: 'Hamza Khan',
      phone: '0302 9876543',
      address: 'House #42, Street 7, Phase 5 DHA',
      city: 'Lahore',
      items: [
        {
          product: {
            id: 'sample-1',
            name: 'Baggy Jeans × Cartier Tank',
            category: 'combos',
            price: 2999,
            originalPrice: 7000,
            image: '/src/assets/images/combo_denim_watch_1792648854688.jpg',
            rating: 4.9,
            reviewsCount: 184,
            description: '14oz washed relaxed denim with classic rectangular dress watch.',
            features: ['14oz Denim', 'Tank Watch'],
            sizes: ['32']
          },
          quantity: 1,
          selectedSize: '32'
        }
      ],
      subtotal: 2999,
      discount: 0,
      shipping: 250,
      total: 3249,
      paymentMethod: 'cod',
      status: 'in_transit',
      courier: 'Trax Express Logistics',
      trackingNumber: 'TRX-94810294PK',
      createdAt: 'Yesterday, 04:30 PM',
      estimatedDelivery: 'Tomorrow by 4:00 PM'
    },
    'DN-39102': {
      id: 'DN-39102',
      customerName: 'Zainab Tariq',
      phone: '0321 4455667',
      address: 'Apartment 4B, Creek Vista, DHA Phase 8',
      city: 'Karachi',
      items: [
        {
          product: {
            id: 'sample-2',
            name: 'Perception by DN Store',
            category: 'fragrances',
            price: 2450,
            originalPrice: 4500,
            image: '/src/assets/images/perception_perfume_1792648855411.jpg',
            rating: 5.0,
            reviewsCount: 312,
            description: 'Signature magnetic perfume.',
            features: ['100ml EDP'],
            sizes: ['100ml']
          },
          quantity: 1
        }
      ],
      subtotal: 2450,
      discount: 0,
      shipping: 250,
      total: 2700,
      paymentMethod: 'cod',
      status: 'out_for_delivery',
      courier: 'Leopards Courier Service',
      trackingNumber: 'LCS-77192041',
      createdAt: '2 Days Ago',
      estimatedDelivery: 'Today by 6:00 PM (Rider on route)'
    }
  };

  // Combine real user orders with sample orders
  const allOrdersMap: Record<string, Order> = {};
  Object.values(sampleOrders).forEach(o => { allOrdersMap[o.id] = o; });
  orders.forEach(o => { allOrdersMap[o.id] = o; });

  const currentOrder = allOrdersMap[selectedOrderId] || (orders.length > 0 ? orders[0] : sampleOrders['DN-84910']);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchQuery.trim().toUpperCase();
    if (allOrdersMap[clean]) {
      setSelectedOrderId(clean);
    } else {
      // search by phone
      const foundByPhone = Object.values(allOrdersMap).find(o => o.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')));
      if (foundByPhone) {
        setSelectedOrderId(foundByPhone.id);
      } else {
        alert(`Order "${searchQuery}" not found. You can test with demo order: DN-84910 or DN-39102`);
      }
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const getMilestones = (status: string) => {
    return [
      {
        title: 'Order Booked & Verified',
        desc: 'Customer details and address confirmed for COD shipment.',
        time: currentOrder.createdAt,
        done: true
      },
      {
        title: 'Quality Checked & Packed',
        desc: 'Inspected at Lahore Central Distribution Hub.',
        time: '6 hours after booking',
        done: true
      },
      {
        title: 'In Transit with Courier',
        desc: `Dispatched via ${currentOrder.courier}. Tracking ID: ${currentOrder.trackingNumber}`,
        time: 'En route to hub',
        done: status === 'in_transit' || status === 'out_for_delivery' || status === 'delivered'
      },
      {
        title: 'Out for Doorstep Delivery',
        desc: `Rider assigned in ${currentOrder.city} area. Cash to collect: ${formatPKR(currentOrder.total)}.`,
        time: currentOrder.estimatedDelivery,
        done: status === 'out_for_delivery' || status === 'delivered'
      },
      {
        title: 'Delivered & Completed',
        desc: 'Parcel received and payment collected.',
        time: 'Pending doorstep arrival',
        done: status === 'delivered'
      }
    ];
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header */}
      <div className="text-left border-b border-neutral-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Real-Time Courier Tracking
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mt-1">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1">
          Check live consignment status across Trax Logistics and Leopards Courier anywhere in Pakistan.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="Enter Order ID (e.g. DN-84910) or Mobile Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-neutral-950 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-neutral-950 text-white font-bold text-xs sm:text-sm rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Track Parcel
          </button>
        </form>

        {/* Quick Testing Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <span className="font-semibold text-neutral-700">Quick Test IDs:</span>
          {Object.keys(allOrdersMap).map((id) => (
            <button
              key={id}
              onClick={() => {
                setSearchQuery(id);
                setSelectedOrderId(id);
              }}
              className={`px-2.5 py-1 rounded text-xs border font-mono transition-colors cursor-pointer ${
                selectedOrderId === id
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {id} {orders.some(o => o.id === id) ? '(Your Order)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracking Details Card */}
      {currentOrder && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-md overflow-hidden">
          
          {/* Card Top Strip */}
          <div className="bg-neutral-950 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                  Cash on Delivery Order
                </span>
                <span className="text-neutral-500">·</span>
                <span className="text-xs text-neutral-300">Booked {currentOrder.createdAt}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black mt-1 flex items-center gap-2">
                <span>Order #{currentOrder.id}</span>
                <button
                  onClick={() => handleCopy(currentOrder.id)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                  title="Copy Order ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-xl border border-neutral-800">
              <Truck className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] text-neutral-400 font-bold uppercase">Status</span>
                <span className="text-xs font-extrabold text-white capitalize">
                  {currentOrder.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Quick 3-Pillar Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-neutral-400 block font-semibold mb-1">Courier Partner</span>
                <p className="font-bold text-neutral-950 text-sm">{currentOrder.courier}</p>
                <p className="text-neutral-500 text-[11px] font-mono mt-0.5">
                  Consignment: {currentOrder.trackingNumber}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-neutral-400 block font-semibold mb-1">Expected Delivery</span>
                <p className="font-bold text-neutral-950 text-sm">{currentOrder.estimatedDelivery}</p>
                <p className="text-emerald-700 font-semibold text-[11px] mt-0.5">
                  Doorstep Courier Trax / Leopards
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                <span className="text-neutral-400 block font-semibold mb-1">COD Amount to Pay</span>
                <p className="font-bold text-neutral-950 text-sm tabular-nums">{formatPKR(currentOrder.total)}</p>
                <p className="text-neutral-500 text-[11px] mt-0.5">
                  Pay cash to delivery rider
                </p>
              </div>
            </div>

            {/* Shipment Milestones Timeline */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-6">
                Shipment Milestones
              </h3>

              <div className="space-y-6 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                {getMilestones(currentOrder.status).map((step, idx) => (
                  <div key={idx} className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    {/* Circle icon */}
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
                      <h4 className={`text-xs sm:text-sm font-bold ${step.done ? 'text-neutral-950' : 'text-neutral-400'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <span className="text-[11px] font-medium text-neutral-400 tabular-nums shrink-0 mt-1 sm:mt-0">
                      {step.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Ordered Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-100">
              {/* Delivery Destination */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-neutral-900 text-sm">Customer & Address</h4>
                <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/50 space-y-1">
                  <p className="font-bold text-neutral-950">{currentOrder.customerName}</p>
                  <p className="text-neutral-600">{currentOrder.address}</p>
                  <p className="text-neutral-900 font-semibold">{currentOrder.city}, Pakistan</p>
                  <p className="text-neutral-500 pt-1">Phone: {currentOrder.phone}</p>
                </div>
              </div>

              {/* Items in Parcel */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-neutral-900 text-sm">
                  Items in Parcel ({currentOrder.items.length})
                </h4>
                <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50/50 space-y-2 max-h-48 overflow-y-auto">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-neutral-800">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="font-bold text-neutral-950">{item.quantity}×</span>
                        <span className="truncate">{item.product.name}</span>
                        {item.selectedSize && (
                          <span className="text-[10px] bg-neutral-200 px-1.5 py-0.2 rounded font-semibold">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>
                      <span className="font-bold tabular-nums shrink-0">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-100">
              <a
                href={`https://wa.me/923001234567?text=${encodeURIComponent(
                  `Hi DN Store, I want an update regarding my order #${currentOrder.id}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Courier Support</span>
              </a>

              <button
                onClick={() => alert(`Exchange Request for Order #${currentOrder.id} received! Our team will contact you via WhatsApp for doorstep size swap.`)}
                className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Request 7-Day Size Exchange</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
