import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { products } from '../../data/products';

export default function FeaturedProducts() {
  // Grab the top 4 products to feature on the homepage (e.g., highest rated)
  const featured = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#e8e0c8] text-[#8a6730] text-xs font-semibold tracking-widest uppercase">
              Curated Collection
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#101726]">
              Featured Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-1 text-[#b38947] font-medium text-sm hover:text-[#101726] transition-colors duration-200"
          >
            Shop all furniture
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
