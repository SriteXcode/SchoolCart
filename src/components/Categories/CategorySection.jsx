import React, { useRef } from 'react';
import { CATEGORIES } from '../../data/mockData';

export default function CategorySection({ activeCategory, onSelectCategory }) {
  const scrollContainerRef = useRef(null);

  return (
    <section className="py-10 md:py-14 bg-white border-b border-gray-100 overflow-hidden" id="categories">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider uppercase text-brand-teal inline-block relative pb-2">
            SHOP BY CATEGORY
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-brand-yellow rounded-full" />
          </h2>
        </div>

        {/* Categories: Horizontal X-Axis Scrollable on mobile / Grid on desktop */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap md:grid md:grid-cols-7 gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x snap-mandatory touch-pan-x"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`flex flex-col items-center text-center p-2 rounded-xl transition-all transform hover:-translate-y-1 group shrink-0 min-w-[100px] sm:min-w-[110px] md:min-w-0 snap-center cursor-pointer ${
                    isSelected ? 'scale-105' : ''
                  }`}
                  onClick={() => onSelectCategory(cat.id === activeCategory ? null : cat.id)}
                >
                  {/* Avatar */}
                  <div
                    className={`w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full overflow-hidden mb-2.5 border-2 transition-all p-1 bg-gray-50 shadow-xs ${
                      isSelected
                        ? 'border-brand-teal ring-4 ring-brand-yellow'
                        : 'border-gray-200 group-hover:border-brand-yellow group-hover:shadow-md'
                    }`}
                  >
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Text */}
                  <span className="text-[11px] sm:text-xs font-extrabold tracking-wider text-brand-teal uppercase mb-0.5 group-hover:text-brand-pink transition-colors whitespace-nowrap">
                    {cat.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 group-hover:text-brand-teal group-hover:underline">
                    {isSelected ? 'Viewing Items' : 'Shop Now'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
