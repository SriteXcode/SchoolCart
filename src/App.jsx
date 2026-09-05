import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import TopAnnouncementBar from './components/Header/TopAnnouncementBar';
import Navbar from './components/Header/Navbar';
import HeroSection from './components/Hero/HeroSection';
import FeaturesBar from './components/Features/FeaturesBar';
import CategorySection from './components/Categories/CategorySection';
import HomeProductSections from './components/Products/HomeProductSections';
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
import AllCategoriesPage from './components/Pages/AllCategoriesPage';
import SellerRegistrationPage from './components/Pages/SellerRegistrationPage';
import SellerDashboardPage from './components/Pages/SellerDashboardPage';
import AuthModal from './components/Auth/AuthModal';
import ProductDetailPage from './components/Products/ProductDetailPage';
import ContactUsPage from './components/Pages/ContactUsPage';
import OffersPage from './components/Pages/OffersPage';
import NewArrivalsPage from './components/Pages/NewArrivalsPage';
import NotFoundPage from './components/Pages/NotFoundPage';

function MainStore() {
  const { isAuthenticated, openAuthModal, sellerStatus, selectedProduct } = useCart();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'products' | 'about' | 'profile' | 'checkout' | 'order-success' | 'seller-registration' | 'seller-dashboard' | 'product-detail'
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProfileTab, setActiveProfileTab] = useState('profile');

  // Navigate to product-detail page automatically if a product is selected
  React.useEffect(() => {
    if (selectedProduct && currentPage !== 'product-detail') {
      setCurrentPage('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  // If user is logged out, active storefront page falls back to home instead of profile
  const activePage = ((currentPage === 'profile' || currentPage === 'seller-registration' || currentPage === 'seller-dashboard') && !isAuthenticated) ? 'home' : currentPage;

  const navigateTo = (page, category = null, tab = 'profile') => {
    if ((page === 'profile' || page === 'seller-registration' || page === 'seller-dashboard') && !isAuthenticated) {
      openAuthModal('login');
      // If we clicked "become a seller" we want them to go to seller registration after login.
      // But for simplicity in this demo, if they click it while logged out, they will just log in.
      // We can handle redirect in the UI by them clicking the button again.
      return;
    }

    // Redirect logic for seller status
    if (page === 'seller-registration' && sellerStatus === 'approved') {
      setCurrentPage('seller-dashboard');
    } else {
      setCurrentPage(page);
    }

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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Storefront Views */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <HeroSection onNavigate={navigateTo} />

            <PromoBanners onNavigate={navigateTo} />
            <CategorySection
              activeCategory={activeCategory}
              onSelectCategory={(catId) => {
                navigateTo('products', catId);
              }}
              onNavigate={navigateTo}
            />

            <HomeProductSections
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onNavigate={navigateTo}
            />
            
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

        {activePage === 'product-detail' && (
          <ProductDetailPage onNavigate={navigateTo} />
        )}

        {activePage === 'about' && (
          <AboutUsPage onNavigate={navigateTo} />
        )}

        {activePage === 'contact' && (
          <ContactUsPage />
        )}

        {activePage === 'offers' && (
          <OffersPage onNavigate={navigateTo} />
        )}

        {activePage === 'new-arrivals' && (
          <NewArrivalsPage onNavigate={navigateTo} />
        )}

        {activePage === 'all-categories' && (
          <AllCategoriesPage onNavigate={navigateTo} />
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

        {activePage === 'seller-registration' && isAuthenticated && (
          <SellerRegistrationPage onNavigate={navigateTo} />
        )}

        {activePage === 'seller-dashboard' && isAuthenticated && sellerStatus === 'approved' && (
          <SellerDashboardPage onNavigate={navigateTo} />
        )}

        {/* 404 Fallback */}
        {![
          'home', 'products', 'product-detail', 'about', 'contact', 'offers', 'new-arrivals',
          'all-categories', 'profile', 'checkout', 'order-success', 'seller-registration', 'seller-dashboard'
        ].includes(activePage) && (
          <NotFoundPage onNavigate={navigateTo} />
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
