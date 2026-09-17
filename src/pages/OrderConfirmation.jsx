import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderNumber = 'LF-2026-XXXX', date = new Date().toLocaleDateString(), total = '$0.00' } = location.state || {};

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#FBF9F5]">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
        <CheckCircle className="w-16 h-16 mx-auto text-[#b38947] mb-4" />
        <h1 className="font-display text-3xl text-[#101726] mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
        <p className="text-gray-600 mb-6">
          <strong>Order #: </strong>{orderNumber}<br />
          <strong>Date: </strong>{date}<br />
          <strong>Total: </strong>{total}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center bg-[#b38947] text-white px-6 py-3 rounded-lg hover:bg-[#916a2e] transition-colors"
        >
          Continue Shopping <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}
