import React, { useState, useEffect } from 'react';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';

const LIMITED_TIME_OFFERS = [
  {
    id: 1,
    title: 'Up to 25% Off',
    subtitle: 'On Select School Stationery, Notebooks & Writing Packs.',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=80',
    color: 'from-pink-50 via-rose-50 to-brand-pink/15',
    borderColor: 'border-pink-100',
    btnColor: 'bg-brand-pink hover:bg-brand-pink-hover',
    iconColor: 'text-brand-pink'
  },
  {
    id: 2,
    title: 'Buy 1 Get 1 Free',
    subtitle: 'On all premium Gel Pens and Highlighters this weekend only.',
    image: 'https://images.unsplash.com/photo-1520698710313-2d5d831518f8?w=400&auto=format&fit=crop&q=80',
    color: 'from-amber-50 via-yellow-50 to-brand-yellow/30',
    borderColor: 'border-amber-100',
    btnColor: 'bg-brand-yellow hover:bg-brand-yellow-hover text-brand-teal-dark',
    iconColor: 'text-brand-teal-dark'
  },
  {
    id: 3,
    title: 'Flat 50% Off',
    subtitle: 'Clearance sale on last year planners and organizers.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&auto=format&fit=crop&q=80',
    color: 'from-purple-50 via-fuchsia-50 to-purple-200/50',
    borderColor: 'border-purple-100',
    btnColor: 'bg-purple-500 hover:bg-purple-600',
    iconColor: 'text-purple-600'
  }
];

const NEW_ARRIVALS = [
  {
    id: 1,
    title: 'Fresh Items, Endless Inspiration',
    subtitle: 'Explore our latest study collection crafted for your desk.',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400&auto=format&fit=crop&q=80',
    color: 'from-teal-50/70 via-cyan-50/30 to-brand-teal/10',
    borderColor: 'border-teal-100',
    btnColor: 'bg-brand-teal hover:bg-brand-teal-light'
  },
  {
    id: 2,
    title: 'Eco-Friendly Notebooks',
    subtitle: 'Sustainable, recycled paper for the eco-conscious student.',
    image: 'https://images.unsplash.com/photo-1531346878377-22d7a26be70e?w=400&auto=format&fit=crop&q=80',
    color: 'from-green-50 via-emerald-50 to-emerald-200/40',
    borderColor: 'border-emerald-100',
    btnColor: 'bg-emerald-600 hover:bg-emerald-700'
  },
  {
    id: 3,
    title: 'Premium Art Supplies',
    subtitle: 'Professional grade sketchbooks and colors now available.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop&q=80',
    color: 'from-blue-50 via-indigo-50 to-indigo-200/40',
    borderColor: 'border-blue-100',
    btnColor: 'bg-indigo-500 hover:bg-indigo-600'
  }
];

export default function PromoBanners({ onNavigate }) {
  const [offerIndex, setOfferIndex] = useState(0);
  const [arrivalIndex, setArrivalIndex] = useState(0);

  const handleOffersClick = () => {
    if (onNavigate) {
      onNavigate('offers');
    }
  };

  const handleNewArrivalsClick = () => {
    if (onNavigate) {
      onNavigate('new-arrivals');
    }
  };

  useEffect(() => {
    const offerTimer = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % LIMITED_TIME_OFFERS.length);
    }, 4000); // Autoscroll every 4s

    const arrivalTimer = setInterval(() => {
      setArrivalIndex((prev) => (prev + 1) % NEW_ARRIVALS.length);
    }, 4500); // Autoscroll every 4.5s (slightly offset)

    return () => {
      clearInterval(offerTimer);
      clearInterval(arrivalTimer);
    };
  }, []);

  const offer = LIMITED_TIME_OFFERS[offerIndex];
  const arrival = NEW_ARRIVALS[arrivalIndex];

  return (
    <section className="py-14 bg-white border-b border-gray-100" id="promotions">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Banner 1: Limited Time Offer Carousel */}
          <div className={`md:col-span-5 rounded-2xl p-5 sm:p-6 md:p-8 bg-gradient-to-br ${offer.color} border ${offer.borderColor} flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-all duration-500`}>
            <div className="flex flex-col items-start space-y-2 w-full sm:w-auto">
              <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider ${offer.iconColor}`}>
                <Tag size={12} />
                LIMITED TIME OFFER
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight transition-opacity duration-300">
                {offer.title}
              </h3>
              <p className="text-xs text-gray-700 pb-1 sm:pb-2 transition-opacity duration-300">
                {offer.subtitle}
              </p>
              <button
                className={`inline-flex items-center gap-2 text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-lg shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer ${offer.btnColor}`}
                onClick={handleOffersClick}
              >
                <span>SHOP THE DEALS</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="w-full sm:w-40 md:w-44 h-32 sm:h-32 shrink-0 rounded-xl overflow-hidden shadow-xs bg-white relative">
              {LIMITED_TIME_OFFERS.map((item, idx) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${idx === offerIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  loading="lazy"
                />
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 hidden">
              {LIMITED_TIME_OFFERS.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full ${idx === offerIndex ? 'bg-gray-800' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>

          {/* Banner 2: New Arrivals Carousel */}
          <div className={`md:col-span-7 rounded-2xl p-5 sm:p-6 md:p-8 bg-gradient-to-br ${arrival.color} border ${arrival.borderColor} flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-sm hover:shadow-md transition-all duration-500`}>
            <div className="flex flex-col items-start space-y-2 w-full sm:w-auto">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase text-brand-teal tracking-wider">
                <Sparkles size={12} />
                NEW ARRIVALS
              </span>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-teal leading-tight transition-opacity duration-300">
                {arrival.title}
              </h3>
              <p className="text-xs text-gray-700 pb-1 sm:pb-2 transition-opacity duration-300">
                {arrival.subtitle}
              </p>
              <button
                className={`inline-flex items-center gap-2 text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-lg shadow-xs transition-all transform hover:-translate-y-0.5 cursor-pointer ${arrival.btnColor}`}
                onClick={handleNewArrivalsClick}
              >
                <span>DISCOVER NOW</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="w-full sm:w-40 md:w-44 h-32 sm:h-32 shrink-0 rounded-xl overflow-hidden shadow-xs bg-white relative">
              {NEW_ARRIVALS.map((item, idx) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${idx === arrivalIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
