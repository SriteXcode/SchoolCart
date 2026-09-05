import React, { useRef, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCarouselRow({ title, products, onViewAll, autoScroll = false, autoScrollInterval = 3000 }) {
  const scrollRef = useRef(null);
  const isHoveredRef = useRef(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320; // approximate width of one card + gap
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      let newLeft = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      // Infinite-like looping behavior if autoScroll is on and we hit the end
      if (direction === 'right' && autoScroll && newLeft + clientWidth >= scrollWidth) {
        newLeft = 0; // reset to beginning
      }
      
      scrollRef.current.scrollTo({
        left: newLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (!autoScroll) return;

    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        scroll('right');
      }
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [autoScroll, autoScrollInterval]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-10 bg-white border-b border-gray-100 last:border-b-0">
      <div 
        className="container mx-auto px-4"
        onMouseEnter={() => isHoveredRef.current = true}
        onMouseLeave={() => isHoveredRef.current = false}
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-xl md:text-2xl font-extrabold tracking-wider uppercase text-brand-teal">
            {title}
          </h2>
          

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 mr-4">
              <button
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <button
              onClick={() => onViewAll && onViewAll()}
              className="text-xs font-bold text-brand-teal hover:text-brand-pink transition-colors inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer bg-brand-teal/5 px-3 py-1.5 rounded-lg"
            >
              <span>VIEW ALL</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[300px] max-w-[320px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
