import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Interior Designer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Absolutely stunning quality. The dining table I ordered exceeded every expectation — solid oak, beautiful finish, and delivered on time. My clients were blown away.',
  },
  {
    name: 'James T.',
    role: 'Homeowner',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'We ordered a custom sofa and the team was incredible throughout. They helped with fabric selection, kept us updated, and the result was perfect for our living room.',
  },
  {
    name: 'Amina K.',
    role: 'Architect',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    text: 'I recommend this store to all my clients. The craftsmanship is on par with European boutique brands, but at a much fairer price point.',
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#FAF7F2] py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="max-w-xl mx-auto text-center mb-14">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#f4edd6] text-[#8a6730] text-xs font-semibold tracking-widest uppercase">
            Customer Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#101726] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#6B5B4E] text-lg">
            Real reviews from real people who brought our furniture into their homes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, avatar, rating, text }) => (
            <div
              key={name}
              className="flex flex-col bg-white rounded-2xl p-8 shadow-sm border border-[#F0E6D8] hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <Stars count={rating} />
              <p className="text-[#6B5B4E] text-sm leading-relaxed mb-6 flex-1">"{text}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  alt={name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#f4edd6]"
                />
                <div>
                  <p className="text-sm font-semibold text-[#101726]">{name}</p>
                  <p className="text-xs text-[#b38947]">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
