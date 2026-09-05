import React from 'react';
import { useCart } from '../../context/CartContext';
import { Package, DollarSign, TrendingUp, Users, PlusCircle } from 'lucide-react';

export default function SellerDashboardPage({ onNavigate }) {
  const { sellerProfile } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Banner */}
      <div className="bg-brand-teal text-white py-12 px-4 border-b border-white/10 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-yellow/10 blur-3xl pointer-events-none" />
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-brand-yellow text-xs font-extrabold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full mb-2">
                SELLER DASHBOARD
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Welcome, {sellerProfile?.storeName || 'Seller'}!
              </h1>
              <p className="text-white/80 mt-1 max-w-xl text-sm">
                Manage your stationery inventory, track sales, and grow your student customer base.
              </p>
            </div>
            
            <button
              onClick={() => alert("Product creation modal would open here!")}
              className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-teal-dark font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer self-start md:self-end"
            >
              <PlusCircle size={18} />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Revenue</p>
              <p className="text-2xl font-extrabold text-gray-900">₹0.00</p>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <Package size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Active Products</p>
              <p className="text-2xl font-extrabold text-gray-900">0</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Orders</p>
              <p className="text-2xl font-extrabold text-gray-900">0</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
              <Users size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Store Views</p>
              <p className="text-2xl font-extrabold text-gray-900">0</p>
            </div>
          </div>
        </div>

        {/* Placeholder for Recent Orders / Products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 md:p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Package size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Your store is empty. Start adding some stationery or study essentials to start selling!
          </p>
          <button
            onClick={() => alert("Product creation modal would open here!")}
            className="text-sm font-bold text-brand-teal hover:text-brand-teal-dark bg-brand-teal/5 hover:bg-brand-teal/10 px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Create Your First Product
          </button>
        </div>
      </div>
    </div>
  );
}
