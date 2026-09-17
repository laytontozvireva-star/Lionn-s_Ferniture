import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBF9F5]">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
        <CheckCircle className="w-16 h-16 mx-auto text-[#b38947] mb-4" />
        <h1 className="font-display text-3xl text-[#101726] mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-6">
          Your purchase has been placed successfully. We’ll start preparing your premium furniture right away.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-[#b38947] text-white px-6 py-3 rounded-lg hover:bg-[#916a2e] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
