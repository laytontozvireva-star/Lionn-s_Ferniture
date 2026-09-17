import React, { useState } from 'react';
import { ArrowRight, FileText, Hammer, Truck, CheckCircle2, Upload } from 'lucide-react';
import Toast from '../components/ui/Toast';

const heroImg = 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1600&auto=format&fit=crop';

const processSteps = [
  { icon: FileText, title: '1. Consultation', desc: 'Share your vision, dimensions, and inspiration with our design team.' },
  { icon: Hammer, title: '2. Crafting', desc: 'Our master artisans hand-build your piece using premium, sustainable wood.' },
  { icon: Truck, title: '3. Delivery', desc: 'White-glove delivery directly to your room of choice, fully assembled.' },
];

export default function CustomFurniture() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    material: '',
    budget: '',
    details: ''
  });
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ show: true, message: 'Your custom request has been sent! Our team will reach out shortly.' });
    setForm({ name: '', email: '', phone: '', material: '', budget: '', details: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24">
      {/* ── Hero Banner ── */}
      <div className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <img src={heroImg} alt="Master craftsman working on wood" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#f4edd6] text-xs font-bold tracking-widest uppercase border border-white/20">
            Bespoke Service
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Build Your Dream Piece
          </h1>
          <p className="text-gray-200 text-lg md:text-xl">
            From imagination to reality. Partner with our master craftsmen to create custom furniture that perfectly fits your space and style.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 lg:px-16 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ── Left Side: The Process ── */}
          <div className="flex-1 lg:pr-10 pt-16">
            <h2 className="font-display text-3xl text-[#101726] mb-8">How It Works</h2>
            <div className="space-y-10">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#F5E6D3] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#b38947]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#101726] mb-2">{step.title}</h3>
                      <p className="text-[#6B5B4E] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-16 p-8 rounded-2xl bg-white border border-[#e8d5bc] shadow-sm">
              <h3 className="text-lg font-bold text-[#101726] mb-4">Why Go Custom?</h3>
              <ul className="space-y-3">
                {['Exact dimensions for awkward spaces', 'Choice of premium hardwoods (Oak, Walnut, Teak)', 'Match your existing wood finishes', 'True heirloom quality that lasts generations'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#6B5B4E]">
                    <CheckCircle2 className="w-5 h-5 text-[#b38947] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right Side: The Form ── */}
          <div className="w-full lg:w-[500px] shrink-0">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
              <h2 className="font-display text-2xl text-[#101726] mb-2">Start Your Request</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the details below and we'll get back to you within 48 hours with a quote.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:bg-white transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:bg-white transition-colors" placeholder="(555) 000-0000" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:bg-white transition-colors" placeholder="john@example.com" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Preferred Wood</label>
                    <select name="material" value={form.material} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:bg-white transition-colors">
                      <option value="">Select...</option>
                      <option value="oak">Solid Oak</option>
                      <option value="walnut">Black Walnut</option>
                      <option value="teak">Teak</option>
                      <option value="maple">Maple</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Estimated Budget</label>
                    <select name="budget" value={form.budget} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:bg-white transition-colors">
                      <option value="">Select...</option>
                      <option value="under-1k">Under $1,000</option>
                      <option value="1k-3k">$1,000 - $3,000</option>
                      <option value="3k-5k">$3,000 - $5,000</option>
                      <option value="5k-plus">$5,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Project Details</label>
                  <textarea name="details" value={form.details} onChange={handleChange} required rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:bg-white transition-colors resize-none" placeholder="Dimensions, style preferences, or specific needs..." />
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[#101726] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#b38947] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    Submit Request <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      <Toast 
        message={toast.message} 
        isVisible={toast.show} 
        onClose={() => setToast(prev => ({ ...prev, show: false }))} 
      />
    </div>
  );
}
