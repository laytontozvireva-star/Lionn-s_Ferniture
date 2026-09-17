import React, { useEffect, useState } from 'react';
import { Truck, RefreshCw, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [
  'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

const trustItems = [
  { icon: Truck,       label: 'Free Shipping'    },
  { icon: RefreshCw,   label: '30-Day Returns'   },
  { icon: ShieldCheck, label: 'Premium Quality'  },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] min-h-[90vh] flex items-center">
      {/* Decorative warm-blob background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#F5E6D3] opacity-50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full bg-[#E5D7C2] opacity-30 blur-3xl"
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

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] leading-tight text-[#101726] mb-5">
            Hand-Crafted <br className="hidden sm:block" />
            Furniture <br className="hidden sm:block" />
            <span className="text-[#b38947]">for Modern Living</span>
          </h1>

          <p className="text-[#6B5B4E] text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Discover timeless pieces and bespoke designs crafted from the finest materials — built to last a lifetime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#101726] text-[#FAF7F2] px-7 py-3.5 font-medium shadow-md transition-all duration-300 hover:bg-[#b38947] hover:scale-105 hover:shadow-lg"
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
              <div key={label} className="flex items-center gap-2 text-[#6B5B4E] text-sm font-medium">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f4edd6]">
                  <Icon className="w-4 h-4 text-[#b38947]" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Image Carousel ── */}
        <div
          className={`w-full lg:w-1/2 transition-all duration-1000 ease-out delay-200
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative">
            {/* Decorative offset frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#b38947]/30" aria-hidden="true" />
            
            <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-[#f4edd6]">
              {heroImages.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`Premium furniture showcase ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    idx === currentImageIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  style={{ transitionDuration: '1.5s' }}
                />
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIdx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Floating stat card */}
            <div className="absolute -left-6 bottom-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-5 py-4 hidden sm:flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-12 h-12 rounded-full bg-[#f4edd6] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#b38947]" />
              </div>
              <div>
                <p className="text-xs text-[#6B5B4E] uppercase tracking-wider font-semibold">Trusted by</p>
                <p className="text-lg font-bold text-[#101726]">10,000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
