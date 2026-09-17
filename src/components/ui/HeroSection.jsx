import React, { useEffect, useState } from 'react';
import { Truck, RefreshCw, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Hero image – using Pexels (no CORS issues). Replace with your own at public/images/hero.jpg
const heroImg =
  'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200';

const trustItems = [
  { icon: Truck,       label: 'Free Shipping'    },
  { icon: RefreshCw,   label: '30-Day Returns'   },
  { icon: ShieldCheck, label: 'Premium Quality'  },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] min-h-[90vh] flex items-center">
      {/* Decorative warm-blob background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#F5E6D3] opacity-50 blur-3xl"
      />

      <div className="container mx-auto px-4 md:px-10 lg:px-16 py-20 lg:py-0 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 relative z-10">

        {/* ── Left: Text ── */}
        <div
          className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-700 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Badge */}
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#f4edd6] text-[#8a6730] text-xs font-semibold tracking-widest uppercase">
            Lion's Furnitures
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] leading-tight text-[#101726] mb-5">
            Hand-Crafted Furniture<br />
            <span className="text-[#b38947]">for Modern Living</span>
          </h1>

          <p className="text-[#6B5B4E] text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Discover timeless pieces and bespoke designs crafted from the finest materials — built to last a lifetime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#101726] text-[#FAF7F2] px-7 py-3.5 font-medium shadow-md transition-all duration-300 hover:bg-[#5C3D24] hover:scale-105 hover:shadow-lg"
            >
              Shop Furniture
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/custom-furniture"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#101726] text-[#101726] px-7 py-3.5 font-medium transition-all duration-300 hover:bg-[#101726] hover:text-[#FAF7F2] hover:scale-105"
            >
              Custom Furniture
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-5 justify-center lg:justify-start">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[#6B5B4E] text-sm">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f4edd6]">
                  <Icon className="w-4 h-4 text-[#b38947]" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Image ── */}
        <div
          className={`w-full lg:w-1/2 transition-all duration-1000 ease-out delay-200
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative">
            {/* Decorative offset frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#f4edd6]" aria-hidden="true" />
            <img
              src={heroImg}
              alt="Elegant living room with premium furniture"
              className="relative rounded-2xl object-cover w-full h-72 sm:h-96 lg:h-[520px] shadow-2xl bg-[#f4edd6]"
              onError={(e) => { e.target.style.background = '#f4edd6'; }}
            />
            {/* Floating stat card */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4edd6] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#b38947]" />
              </div>
              <div>
                <p className="text-xs text-[#6B5B4E]">Trusted by</p>
                <p className="text-sm font-semibold text-[#101726]">10,000+ Customers</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
