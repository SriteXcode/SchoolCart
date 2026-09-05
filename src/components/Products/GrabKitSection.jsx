import React, { useState, useEffect, useRef } from 'react';
import { Search, School, GraduationCap, ArrowRight, Package, ChevronDown, Check, ShoppingCart } from 'lucide-react';
import { KIT_BUNDLES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

export default function GrabKitSection({ onNavigate }) {
  const { addToCart, openProductDetails } = useCart();
  const [schoolQuery, setSchoolQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [hasSearched, setHasSearched] = useState(true);
  const [expandedKitId, setExpandedKitId] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedSchool = localStorage.getItem('grabKitSchool');
    const savedClass = localStorage.getItem('grabKitClass');
    if (savedSchool) setSchoolQuery(savedSchool);
    if (savedClass) setSelectedClass(savedClass);
  }, []);

  useEffect(() => {
    localStorage.setItem('grabKitSchool', schoolQuery);
    localStorage.setItem('grabKitClass', selectedClass);
  }, [schoolQuery, selectedClass]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSchoolDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const availableSchools = [...new Set(KIT_BUNDLES.map((kit) => kit.school))].sort();
  const availableClasses = [...new Set(KIT_BUNDLES.map((kit) => kit.className))].sort();

  const filteredSchools = availableSchools.filter((s) =>
    s.toLowerCase().includes(schoolQuery.toLowerCase())
  );

  const results = KIT_BUNDLES.filter((kit) => {
    const query = schoolQuery.toLowerCase();
    const matchSchool = schoolQuery === '' || kit.school.toLowerCase().includes(query) || kit.name.toLowerCase().includes(query) || kit.subtitle.toLowerCase().includes(query);
    const matchClass = selectedClass === 'all' || kit.className === selectedClass;
    return matchSchool && matchClass;
  });

  const toggleItem = (kitId, itemId) => {
    setSelectedItems((prev) => {
      const current = prev[kitId] || [];
      const next = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];
      return { ...prev, [kitId]: next };
    });
  };

  const handleAddSelected = (kit) => {
    const selectedIds = selectedItems[kit.id] || [];
    const selectedProducts = kit.kitItems.filter((item) => selectedIds.includes(item.id));
    const bundleItems = selectedProducts.length ? selectedProducts : kit.kitItems;
    const bundlePrice = selectedProducts.length
      ? selectedProducts.reduce((sum, item) => sum + item.price, 0)
      : kit.price;

    addToCart({
      ...kit,
      id: selectedProducts.length ? `kit-${kit.id}-${selectedIds.slice().sort((a, b) => a - b).join('-')}` : kit.id,
      name: selectedProducts.length ? `${kit.name} (Custom Bundle)` : `${kit.name} (Full Bundle)`,
      price: bundlePrice,
      kitItems: bundleItems,
      bundleType: 'kit'
    }, 1);
  };

  const handleBuyFullKit = (kit) => {
    addToCart({ ...kit, image: kit.image, category: 'kits', bundleType: 'kit' }, 1);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-brand-teal/5 via-brand-teal/10 to-brand-yellow/10 border-b border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-brand-teal mb-3 flex items-center justify-center gap-2">
            <Package className="text-brand-yellow" size={28} />
            Grab Your School Kit
          </h2>
          <p className="text-sm text-gray-600">
            Choose a complete combo kit or build your own set from the best student essentials in one bundle.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full flex-1 relative" ref={dropdownRef}>
            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search kit category or bundle name..."
              value={schoolQuery}
              onFocus={() => setShowSchoolDropdown(true)}
              onChange={(e) => {
                setSchoolQuery(e.target.value);
                setShowSchoolDropdown(true);
              }}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all"
            />
            {showSchoolDropdown && filteredSchools.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto py-2">
                {filteredSchools.map((school, i) => (
                  <button
                    key={i}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-brand-teal/5 hover:text-brand-teal transition-colors"
                    onClick={() => {
                      setSchoolQuery(school);
                      setShowSchoolDropdown(false);
                    }}
                  >
                    {school}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-64 relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal transition-all appearance-none cursor-pointer"
            >
              <option value="all">Any Bundle</option>
              {availableClasses.map((cls, i) => (
                <option key={i} value={cls}>{cls}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          <button
            onClick={() => {
              setHasSearched(true);
              setShowSchoolDropdown(false);
            }}
            className="w-full md:w-auto bg-brand-teal hover:bg-brand-teal-light text-white font-bold px-8 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Search size={16} />
            <span>Find Kits</span>
          </button>
        </div>

        {hasSearched && (
          <div className="max-w-6xl mx-auto animate-fadeIn">
            <h3 className="font-display font-bold text-gray-800 mb-4 flex items-center gap-2">
              Found {results.length} Kit{results.length !== 1 ? 's' : ''}
            </h3>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {results.map((kit) => {
                  const selectedIds = selectedItems[kit.id] || [];
                  const subtotal = kit.kitItems
                    .filter((item) => selectedIds.includes(item.id))
                    .reduce((sum, item) => sum + item.price, 0);

                  return (
                    <div
                      key={kit.id}
                      onClick={() => openProductDetails(kit)}
                      className={`bg-white border rounded-xl sm:rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group cursor-pointer ${
                        expandedKitId === kit.id
                          ? 'relative z-10 md:scale-[1.02] border-brand-teal/30 shadow-md ring-1 ring-brand-teal/10'
                          : 'border-gray-200 hover:shadow-xl hover:border-brand-teal/20'
                      }`}
                    >
                      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
                        <span className="absolute top-2 left-2 z-10 text-[9px] sm:text-[10px] font-extrabold tracking-wider px-2 py-1 rounded uppercase bg-brand-ochre text-white shadow-xs">
                          {kit.discountBadge}
                        </span>
                        <img
                          src={kit.image}
                          alt={kit.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/gel-pen-set.jpg';
                          }}
                        />
                      </div>

                      <div className="p-3 sm:p-4 flex flex-col flex-grow min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-extrabold text-brand-teal uppercase truncate min-w-0">{kit.school}</span>
                          <span className="text-[10px] font-bold text-brand-pink whitespace-nowrap">{kit.className}</span>
                        </div>
                        <h4 className="text-sm font-bold text-brand-teal line-clamp-2 leading-snug min-h-[2.5rem]">{kit.name}</h4>
                        <p className="text-[10px] text-gray-500 line-clamp-3 mt-1 min-h-[2.75rem] break-words">{kit.subtitle}</p>
                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-base font-extrabold text-brand-teal">₹{kit.price}</span>
                          <span className="text-xs text-gray-400 line-through">₹{kit.originalPrice}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleBuyFullKit(kit);
                            }}
                            className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-teal-dark font-extrabold px-2 py-2 rounded-lg text-[11px] transition-all cursor-pointer"
                          >
                            Buy Full Kit
                          </button>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setExpandedKitId(expandedKitId === kit.id ? null : kit.id);
                            }}
                            className="border border-brand-teal/30 text-brand-teal hover:bg-brand-teal/5 font-bold px-2 py-2 rounded-lg text-[11px] transition-all cursor-pointer"
                          >
                            {expandedKitId === kit.id ? 'Hide Items' : 'Customize'}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openProductDetails(kit);
                          }}
                          className="w-full mt-2 border border-gray-200 text-gray-600 hover:border-brand-teal/30 hover:text-brand-teal font-bold px-2 py-2 rounded-lg text-[11px] transition-all cursor-pointer"
                        >
                          View Kit Details
                        </button>
                      </div>

                      {expandedKitId === kit.id && (
                        <div className="border-t border-gray-100 p-3 sm:p-5 bg-gray-50/50">
                          <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xs font-extrabold uppercase tracking-wider text-gray-600">Bundle items</h5>
                            <div className="text-[11px] font-bold text-brand-teal">
                              {selectedIds.length} selected • ₹{subtotal || kit.price}
                            </div>
                          </div>

                          <div className="space-y-2">
                            {kit.kitItems.map((item) => {
                              const isSelected = selectedIds.includes(item.id);
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    toggleItem(kit.id, item.id);
                                  }}
                                  className={`flex items-center justify-between w-full rounded-xl border p-3 text-left transition-all cursor-pointer ${
                                    isSelected
                                      ? 'border-brand-teal bg-brand-teal/5 shadow-xs'
                                      : 'border-gray-200 bg-white hover:border-brand-teal/30'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-brand-teal border-brand-teal text-white' : 'border-gray-300 bg-white'}`}>
                                      <Check size={12} />
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-gray-800 line-clamp-2 break-words min-w-0">{item.name}</p>
                                      <p className="text-[10px] text-gray-500">Add this item to your kit</p>
                                    </div>
                                  </div>
                                  <span className="text-xs font-extrabold text-brand-teal">₹{item.price}</span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="mt-5 flex flex-wrap gap-3 justify-end">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleAddSelected(kit);
                              }}
                              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-teal-light text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                            >
                              <ShoppingCart size={14} />
                              <span>Add Selected</span>
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleBuyFullKit(kit);
                              }}
                              className="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-teal-dark font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                            >
                              <ArrowRight size={14} />
                              <span>Buy Full Bundle</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
                <Package className="mx-auto text-gray-300 mb-3" size={40} />
                <p className="text-sm font-bold text-gray-600 mb-1">No kits found for your search.</p>
                <p className="text-xs text-gray-400">Try another bundle name or category filter.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
