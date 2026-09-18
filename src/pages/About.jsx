import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Hammer, Heart } from 'lucide-react';

const heroImg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop';
const workshopImg = 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=1000&auto=format&fit=crop';

const values = [
  {
    icon: Hammer,
    title: 'Master Craftsmanship',
    desc: 'We partner with multi-generational artisans who understand that true quality takes time, patience, and absolute precision.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Sourcing',
    desc: 'Every piece of timber we use is ethically sourced from managed forests, ensuring we give back as much as we take from the earth.'
  },
  {
    icon: Heart,
    title: 'Designed for Life',
    desc: 'We don’t build furniture for the landfill. We build heirlooms designed to witness your family’s memories for decades to come.'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* ── Hero Section ── */}
      <section className="pt-32 pb-20 px-4 md:px-10 lg:px-16 container mx-auto text-center max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#101726] mb-6 leading-tight">
          Redefining the Meaning of <span className="text-[#b38947] italic">Home</span>.
        </h1>
        <p className="text-lg md:text-xl text-[#6B5B4E] leading-relaxed">
          Lion's Furnitures was born from a simple belief: that the spaces we live in should be furnished with pieces that tell a story, crafted with intention, and built to withstand the test of time.
        </p>
      </section>

      {/* ── Large Image Break ── */}
      <section className="px-4 md:px-10 lg:px-16 container mx-auto mb-24">
        <div className="w-full h-[50vh] min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={heroImg} 
            alt="Beautifully furnished living room" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Our Story Section ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl">
              <img 
                src={workshopImg} 
                alt="Craftsman working with wood" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-[12px] border-white/10 rounded-2xl pointer-events-none" />
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#f4edd6] text-[#8a6730] text-xs font-bold tracking-widest uppercase">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#101726] mb-6 leading-tight">
              From a small workshop to your living room.
            </h2>
            <div className="space-y-6 text-[#6B5B4E] text-lg leading-relaxed">
              <p>
                What started as a single woodworking bench in a tiny garage has grown into Lion's Furnitures. We realized early on that the modern furniture industry was moving toward disposable, flat-pack items. We wanted to go the other direction.
              </p>
              <p>
                Our team of skilled artisans and designers work closely with you to ensure each item reflects your style and meets the highest quality standards. From curated collections to bespoke creations, we believe furniture should be an investment, not a temporary fix.
              </p>
            </div>
            <div className="mt-10">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Signature_placeholder.svg" 
                alt="Founder Signature" 
                className="h-12 opacity-40 mix-blend-multiply"
              />
              <p className="text-sm font-semibold text-[#101726] mt-2 uppercase tracking-widest">
                Founding Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 bg-[#101726] text-[#FAF7F2]">
        <div className="container mx-auto px-4 md:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl mb-4 text-[#FAF7F2]">Our Philosophy</h2>
            <p className="text-[#FAF7F2] text-2xl md:text-3xl leading-relaxed mb-6 font-medium drop-shadow-md">The principles that guide every cut, every sand, and every finish we apply.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#f4edd6]/10 flex items-center justify-center mb-6 border border-[#f4edd6]/20">
                    <Icon className="w-8 h-8 text-[#b38947]" />
                  </div>
                  <h3 className="font-display text-xl mb-3">{val.title}</h3>
                  <p className="text-[#C9B49A] leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 text-center container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl text-[#101726] mb-6">
          Ready to elevate your space?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-[#b38947] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#9a6e38] hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Explore Our Collection
          </Link>
          <Link
            to="/custom-furniture"
            className="inline-flex items-center justify-center border-2 border-[#101726] text-[#101726] px-8 py-4 rounded-xl font-semibold hover:bg-[#101726] hover:text-white transition-all duration-300"
          >
            Request Custom Piece
          </Link>
        </div>
      </section>

    </div>
  );
}
