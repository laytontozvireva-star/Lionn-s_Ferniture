import React from 'react';
import { Link } from 'react-router-dom';
import ComingSoon from '../components/ui/ComingSoon';

export default function Account() {
  return (
    <section className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
  <div className="container mx-auto px-4 md:px-10 lg:px-16 max-w-2xl">
    <h1 className="font-display text-4xl text-[#101726] mb-6">Your Account</h1>
    <div className="flex items-center space-x-6 mb-8">
      <img src="/logo.jpg" alt="User avatar" className="w-24 h-24 rounded-full object-cover" />
      <div>
        <p className="text-xl font-medium text-[#101726]">Jane Doe</p>
        <p className="text-gray-600">jane.doe@example.com</p>
      </div>
    </div>
    <nav className="space-y-4">
      <Link to="/orders" className="inline-flex items-center text-[#b38947] hover:underline">
        View Orders
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </Link>
    </nav>
  </div>
</section>
  );
}
