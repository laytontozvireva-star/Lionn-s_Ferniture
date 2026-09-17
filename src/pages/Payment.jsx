import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      // In a real app we would get order details here; we mock them
      const orderInfo = {
        orderNumber: 'LF-2026-00124',
        date: new Date().toLocaleDateString(),
        total: '$599.00',
      };
      navigate('/order-confirmation', { state: orderInfo });
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 max-w-2xl">
        <h1 className="font-display text-4xl text-[#101726] mb-6">Payment Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name on Card"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={form.cardNumber}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
          />
          <div className="flex space-x-2">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={form.expiry}
              onChange={handleChange}
              required
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={form.cvc}
              onChange={handleChange}
              required
              className="w-24 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
            />
          </div>
          {error && <p className="text-red-600" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b38947] text-white px-6 py-3 rounded-lg hover:bg-[#916a2e] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'} <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
}

