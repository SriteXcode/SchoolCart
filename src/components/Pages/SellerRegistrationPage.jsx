import React, { useState, useEffect } from 'react';
import { Store, ShieldCheck, Mail, MapPin, Briefcase, FileText, Loader2, UserCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function SellerRegistrationPage({ onNavigate }) {
  const { sellerStatus, submitSellerApplication, approveSellerApplication } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    storeName: '',
    businessType: 'individual',
    address: '',
    gstNumber: '',
    contactEmail: ''
  });

  // If approved, redirect to dashboard automatically
  useEffect(() => {
    if (sellerStatus === 'approved') {
      onNavigate('seller-dashboard');
    }
  }, [sellerStatus, onNavigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitSellerApplication(formData);
      setIsSubmitting(false);
    }, 1200);
  };

  if (sellerStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-lg text-center border border-gray-100">
          <div className="w-20 h-20 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 size={32} className="animate-spin" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-brand-teal mb-3">Application Under Review</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Thank you for registering your interest to sell on School Cart! Our administration team is currently reviewing your application. You will be notified once approved.
          </p>

          <div className="bg-brand-yellow/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-brand-teal-dark font-bold mb-2">Simulate Admin Approval (For Demo)</p>
            <button
              onClick={() => {
                approveSellerApplication();
                // Redirect happens via useEffect
              }}
              className="w-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} />
              Approve Seller Now
            </button>
          </div>
          
          <button
            onClick={() => onNavigate('home')}
            className="text-sm font-semibold text-gray-500 hover:text-brand-teal transition-colors cursor-pointer"
          >
            Return to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      <div className="bg-brand-teal text-white py-12 px-4 border-b border-white/10 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Become a School Cart Seller
          </h1>
          <p className="text-white/80 max-w-xl mx-auto">
            Join India's fastest-growing student marketplace. Reach thousands of students looking for quality stationery and study supplies.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Store Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Store Name *
              </label>
              <div className="relative">
                <Store size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="storeName"
                  required
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="e.g. Acme Stationery Traders"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                />
              </div>
            </div>

            {/* Business Type & Contact Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Business Type *
                </label>
                <div className="relative">
                  <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal appearance-none cursor-pointer"
                  >
                    <option value="individual">Individual / Student Creator</option>
                    <option value="proprietorship">Sole Proprietorship</option>
                    <option value="llc">LLC / Pvt Ltd</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Business Email *
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contact@yourstore.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                  />
                </div>
              </div>
            </div>

            {/* GST Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                GST / Tax ID (Optional)
              </label>
              <div className="relative">
                <FileText size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="Leave blank if not applicable"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all"
                />
              </div>
            </div>

            {/* Business Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Business Address *
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full physical address or registered office"
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition-all resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-teal hover:bg-brand-teal-dark active:bg-brand-teal-light text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <UserCheck size={20} />
                    <span>Submit Seller Registration</span>
                  </>
                )}
              </button>
            </div>
            
            <p className="text-center text-[10px] text-gray-400 mt-4">
              By submitting, you agree to School Cart's Seller Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
