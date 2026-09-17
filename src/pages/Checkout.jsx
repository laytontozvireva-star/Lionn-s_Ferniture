import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app you'd send this data to a payment gateway.
    clearCart();
    navigate('/thank-you');
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 max-w-3xl">
        <h1 className="font-display text-4xl text-[#101726] mb-8">Checkout</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link to="/shop" className="bg-[#b38947] text-white px-6 py-3 rounded-lg hover:bg-[#916a2e] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Shipping Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947] md:col-span-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP / Postal Code"
                value={form.zip}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="font-display text-2xl text-[#101726] mb-4">Order Summary</h2>
              <div className="space-y-3 text-[#101726] mb-4 border-b border-gray-100 pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-3xl font-bold text-[#b38947] mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button type="submit" className="w-full h-14 bg-[#101726] text-white rounded-xl font-medium hover:bg-[#0b101c] transition-colors flex items-center justify-center gap-2">
                Place Order <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
