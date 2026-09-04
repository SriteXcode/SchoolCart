import React from 'react';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';

export default function PromoBanners() {
  const scrollToProducts = () => {
    const el = document.getElementById('bestsellers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-14 bg-white border-b border-gray-100" id="promotions">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Banner 1: Limited Time Offer (5 Cols) */}
          <div className="md:col-span-5 rounded-2xl p-5 sm:p-6 md:p-8 bg-gradient-to-br from-pink-50 via-rose-50 to-brand-pink/15 border border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col items-start space-y-2 w-full sm:w-auto">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase text-brand-pink tracking-wider">
                <Tag size={12} />
                LIMITED TIME OFFER
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-teal leading-tight">
                Up to 25% Off
              </h3>
              <p className="text-xs text-gray-600 pb-1 sm:pb-2">
                On Select School Stationery, Notebooks & Writing Packs.
              </p>
              <button
                className="inline-flex items-center gap-2 bg-brand-pink hover:bg-brand-pink-hover text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-lg shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
                onClick={scrollToProducts}
              >
                <span>SHOP THE DEALS</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="w-full sm:w-40 md:w-44 h-32 sm:h-32 shrink-0 rounded-xl overflow-hidden shadow-xs bg-white">
              <img
                src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=80"
                alt="Stationery 25% Off"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* Banner 2: New Arrivals (7 Cols) */}
          <div className="md:col-span-7 rounded-2xl p-5 sm:p-6 md:p-8 bg-gradient-to-br from-teal-50/70 via-cyan-50/30 to-brand-teal/10 border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col items-start space-y-2 w-full sm:w-auto">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase text-brand-teal tracking-wider">
                <Sparkles size={12} />
                NEW ARRIVALS
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-teal leading-tight">
                Fresh Items, Endless Inspiration
              </h3>
              <p className="text-xs text-gray-600 pb-1 sm:pb-2">
                Explore our latest study collection crafted for your desk and daily notes.
              </p>
              <button
                className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-light text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-lg shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
                onClick={scrollToProducts}
              >
                <span>DISCOVER NOW</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="w-full sm:w-40 md:w-44 h-32 sm:h-32 shrink-0 rounded-xl overflow-hidden shadow-xs bg-white">
              <img
                src="https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400&auto=format&fit=crop&q=80"
                alt="New School Cart Arrivals"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
