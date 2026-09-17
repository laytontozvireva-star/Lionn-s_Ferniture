import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Living Room',
    slug: 'living-room',
    count: '48 pieces',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    count: '36 pieces',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&auto=format&fit=crop',
    span: '',
  },
  {
    name: 'Dining Room',
    slug: 'dining-room',
    count: '24 pieces',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1c094f14c?q=80&w=800&auto=format&fit=crop',
    span: '',
  },
  {
    name: 'Home Office',
    slug: 'home-office',
    count: '20 pieces',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    span: '',
  },
  {
    name: 'Outdoor',
    slug: 'outdoor',
    count: '18 pieces',
    image: 'https://images.unsplash.com/photo-1519643381401-22c77e60520e?q=80&w=800&auto=format&fit=crop',
    span: '',
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#f4edd6] text-[#8a6730] text-xs font-semibold tracking-widest uppercase">
              Shop by Room
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#101726]">
              Browse Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-1 text-[#b38947] font-medium text-sm hover:text-[#101726] transition-colors duration-200"
          >
            View all products
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:grid-rows-2 auto-rows-[260px]">
          {categories.map(({ name, slug, count, image, span }) => (
            <Link
              key={slug}
              to={`/shop?category=${slug}`}
              className={`group relative block w-full h-full min-h-[260px] overflow-hidden rounded-2xl ${span}`}
            >
              {/* Background image */}
              <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-[#f4edd6]"
                onError={(e) => { e.target.style.background = '#f4edd6'; }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-white text-xl md:text-2xl mb-0.5">
                    {name}
                  </h3>
                  <p className="text-white/70 text-sm">{count}</p>
                </div>
                {/* Arrow badge — slides in on hover */}
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
