import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingCart, User, Menu, X, ChevronDown, LogOut, LogIn, UserPlus, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { NAV_LINKS } from '../../data/mockData';

function DesktopProfileDropdown({
  isAuthenticated,
  userProfile,
  currentPage,
  onNavigate,
  onClose,
  logout,
  wishlistCount,
  onMouseEnter,
  onMouseLeave
}) {
  return (
    <div
      className="absolute top-full right-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 space-y-2 text-left">
      {isAuthenticated ? (
        <div className="space-y-2">
          {/* User Profile Header */}
          <div className="flex items-center gap-2.5 px-3 py-2 bg-brand-teal/5 border border-brand-teal/10 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-extrabold text-xs shrink-0">
              {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 truncate">
                {userProfile?.name || 'Ritesh Yadav'}
              </p>
              <p className="text-[10px] text-gray-500 truncate">
                {userProfile?.email || 'Verified Student'}
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-0.5 pt-1">
            <button
              onClick={() => {
                onNavigate('profile', null, 'profile');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                currentPage === 'profile'
                  ? 'bg-brand-teal text-white'
                  : 'text-gray-700 hover:bg-brand-teal/5 hover:text-brand-teal'
              }`}
            >
              <span className="flex items-center gap-2">
                <User size={15} />
                <span>My Profile</span>
              </span>
              <ChevronDown size={13} className="-rotate-90 text-gray-400" />
            </button>

            <button
              onClick={() => {
                onNavigate('profile', null, 'orders');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-brand-teal/5 hover:text-brand-teal transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Package size={15} />
                <span>Order History</span>
              </span>
              <ChevronDown size={13} className="-rotate-90 text-gray-400" />
            </button>

            <button
              onClick={() => {
                onNavigate('profile', null, 'wishlist');
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-brand-teal/5 hover:text-brand-teal transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Heart size={15} />
                <span>Liked Items ({wishlistCount})</span>
              </span>
              <ChevronDown size={13} className="-rotate-90 text-gray-400" />
            </button>
          </div>

          {/* Logout Button inside Profile for lg devices */}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                logout();
                if (currentPage === 'profile') {
                  onNavigate('home');
                }
                onClose();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      ) : null}
      </div>
    </div>
  );
}

export default function Navbar({ currentPage, onNavigate }) {
  const {
    totalItemsCount,
    wishlist,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    isAuthenticated,
    openAuthModal,
    logout,
    userProfile
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [actionProfileOpen, setActionProfileOpen] = useState(false);
  const actionProfileRef = useRef(null);
  const profileTimerRef = useRef(null);
  const [activeHomeSection, setActiveHomeSection] = useState('home'); // 'home' | 'categories' | 'bestsellers'

  const handleActionProfileEnter = () => {
    if (profileTimerRef.current) {
      clearTimeout(profileTimerRef.current);
      profileTimerRef.current = null;
    }
    setActionProfileOpen(true);
  };

  const handleActionProfileLeave = () => {
    if (profileTimerRef.current) {
      clearTimeout(profileTimerRef.current);
    }
    profileTimerRef.current = setTimeout(() => {
      setActionProfileOpen(false);
    }, 250);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (actionProfileRef.current && !actionProfileRef.current.contains(e.target)) {
        if (profileTimerRef.current) {
          clearTimeout(profileTimerRef.current);
          profileTimerRef.current = null;
        }
        setActionProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (profileTimerRef.current) {
        clearTimeout(profileTimerRef.current);
      }
    };
  }, []);

  // Track active section on home page (ScrollSpy for Home, Categories, Best Sellers)
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const categoriesEl = document.getElementById('categories');
      const bestsellersEl = document.getElementById('bestsellers');

      if (!categoriesEl || !bestsellersEl) return;

      const catRect = categoriesEl.getBoundingClientRect();
      const bestRect = bestsellersEl.getBoundingClientRect();
      const triggerY = 140; // below 76px sticky header + offset

      if (catRect.top > triggerY) {
        setActiveHomeSection('home');
      } else if (catRect.top <= triggerY && bestRect.top > triggerY) {
        setActiveHomeSection('categories');
      } else if (bestRect.top <= triggerY) {
        setActiveHomeSection('bestsellers');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  const handleLinkClick = (view, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (view === 'categories') {
      setActiveHomeSection('categories');
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('categories');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (view === 'bestsellers') {
      setActiveHomeSection('bestsellers');
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById('bestsellers');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('bestsellers');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (view === 'home') {
      setActiveHomeSection('home');
      if (currentPage !== 'home') {
        onNavigate('home');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    onNavigate(view);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/80 shadow-xs transition-all">
      <div className="container mx-auto px-4 flex items-center justify-between h-[76px] gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActiveHomeSection('home');
            onNavigate('home');
          }}
          className="flex items-center text-left cursor-pointer group focus:outline-none"
          aria-label="School Cart Home"
        >
          <img
            src="/logo.png"
            alt="School Cart"
            className="h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link, idx) => {
            const isActive =
              currentPage === 'home'
                ? link.view === activeHomeSection
                : link.view === currentPage;

            return (
              <button
                key={idx}
                onClick={(e) => handleLinkClick(link.view, e)}
                className={`text-sm font-semibold text-gray-600 hover:text-brand-teal transition-colors inline-flex items-center gap-1 py-1 relative cursor-pointer ${
                  isActive ? 'text-brand-teal font-bold' : ''
                }`}
              >
                {link.label}
                {link.view === 'categories' && (
                  <ChevronDown
                    size={14}
                    className={isActive ? 'text-brand-teal' : 'text-gray-400'}
                  />
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-yellow rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Wishlist, User, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Button */}
          {isAuthenticated && (
            <button
              className={`relative p-2 rounded-full transition-all duration-200 active:scale-75 cursor-pointer ${
                isWishlistOpen
                  ? 'text-brand-pink bg-pink-50 ring-2 ring-brand-pink/20 shadow-xs'
                  : 'text-brand-teal hover:bg-brand-teal/5'
              }`}
              title={`My Liked Items (${wishlist.length})`}
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Open Wishlist Drawer"
            >
              <Heart
                size={20}
                fill={wishlist.length > 0 ? 'currentColor' : 'none'}
                className={wishlist.length > 0 ? 'text-brand-pink' : ''}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-brand-pink text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>
          )}

          {/* User Account / Profile Actions (Desktop Only) */}
          {isAuthenticated ? (
            <div
              className="hidden lg:flex items-center gap-1 relative"
              ref={actionProfileRef}
              onMouseEnter={handleActionProfileEnter}
              onMouseLeave={handleActionProfileLeave}
            >
              <button
                className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                  currentPage === 'profile'
                    ? 'text-white bg-brand-teal shadow-xs'
                    : 'text-brand-teal hover:bg-brand-teal/5'
                }`}
                title={`Account: ${userProfile?.name || 'My Profile'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (profileTimerRef.current) {
                    clearTimeout(profileTimerRef.current);
                    profileTimerRef.current = null;
                  }
                  setActionProfileOpen((prev) => !prev);
                }}
                aria-label="My Profile & Account"
                aria-expanded={actionProfileOpen}
              >
                <User size={20} />
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
              </button>

              {actionProfileOpen && (
                <DesktopProfileDropdown
                  isAuthenticated={isAuthenticated}
                  userProfile={userProfile}
                  currentPage={currentPage}
                  onNavigate={onNavigate}
                  onClose={() => setActionProfileOpen(false)}
                  logout={logout}
                  wishlistCount={wishlist.length}
                  onMouseEnter={handleActionProfileEnter}
                  onMouseLeave={handleActionProfileLeave}
                />
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-1.5 ml-1">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 text-xs font-bold text-brand-teal hover:text-brand-teal-dark hover:bg-brand-teal/5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <LogIn size={15} />
                <span>Log In</span>
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-3.5 py-1.5 text-xs font-extrabold bg-brand-yellow hover:bg-brand-yellow-hover text-brand-teal-dark rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <UserPlus size={14} />
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Cart Icon with Live Count */}
          {isAuthenticated && (
            <button
              className="relative p-2 rounded-full text-brand-teal hover:bg-brand-teal/5 transition-colors cursor-pointer"
              title="Shopping Cart"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 bg-brand-yellow text-brand-teal-dark text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {totalItemsCount}
              </span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 rounded-full text-brand-teal hover:bg-brand-teal/5 lg:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((link, idx) => {
              const isMobileActive =
                currentPage === 'home'
                  ? link.view === activeHomeSection
                  : link.view === currentPage;

              return (
                <button
                  key={idx}
                  onClick={(e) => handleLinkClick(link.view, e)}
                  className={`text-left text-sm font-semibold py-1.5 cursor-pointer flex items-center justify-between ${
                    isMobileActive
                      ? 'text-brand-teal font-bold'
                      : 'text-gray-700 hover:text-brand-teal'
                  }`}
                >
                  <span className="relative pb-0.5">
                    {link.label}
                    {isMobileActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-yellow rounded-full" />
                    )}
                  </span>
                  {link.view === 'categories' && (
                    <ChevronDown size={14} className={`-rotate-90 ${isMobileActive ? 'text-brand-teal' : 'text-gray-400'}`} />
                  )}
                </button>
              );
            })}

            {/* Profile & Account Actions for Small Devices */}
            <div className="pt-3 mt-2 border-t border-gray-100 space-y-2">
              {isAuthenticated ? (
                <div className="space-y-2">
                  {/* Authenticated User Banner */}
                  <div className="flex items-center gap-2.5 px-3 py-2 bg-brand-teal/5 border border-brand-teal/10 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center font-extrabold text-xs shrink-0">
                      {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {userProfile?.name || 'Student Account'}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {userProfile?.email || userProfile?.phone || 'Logged In'}
                      </p>
                    </div>
                  </div>

                  {/* Profile Button */}
                  <button
                    onClick={() => {
                      onNavigate('profile', null, 'profile');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between text-left text-sm font-bold py-2 px-3 rounded-xl transition-colors cursor-pointer ${
                      currentPage === 'profile'
                        ? 'bg-brand-teal text-white shadow-xs'
                        : 'text-brand-teal hover:bg-brand-teal/5 bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <User size={18} />
                      <span>My Profile</span>
                    </span>
                    <ChevronDown size={14} className={`-rotate-90 ${currentPage === 'profile' ? 'text-white' : 'text-gray-400'}`} />
                  </button>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      logout();
                      if (currentPage === 'profile') {
                        onNavigate('home');
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 text-left text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 py-2 px-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Sign In & Register Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 text-center text-xs font-bold text-brand-teal border border-brand-teal/30 rounded-xl hover:bg-brand-teal/5 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogIn size={15} />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('register');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2 text-center text-xs font-extrabold bg-brand-yellow text-brand-teal-dark rounded-xl hover:bg-brand-yellow-hover flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <UserPlus size={15} />
                      <span>Register</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
