import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Reusable "coming soon" placeholder used by stub pages.
 * Props: title, description, icon (optional emoji or string)
 */
export default function ComingSoon({ title, description, icon = '🪑' }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <span className="text-6xl mb-6">{icon}</span>
      <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#f4edd6] text-[#8a6730] text-xs font-semibold tracking-widest uppercase">
        Coming Soon
      </span>
      <h1 className="font-display text-4xl md:text-5xl text-[#101726] mb-4">{title}</h1>
      <p className="text-[#6B5B4E] text-lg max-w-md mb-10">{description}</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg bg-[#101726] text-[#FAF7F2] px-6 py-3 font-medium hover:bg-[#5C3D24] hover:scale-105 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
