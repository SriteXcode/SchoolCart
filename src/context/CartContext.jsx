import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER_PROFILE, ALL_PRODUCTS } from '../data/mockData';

const INITIAL_MOCK_REVIEWS = {
  1: [
    {
      id: 101,
      name: 'Aanya Sharma',
      institution: 'IIT Delhi',
      rating: 5,
      date: '2 days ago',
      title: 'Best notebook for engineering math & note-taking!',
      comment: 'The 100 GSM paper has zero bleedthrough even with gel pens and mild highlighters. The spiral binding lays flat perfectly on lecture desks.',
      helpfulCount: 28
    },
    {
      id: 102,
      name: 'Rohan Verma',
      institution: "St. Stephen's College",
      rating: 5,
      date: '1 week ago',
      title: 'Smooth, durable cover & premium feel',
      comment: 'Been using this for my semester notes. The micro-perforated edges make tearing out summary sheets super clean without ripping.',
      helpfulCount: 15
    },
    {
      id: 103,
      name: 'Priya Nair',
      institution: 'DPS R.K. Puram',
      rating: 4,
      date: '2 weeks ago',
      title: 'Great quality, highly recommend for students',
      comment: 'Very aesthetic pastel look and great line spacing. Fits easily into my backpack.',
      helpfulCount: 9
    }
  ],
  2: [
    {
      id: 201,
      name: 'Arjun Mehta',
      institution: 'BITS Pilani',
      rating: 5,
      date: '3 days ago',
      title: 'Incredible ink flow! No smudging during rapid exams',
      comment: 'These 0.5mm gel pens write like butter. Fast drying ink means no blue smudges across my hand during long 3-hour exam sessions.',
      helpfulCount: 42
    },
    {
      id: 202,
      name: 'Kavya Iyer',
      institution: 'Miranda House',
      rating: 5,
      date: '2 weeks ago',
      title: 'Favorite pen set of the year',
      comment: 'The matte barrels are so comfortable to hold. 10 pens for ₹249 is an absolute steal for this quality.',
      helpfulCount: 19
    }
  ],
  3: [
    {
      id: 301,
      name: 'Sneha Patel',
      institution: 'National Law University',
      rating: 5,
      date: 'Yesterday',
      title: 'Soft pastel shades that do not bleed or distract',
      comment: 'Unlike neon highlighters that hurt your eyes, these pastel tones are calm, legible and do not soak through standard textbook pages.',
      helpfulCount: 34
    },
    {
      id: 302,
      name: 'Varun Rao',
      institution: 'Symbiosis Pune',
      rating: 4,
      date: '5 days ago',
      title: 'Great chisel tip for thin & thick highlighting',
      comment: 'Very versatile tip. Perfect for law case briefs and textbook margins.',
      helpfulCount: 11
    }
  ],
  4: [
    {
      id: 401,
      name: 'Meera Sen',
      institution: 'SRCC Delhi',
      rating: 5,
      date: '4 days ago',
      title: 'Keeps my study desk spotless and organized',
      comment: 'Has separate slots for pens, sticky notes, phone stand, and calculator. Extremely sturdy and looks beautiful on my desk.',
      helpfulCount: 22
    }
  ]
};

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Initialize from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_items_v2');
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          name: 'Minimal Spiral Notebook',
          subtitle: 'Ruled Pages • 160 Pages',
          price: 199,
          originalPrice: 299,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=80'
        },
        {
          id: 3,
          name: 'Pastel Highlighters Set',
          subtitle: 'Chisel Tip • 6 Colors',
          price: 189,
          originalPrice: 299,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?w=500&auto=format&fit=crop&q=80'
        }
      ];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_wishlist_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.map(Number) : [1, 3, 6];
      }
      return [1, 3, 6];
    } catch {
      return [1, 3, 6];
    }
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_user_profile');
      return saved ? JSON.parse(saved) : MOCK_USER_PROFILE;
    } catch {
      return MOCK_USER_PROFILE;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_is_authenticated');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Selected product for detailed modal view
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product reviews store
  const [productReviews, setProductReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_product_reviews');
      return saved ? JSON.parse(saved) : INITIAL_MOCK_REVIEWS;
    } catch {
      return INITIAL_MOCK_REVIEWS;
    }
  });

  // Most recently placed order (for Order Success Confirmation)
  const [lastPlacedOrder, setLastPlacedOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active coupon discount state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Seller states
  const [sellerStatus, setSellerStatus] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_seller_status');
      return saved ? JSON.parse(saved) : null; // null | 'pending' | 'approved'
    } catch {
      return null;
    }
  });

  const [sellerProfile, setSellerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('school_cart_seller_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('school_cart_seller_status', JSON.stringify(sellerStatus));
    } catch (e) {
      console.error(e);
    }
  }, [sellerStatus]);

  useEffect(() => {
    try {
      localStorage.setItem('school_cart_seller_profile', JSON.stringify(sellerProfile));
    } catch (e) {
      console.error(e);
    }
  }, [sellerProfile]);

  const submitSellerApplication = (data) => {
    setSellerProfile(data);
    setSellerStatus('pending');
    showToast('Seller application submitted successfully! 🚀');
  };

  const approveSellerApplication = () => {
    setSellerStatus('approved');
    showToast('🎉 Congratulations! You are now an approved seller.');
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('school_cart_items_v2', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('school_cart_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('school_cart_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('school_cart_is_authenticated', JSON.stringify(isAuthenticated));
    } catch (e) {
      console.error(e);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('school_cart_product_reviews', JSON.stringify(productReviews));
    } catch (e) {
      console.error(e);
    }
  }, [productReviews]);

  useEffect(() => {
    try {
      if (lastPlacedOrder) {
        localStorage.setItem('school_cart_last_order', JSON.stringify(lastPlacedOrder));
      }
    } catch (e) {
      console.error(e);
    }
  }, [lastPlacedOrder]);

  // Trigger temporary notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const addProductReview = (productId, newReview) => {
    const pId = Number(productId);
    const reviewItem = {
      id: Date.now(),
      date: 'Just now',
      helpfulCount: 0,
      ...newReview
    };

    setProductReviews((prev) => ({
      ...prev,
      [pId]: [reviewItem, ...(prev[pId] || [])]
    }));

    showToast('⭐ Thank you for your review! Your feedback helps fellow students.');
  };

  const addToCart = (product, quantity = 1) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      showToast('Please log in to add stationery to your cart! 🛍️');
      return false;
    }
    const qtyToAdd = typeof quantity === 'number' && quantity > 0 ? quantity : 1;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prev, { ...product, quantity: qtyToAdd }];
    });
    showToast(`Added ${qtyToAdd > 1 ? `${qtyToAdd}x ` : ''}"${product.name}" to your cart!`);
    return true;
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      showToast('Please log in to manage your cart! 🛍️');
      return;
    }
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (id) => {
    if (!isAuthenticated) {
      openAuthModal('login');
      showToast('Please log in to save items to your wishlist! ❤️');
      return false;
    }
    const numId = Number(id);
    setWishlist((prev) => {
      const exists = prev.some((item) => Number(item) === numId);
      if (exists) {
        showToast('Removed item from your wishlist');
        return prev.filter((item) => Number(item) !== numId);
      } else {
        showToast('Saved to your wishlist! ❤️');
        return [...prev, numId];
      }
    });
    return true;
  };

  const isWishlisted = (id) => {
    if (!isAuthenticated) return false;
    return wishlist.some((item) => Number(item) === Number(id));
  };

  const handleSetIsCartOpen = (open) => {
    if (typeof open === 'function') {
      setIsCartOpen((prev) => {
        const next = open(prev);
        if (next && !isAuthenticated) {
          openAuthModal('login');
          showToast('Please log in to access your cart! 🛍️');
          return false;
        }
        return next;
      });
      return;
    }
    if (open && !isAuthenticated) {
      openAuthModal('login');
      showToast('Please log in to access your cart! 🛍️');
      return;
    }
    setIsCartOpen(open);
  };

  const handleSetIsWishlistOpen = (open) => {
    if (typeof open === 'function') {
      setIsWishlistOpen((prev) => {
        const next = open(prev);
        if (next && !isAuthenticated) {
          openAuthModal('login');
          showToast('Please log in to view your liked items! ❤️');
          return false;
        }
        return next;
      });
      return;
    }
    if (open && !isAuthenticated) {
      openAuthModal('login');
      showToast('Please log in to view your liked items! ❤️');
      return;
    }
    setIsWishlistOpen(open);
  };

  const displayedCartItems = isAuthenticated ? cartItems : [];
  const displayedWishlist = isAuthenticated ? wishlist : [];

  const wishlistProducts = ALL_PRODUCTS.filter((product) =>
    displayedWishlist.some((id) => Number(id) === Number(product.id))
  );

  const updateProfile = (updatedData) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updatedData
    }));
    showToast('Profile updated successfully! ✨');
  };

  const addAddress = (newAddress) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          id: Date.now(),
          ...newAddress
        }
      ]
    }));
    showToast('New shipping address saved!');
  };

  const removeAddress = (addressId) => {
    setUserProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((addr) => addr.id !== addressId)
    }));
    showToast('Address removed');
  };

  const totalItemsCount = displayedCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = displayedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 499.00;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (userData = {}) => {
    setIsAuthenticated(true);
    if (userData && userData.email) {
      setUserProfile((prev) => ({
        ...prev,
        ...userData,
        name: userData.name || prev.name || 'Ritesh Yadav',
        email: userData.email || prev.email || 'ritesh.yadav@example.com'
      }));
    }
    closeAuthModal();
    showToast(`Welcome back, ${userData?.name || userProfile?.name || 'Student'}! ✨`);
  };

  const register = (newUserData = {}) => {
    const freshProfile = {
      ...MOCK_USER_PROFILE,
      ...newUserData,
      memberSince: 'September 2026',
      rewardPoints: 100,
      orders: []
    };
    setUserProfile(freshProfile);
    setIsAuthenticated(true);
    closeAuthModal();
    showToast(`🎉 Welcome to School Cart, ${newUserData.name}! Account created.`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out successfully. See you soon! 👋');
  };

  const applyCoupon = (codeRaw) => {
    const code = (codeRaw || '').trim().toUpperCase();
    if (!code) {
      showToast('Please enter a coupon code.');
      return { success: false, message: 'Please enter a coupon code.' };
    }

    if (code === 'SCHOOL10') {
      const coupon = {
        code: 'SCHOOL10',
        type: 'percent',
        value: 10,
        label: '10% Student Discount'
      };
      setAppliedCoupon(coupon);
      showToast('🎉 Coupon SCHOOL10 applied! 10% discount added.');
      return { success: true, message: '10% student discount applied!' };
    }

    if (code === 'STUDENT50') {
      if (subtotal < 399) {
        showToast('⚠️ STUDENT50 requires a minimum order of ₹399.');
        return { success: false, message: 'Minimum cart value of ₹399 required for STUDENT50.' };
      }
      const coupon = {
        code: 'STUDENT50',
        type: 'flat',
        value: 50,
        label: '₹50 Flat Student Discount'
      };
      setAppliedCoupon(coupon);
      showToast('🎉 Coupon STUDENT50 applied! ₹50 off.');
      return { success: true, message: '₹50 flat student discount applied!' };
    }

    if (code === 'FREESHIP') {
      const coupon = {
        code: 'FREESHIP',
        type: 'freeship',
        value: 0,
        label: '100% Free Shipping'
      };
      setAppliedCoupon(coupon);
      showToast('🚚 Coupon FREESHIP applied! Free delivery unlocked.');
      return { success: true, message: 'Free shipping applied!' };
    }

    showToast('❌ Invalid coupon code. Try SCHOOL10 or STUDENT50.');
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed.');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (orderData) => {
    const randomId = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomTracking = `BLUEDART-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newOrder = {
      id: randomId,
      date: formattedDate,
      status: 'Processing',
      statusColor: 'blue',
      trackingNumber: randomTracking,
      itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      items: [...cartItems],
      subtotal: orderData.subtotal,
      shippingCost: orderData.shippingCost,
      discount: orderData.discount || 0,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      deliverySpeed: orderData.deliverySpeed || 'Standard Delivery',
      estimatedDelivery: orderData.estimatedDelivery || '3-5 Business Days',
      appliedCoupon: appliedCoupon?.code || null
    };

    // Save order into user profile
    setUserProfile((prev) => {
      const updatedOrders = [newOrder, ...(prev?.orders || [])];
      return {
        ...prev,
        rewardPoints: (prev?.rewardPoints || 0) + 50,
        orders: updatedOrders
      };
    });

    setLastPlacedOrder(newOrder);
    setCartItems([]);
    setAppliedCoupon(null);
    showToast(`🎉 Order ${randomId} placed successfully! +50 Points earned.`);
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        wishlistProducts,
        isWishlisted,
        userProfile,
        updateProfile,
        addAddress,
        removeAddress,
        isCartOpen,
        isWishlistOpen,
        toastMessage,
        totalItemsCount,
        subtotal,
        freeShippingThreshold,
        freeShippingProgress,
        freeShippingRemaining,
        setIsCartOpen,
        setIsWishlistOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        showToast,
        isAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        selectedProduct,
        openProductDetails,
        closeProductDetails,
        productReviews,
        addProductReview,
        lastPlacedOrder,
        setLastPlacedOrder,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        clearCart,
        placeOrder,
        sellerStatus,
        sellerProfile,
        submitSellerApplication,
        approveSellerApplication
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
