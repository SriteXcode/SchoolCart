import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import TopAnnouncementBar from './components/Header/TopAnnouncementBar';
import Navbar from './components/Header/Navbar';
import HeroSection from './components/Hero/HeroSection';
import FeaturesBar from './components/Features/FeaturesBar';
import CategorySection from './components/Categories/CategorySection';
import BestSellers from './components/Products/BestSellers';
import PromoBanners from './components/Promotions/PromoBanners';
import NewsletterSection from './components/Newsletter/NewsletterSection';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import WishlistDrawer from './components/Wishlist/WishlistDrawer';
import Toast from './components/Common/Toast';
import AllProductsPage from './components/Pages/AllProductsPage';
import AboutUsPage from './components/Pages/AboutUsPage';
import ProfilePage from './components/Pages/ProfilePage';
import CheckoutPage from './components/Pages/CheckoutPage';
import OrderSuccessPage from './components/Pages/OrderSuccessPage';
import AuthModal from './components/Auth/AuthModal';
import ProductDetailModal from './components/Products/ProductDetailModal';

function MainStore() {
  const { isAuthenticated, openAuthModal } = useCart();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'about' | 'profile' | 'checkout' | 'order-success'
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProfileTab, setActiveProfileTab] = useState('profile');

  // If user is logged out, active storefront page falls back to home instead of profile
  const activePage = (currentPage === 'profile' && !isAuthenticated) ? 'home' : currentPage;

  const navigateTo = (page, category = null, tab = 'profile') => {
    if (page === 'profile' && !isAuthenticated) {
      openAuthModal('login');
      return;
    }
    setCurrentPage(page);
    if (typeof category === 'string') {
      setActiveCategory(category);
    } else if (category && typeof category === 'object' && category.tab) {
      setActiveProfileTab(category.tab);
    }
    if (tab && typeof tab === 'string') {
      setActiveProfileTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-900 font-sans selection:bg-brand-yellow/30 selection:text-brand-teal">
      {/* Top Banner with announcements */}
      <TopAnnouncementBar />

      {/* Main sticky navigation */}
      <Navbar
        currentPage={activePage}
        onNavigate={navigateTo}
      />

      {/* Main Storefront Views */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <HeroSection onNavigate={navigateTo} />



            <CategorySection
              activeCategory={activeCategory}
              onSelectCategory={(catId) => {
                setActiveCategory(catId);
                const el = document.getElementById('bestsellers');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <BestSellers
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onViewAll={() => navigateTo('products')}
            />

            <PromoBanners />
            <FeaturesBar />


            <NewsletterSection />
          </>
        )}

        {activePage === 'products' && (
          <AllProductsPage
            onNavigate={navigateTo}
            initialCategory={activeCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {activePage === 'about' && (
          <AboutUsPage onNavigate={navigateTo} />
        )}

        {activePage === 'profile' && isAuthenticated && (
          <ProfilePage onNavigate={navigateTo} initialTab={activeProfileTab} />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage onNavigate={navigateTo} />
        )}

        {activePage === 'order-success' && (
          <OrderSuccessPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Interactive Cart Flyout Drawer */}
      <CartDrawer onNavigate={navigateTo} />

      {/* Interactive Wishlist Flyout Drawer */}
      <WishlistDrawer onNavigate={navigateTo} />

      {/* User Action Feedback Toast */}
      <Toast />

      {/* Global Authentication Modal (Login / Register) */}
      <AuthModal />

      {/* Interactive Product Details Modal & Reviews */}
      <ProductDetailModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainStore />
    </CartProvider>
  );
}
