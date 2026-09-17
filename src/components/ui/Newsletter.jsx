import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-[#101726] py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#f4edd6]/20 text-[#f4edd6] text-xs font-semibold tracking-widest uppercase">
            <Mail className="w-3 h-3" /> Newsletter
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-[#FAF7F2] mb-3">
            Stay Inspired
          </h2>
          <p className="text-[#C9B49A] text-lg mb-8">
            Get new arrivals, design tips, and exclusive offers delivered to your inbox.
          </p>

          {submitted ? (
            <div className="inline-block bg-[#f4edd6]/20 text-[#f4edd6] px-6 py-4 rounded-xl text-sm font-medium">
              🎉 Thank you for subscribing! We'll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 rounded-lg px-4 py-3 bg-white/10 border border-white/20 text-[#FAF7F2] placeholder-[#C9B49A] focus:outline-none focus:ring-2 focus:ring-[#f4edd6] text-sm"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#f4edd6] text-[#101726] px-6 py-3 font-semibold text-sm transition-all duration-300 hover:bg-white hover:scale-105"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}

          <p className="mt-4 text-[#C9B49A] text-xs">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
