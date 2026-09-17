import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CustomFurniture() {
  const [form, setForm] = useState({ name: '', email: '', details: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your custom request has been sent! We will contact you soon.');
    setForm({ name: '', email: '', details: '' });
  };
  return (
    <section className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 max-w-2xl">
        <h1 className="font-display text-4xl text-[#101726] mb-6">Custom Furniture Request</h1>
        <p className="text-gray-700 mb-8">
          Tell us what you have in mind – dimensions, materials, style – and our artisans will craft a piece just for you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
          />
          <textarea
            name="details"
            placeholder="Describe your custom piece"
            value={form.details}
            onChange={handleChange}
            rows={6}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#b38947]"
          />
          <button
            type="submit"
            className="inline-flex items-center bg-[#b38947] text-white px-6 py-3 rounded-lg hover:bg-[#916a2e] transition-colors"
          >
            Submit Request <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </form>
      </div>
    </section>
  );
}
