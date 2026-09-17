import React from 'react';
import { Leaf, Wrench, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    description: 'Every piece is made from responsibly harvested hardwoods and eco-friendly materials.',
  },
  {
    icon: Wrench,
    title: 'Expert Craftsmanship',
    description: 'Our skilled artisans pour decades of woodworking expertise into every joint and finish.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'Each item is inspected before delivery and backed by our lifetime quality guarantee.',
  },
  {
    icon: Clock,
    title: 'Built to Last',
    description: 'Furniture designed to grow with your family — not end up in a landfill in five years.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#f4edd6] text-[#8a6730] text-xs font-semibold tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#101726] mb-4">
            Furniture Worth Investing In
          </h2>
          <p className="text-[#6B5B4E] text-lg leading-relaxed">
            We believe your home deserves more than flat-pack convenience. Here's why thousands of customers choose us.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-[#F0E6D8] bg-[#FAF7F2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#f4edd6] mb-5 group-hover:bg-[#b38947] transition-colors duration-300">
                <Icon className="w-6 h-6 text-[#b38947] group-hover:text-white transition-colors duration-300" />
              </span>
              <h3 className="font-display text-lg text-[#101726] mb-2">{title}</h3>
              <p className="text-[#6B5B4E] text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
