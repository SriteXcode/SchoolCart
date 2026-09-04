import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Search,
  RotateCcw,
  Sparkles,
  ArrowUp,
  Loader2,
  ChevronDown,
  X
} from 'lucide-react';
import { ALL_PRODUCTS, CATEGORIES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import ProductCard from '../Products/ProductCard';

const CHUNK_SIZE = 8;

export default function AllProductsPage({
  onNavigate,
  initialCategory = null,
  searchQuery: externalSearchQuery = '',
  onSearchChange: externalOnSearchChange = null
}) {
  const { wishlist } = useCart();
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [internalSearchQuery, setInternalSearchQuery] = useState(externalSearchQuery);
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under250', '250to500', 'above500'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'discount'
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [isLoadingChunk, setIsLoadingChunk] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sentinelRef = useRef(null);

  // Sync external search query from navbar if changed
  useEffect(() => {
    setInternalSearchQuery(externalSearchQuery);
  }, [externalSearchQuery]);

  const activeSearchQuery = externalOnSearchChange ? externalSearchQuery : internalSearchQuery;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;

      // Search match (name, subtitle, category keywords)
      const query = activeSearchQuery.toLowerCase().trim();
      const matchesSearch = query
        ? product.name.toLowerCase().includes(query) ||
          product.subtitle.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        : true;

      // Price match
      let matchesPrice = true;
      if (priceFilter === 'under250') matchesPrice = product.price < 250;
      else if (priceFilter === '250to500') matchesPrice = product.price >= 250 && product.price <= 500;
      else if (priceFilter === 'above500') matchesPrice = product.price > 500;

      // Wishlist / Liked match
      const matchesWishlist = onlyLiked
        ? wishlist.some((id) => Number(id) === Number(product.id))
        : true;

      return matchesCategory && matchesSearch && matchesPrice && matchesWishlist;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      }
      return 0; // 'featured' keeps default
    });
  }, [selectedCategory, activeSearchQuery, priceFilter, sortBy, onlyLiked, wishlist]);

  // Load next chunk callback
  const loadNextChunk = useCallback(() => {
    if (visibleCount >= filteredProducts.length || isLoadingChunk) return;
    setIsLoadingChunk(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, filteredProducts.length));
      setIsLoadingChunk(false);
    }, 450);
  }, [visibleCount, filteredProducts.length, isLoadingChunk]);

  // Automatic Infinite Scroll Observer (Always Active)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleCount < filteredProducts.length && !isLoadingChunk) {
          loadNextChunk();
        }
      },
      { rootMargin: '250px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length, isLoadingChunk, loadNextChunk]);

  // Reset filter helpers
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setVisibleCount(CHUNK_SIZE);
  };

  const handleSearchInput = (val) => {
    if (externalOnSearchChange) {
      externalOnSearchChange(val);
    } else {
      setInternalSearchQuery(val);
    }
    setVisibleCount(CHUNK_SIZE);
  };

  const handlePriceChange = (val) => {
    setPriceFilter(val);
    setVisibleCount(CHUNK_SIZE);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setVisibleCount(CHUNK_SIZE);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setOnlyLiked(false);
    if (externalOnSearchChange) {
      externalOnSearchChange('');
    } else {
      setInternalSearchQuery('');
    }
    setPriceFilter('all');
    setSortBy('featured');
    setVisibleCount(CHUNK_SIZE);
  };

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="bg-gray-50/60 min-h-screen pb-20">
      {/* Breadcrumb & Header Banner */}
      <div className="bg-brand-teal text-white py-10 px-4 border-b border-white/10 relative overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-3">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-brand-yellow transition-colors font-medium cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-white font-semibold">All Products</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-brand-yellow capitalize">{selectedCategory}</span>
              </>
            )}
            {onlyLiked && (
              <>
                <span>/</span>
                <span className="text-brand-pink font-semibold">Liked Items</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-brand-yellow text-xs font-extrabold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full mb-2">
                <Sparkles size={12} />
                FULL STATIONERY CATALOG
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                All Products & Study Supplies
              </h1>
              <p className="text-sm text-white/70 mt-1 max-w-xl">
                Browse our complete collection of premium notebooks, pens, art sets, and school desk tools.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-xs font-semibold text-white/90 border border-white/15 shrink-0 self-start md:self-end">
              Showing <span className="text-brand-yellow font-extrabold">{displayedProducts.length}</span> of{' '}
              <span className="text-brand-yellow font-extrabold">{filteredProducts.length}</span> items
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="sticky top-[76px] z-30 bg-white border-b border-gray-200 shadow-xs py-3.5 px-4">
        <div className="container mx-auto space-y-3">
          {/* Top Row: Search, Price filter, Sort, Infinite switch */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products by title, category, keywords..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-9 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10 transition-all"
                value={activeSearchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
              />
              {activeSearchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchInput('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full cursor-pointer"
                  aria-label="Clear Search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Controls Row */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Price Filter */}
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-brand-teal rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-brand-teal cursor-pointer"
                  value={priceFilter}
                  onChange={(e) => handlePriceChange(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="under250">Under ₹250</option>
                  <option value="250to500">₹250 - ₹500</option>
                  <option value="above500">Above ₹500</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  className="appearance-none bg-gray-50 border border-gray-200 text-xs font-semibold text-brand-teal rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-brand-teal cursor-pointer"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Reset Filters button */}
              {(selectedCategory || onlyLiked || activeSearchQuery || priceFilter !== 'all' || sortBy !== 'featured') && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-brand-pink hover:text-brand-pink-hover font-bold px-2 py-1 cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Bottom Row: Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => {
                handleCategorySelect(null);
                setOnlyLiked(false);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === null && !onlyLiked
                  ? 'bg-brand-teal text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Items ({ALL_PRODUCTS.length})
            </button>

            {/* Quick Liked Items Filter Pill */}
            <button
              onClick={() => {
                setOnlyLiked(!onlyLiked);
                setVisibleCount(CHUNK_SIZE);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                onlyLiked
                  ? 'bg-brand-pink text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Filter catalog by liked items"
            >
              <span>❤️ Liked</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  onlyLiked ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {wishlist.length}
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = ALL_PRODUCTS.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(isSelected ? null : cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-yellow text-brand-teal-dark shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Grid Content */}
      <div className="container mx-auto px-4 mt-8">
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Loading Skeletons when fetching next chunk */}
            {isLoadingChunk && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-4 sm:mt-6">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-pulse">
                    <div className="w-full aspect-square bg-gray-200 rounded-lg sm:rounded-xl mb-3 sm:mb-4" />
                    <div className="h-3.5 sm:h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-2.5 sm:h-3 bg-gray-100 rounded w-1/2 mb-3 sm:mb-4" />
                    <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/3" />
                  </div>
                ))}
              </div>
            )}

            {/* Infinite Scroll Sentinel Div */}
            <div ref={sentinelRef} className="h-10 w-full" />

            {/* Bottom Actions: Auto-Loading Status or Finished Banner */}
            <div className="mt-8 flex flex-col items-center justify-center text-center">
              {hasMore ? (
                isLoadingChunk ? (
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 py-3">
                    <Loader2 size={16} className="animate-spin text-brand-teal" />
                    <span>Loading more stationery supplies...</span>
                  </div>
                ) : null
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs max-w-md w-full">
                  <span className="text-2xl block mb-1">🎉</span>
                  <h4 className="font-bold text-brand-teal text-sm mb-3">
                    You've Reached The End of the Catalog!
                  </h4>
                  <button
                    onClick={scrollToTop}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal hover:text-brand-pink transition-colors cursor-pointer"
                  >
                    <ArrowUp size={14} />
                    <span>Back to Top</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300 max-w-lg mx-auto p-8 shadow-xs">
            <span className="text-3xl block mb-2">{onlyLiked ? '❤️' : '🔍'}</span>
            <h3 className="font-display font-extrabold text-lg text-brand-teal">
              {onlyLiked ? 'No Liked Items Found' : 'No Products Found'}
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              {onlyLiked
                ? "You haven't added any products to your wishlist matching this criteria yet. Tap the heart button on any item to save it!"
                : `We couldn't find any products matching ${activeSearchQuery ? `"${activeSearchQuery}"` : 'your active filters'}. Try searching for pens, notebooks, bottles, or clear filters.`}
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-brand-teal hover:bg-brand-teal-light text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              {onlyLiked ? 'Show All Products' : 'Reset All Filters'}
            </button>
          </div>
        )}
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-brand-teal text-brand-yellow shadow-xl hover:bg-brand-teal-light hover:scale-110 flex items-center justify-center transition-all border border-brand-yellow/30 cursor-pointer"
          title="Scroll Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
