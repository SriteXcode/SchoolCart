import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import { BEST_SELLERS, ALL_PRODUCTS } from '../../data/mockData';
import ProductCard from './ProductCard';

export default function BestSellers({ activeCategory, searchQuery, onViewAll }) {
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const [mobileVisibleCount, setMobileVisibleCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Desktop source products (prioritizes BEST_SELLERS or falls back to ALL_PRODUCTS for categories not in best sellers)
  const desktopSource = activeCategory && !BEST_SELLERS.some((p) => p.category === activeCategory)
    ? ALL_PRODUCTS
    : BEST_SELLERS;

  const filteredDesktopProducts = desktopSource.filter((product) => {
    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    const query = searchQuery ? searchQuery.toLowerCase().trim() : '';
    const matchesSearch = query
      ? product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      : true;
    return matchesCategory && matchesSearch;
  });

  // Mobile source products (from ALL_PRODUCTS which begins with all 8 best sellers followed by the rest of catalog)
  const filteredMobileProducts = ALL_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    const query = searchQuery ? searchQuery.toLowerCase().trim() : '';
    const matchesSearch = query
      ? product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      : true;
    return matchesCategory && matchesSearch;
  });

  // Track filter changes to reset pagination and mobile visible count cleanly
  const currentFilterKey = `${activeCategory || ''}_${searchQuery || ''}`;
  const [prevFilterKey, setPrevFilterKey] = useState(currentFilterKey);

  if (prevFilterKey !== currentFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setPage(0);
    setMobileVisibleCount(4);
  }

  const totalPages = Math.ceil(filteredDesktopProducts.length / pageSize) || 1;

  const handlePrev = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setMobileVisibleCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 200);
  };

  const displayedDesktopProducts = searchQuery
    ? filteredDesktopProducts
    : filteredDesktopProducts.slice(page * pageSize, (page + 1) * pageSize);

  const displayedMobileProducts = searchQuery
    ? filteredMobileProducts
    : filteredMobileProducts.slice(0, mobileVisibleCount);

  const hasMoreMobile = !searchQuery && mobileVisibleCount < filteredMobileProducts.length;

  return (
    <section className="py-14 bg-gray-50/70 border-b border-gray-100" id="bestsellers">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-wider uppercase text-brand-teal">
              BEST SELLERS
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              {searchQuery
                ? `Showing search results for "${searchQuery}" in best sellers`
                : activeCategory
                ? `Showing curated ${activeCategory} essentials`
                : 'Most loved stationery and study essentials by students and educators'}
            </p>
          </div>

          {/* Desktop Controls (hidden on small devices: VIEW ALL and slide buttons) */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => onViewAll && onViewAll()}
              className="text-xs font-bold text-brand-teal hover:text-brand-pink transition-colors inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer"
            >
              <span>VIEW ALL</span>
              <ArrowRight size={14} />
            </button>

            {!searchQuery && filteredDesktopProducts.length > pageSize && (
              <div className="flex items-center gap-1.5">
                <button
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 text-brand-teal flex items-center justify-center hover:bg-brand-teal hover:text-white transition-colors cursor-pointer"
                  onClick={handlePrev}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 text-brand-teal flex items-center justify-center hover:bg-brand-teal hover:text-white transition-colors cursor-pointer"
                  onClick={handleNext}
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Product Cards Grid (hidden on small devices < sm) */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedDesktopProducts.length > 0 ? (
            displayedDesktopProducts.map((product) => (
              <ProductCard key={`desk-${product.id}`} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300 p-6">
              <p className="text-gray-600 text-sm mb-3">
                No best sellers found matching "{searchQuery || activeCategory}".
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-teal-dark text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-xs cursor-pointer"
                  onClick={() => onViewAll && onViewAll()}
                >
                  Search Full 32+ Product Catalog →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Product Cards Grid (visible ONLY on small devices < sm) */}
        <div className="grid sm:hidden grid-cols-2 gap-3">
          {displayedMobileProducts.length > 0 ? (
            displayedMobileProducts.map((product) => (
              <ProductCard key={`mob-${product.id}`} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-gray-300 p-6">
              <p className="text-gray-600 text-sm mb-3">
                No best sellers found matching "{searchQuery || activeCategory}".
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-teal-dark text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-xs cursor-pointer"
                  onClick={() => onViewAll && onViewAll()}
                >
                  Search Full 32+ Product Catalog →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Load More Button Section (visible ONLY on small devices < sm) */}
        {!searchQuery && displayedMobileProducts.length > 0 && hasMoreMobile && (
          <div className="sm:hidden mt-6 flex flex-col items-center justify-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="w-full max-w-xs py-3 px-6 bg-white hover:bg-brand-yellow/15 active:bg-brand-yellow/30 text-brand-teal border-2 border-brand-teal/20 hover:border-brand-teal font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              aria-label="Load More Products"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 size={16} className="animate-spin text-brand-teal" />
                  <span>Loading Essentials...</span>
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="text-brand-teal animate-bounce" />
                  <span>Load More ({mobileVisibleCount} of {filteredMobileProducts.length})</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
