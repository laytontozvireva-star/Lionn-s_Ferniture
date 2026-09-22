import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { Package, FolderTree, ShoppingCart, DollarSign, Plus, ExternalLink } from 'lucide-react';

export default function AdminDashboard() {
  const { products, categories } = useProducts();
  const { cartItems } = useCart();

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);
  const onSaleCount = products.filter(p => p.isOnSale).length;
  const newCount = products.filter(p => p.isNew).length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500', bg: 'bg-blue-50' },
    { label: 'Categories', value: categories.length, icon: FolderTree, color: 'bg-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Items in Carts', value: cartItems.length, icon: ShoppingCart, color: 'bg-amber-500', bg: 'bg-amber-50' },
    { label: 'Catalog Value', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#101726]">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b38947] text-white rounded-lg font-medium hover:bg-[#916a2e] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#101726]">{value}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#101726]">Recent Products</h3>
            <Link to="/admin/products" className="text-sm text-[#b38947] hover:underline flex items-center gap-1">
              View All <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {products.slice(-5).reverse().map(product => (
              <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#101726] truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.categorySlug}</p>
                </div>
                <span className="text-sm font-semibold text-[#b38947]">${product.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-[#101726] mb-4">Product Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-600">On Sale</span>
              <span className="text-sm font-bold text-[#101726]">{onSaleCount} products</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-600">New Arrivals</span>
              <span className="text-sm font-bold text-[#101726]">{newCount} products</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-600">Average Price</span>
              <span className="text-sm font-bold text-[#101726]">
                ${products.length > 0 ? (totalRevenue / products.length).toFixed(2) : '0.00'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-600">Categories</span>
              <span className="text-sm font-bold text-[#101726]">{categories.length} active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
