import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0; // Flat shipping rate
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-display mb-4 text-[#101726]">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any premium furniture to your cart yet.</p>
        <Link to="/shop" className="bg-[#b38947] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#916a2e] transition-colors inline-flex items-center gap-2">
          Continue Shopping <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <h1 className="font-display text-4xl text-[#101726] mb-10">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-gray-50/50 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    {/* Product Info */}
                    <div className="sm:col-span-6 flex gap-4 items-center">
                      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        {item.added && <p className="text-sm text-gray-500">{item.added}</p>}
                        <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1 mt-3 transition-colors">
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-3 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg h-10 w-28">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-l-lg">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center font-medium text-[#101726]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-r-lg">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="sm:col-span-3 text-right">
                      <span className="font-semibold text-lg text-[#101726]">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="font-display text-2xl text-[#101726] mb-6">Order Summary</h2>
              <div className="space-y-4 text-[#101726] mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-medium">Total</span>
                <span className="font-display text-3xl font-bold text-[#b38947]">${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="w-full h-14 bg-[#101726] text-white rounded-xl font-medium hover:bg-[#0b101c] transition-colors flex items-center justify-center gap-2 mb-4">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#b38947]" />
                Secure checkout powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}