import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, ArrowRight } from 'lucide-react';

// Craftsman / workshop image from Pexels
const craftImg =
  'https://images.pexels.com/photos/3637765/pexels-photo-3637765.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function CustomCTABanner() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <div className="relative overflow-hidden rounded-3xl bg-[#101726] flex flex-col lg:flex-row items-center">
          {/* Text side */}
          <div className="relative z-10 flex-1 p-10 md:p-14 lg:p-20 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-[#f4edd6]/20 text-[#f4edd6] text-xs font-semibold tracking-widest uppercase">
              <Pencil className="w-3 h-3" /> Custom Orders
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[#FAF7F2] mb-5 leading-tight">
              Can't Find Exactly<br />What You're Looking For?
            </h2>
            <p className="text-[#C9B49A] text-lg mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Our craftsmen will build your dream piece from scratch — you choose the wood, the finish, the dimensions, and the style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/custom-furniture"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#f4edd6] text-[#101726] px-7 py-3.5 font-semibold transition-all duration-300 hover:bg-white hover:scale-105"
              >
                Start Your Custom Order
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            {/* Mini stats */}
            <div className="mt-10 flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
              {[['500+', 'Custom Pieces Built'], ['4–6 Weeks', 'Average Delivery'], ['100%', 'Satisfaction Rate']].map(
                ([stat, label]) => (
                  <div key={label}>
                    <p className="font-display text-2xl text-[#f4edd6]">{stat}</p>
                    <p className="text-[#C9B49A] text-sm">{label}</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Image side */}
          <div className="relative w-full lg:w-2/5 h-64 lg:h-auto self-stretch overflow-hidden">
            <img
              src={craftImg}
              alt="Craftsman working on custom furniture"
              className="w-full h-full object-cover opacity-60 lg:opacity-80"
            />
            {/* Gradient overlay blending into the dark bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#101726] via-[#101726]/40 to-transparent lg:bg-gradient-to-l" />
          </div>
        </div>
      </div>
    </section>
  );
}
