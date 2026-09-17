import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <h1 className="font-display text-4xl text-[#101726] mb-6">About Lion's Furnitures</h1>
        <p className="text-gray-700 mb-8 max-w-3xl leading-relaxed">
          Founded with a passion for timeless design, Lion's Furnitures blends classic craftsmanship with modern comfort. Every piece is carefully selected and handcrafted, using the finest woods and upholstery to bring warmth and elegance to your home.
        </p>
        <p className="text-gray-700 mb-8 max-w-3xl leading-relaxed">
          Our team of skilled artisans and designers work closely with you to ensure each item reflects your style and meets the highest quality standards. From curated collections to bespoke creations, we believe furniture should be both beautiful and built to last.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center bg-[#b38947] text-white px-6 py-3 rounded-lg hover:bg-[#916a2e] transition-colors"
        >
          Explore Our Collection <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </section>
  );
}
