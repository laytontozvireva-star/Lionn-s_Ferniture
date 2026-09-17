import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="font-display text-[120px] leading-none text-[#f4edd6] select-none">404</p>
      <h1 className="font-display text-3xl md:text-4xl text-[#101726] mb-3 -mt-4">
        Page Not Found
      </h1>
      <p className="text-[#6B5B4E] text-lg max-w-sm mb-10">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#101726] text-[#FAF7F2] px-6 py-3 font-medium hover:bg-[#5C3D24] hover:scale-105 transition-all duration-300"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-[#101726] text-[#101726] px-6 py-3 font-medium hover:bg-[#101726] hover:text-[#FAF7F2] hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </div>
  );
}
