import React, { useEffect, useState } from 'react';
import { ShoppingCart, Loader2, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (*)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const toggleExpand = (id) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending_payment':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#b38947]" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#101726]">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">View and manage customer orders.</p>
      </div>

      {!isSupabaseConfigured || orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-[#f4edd6] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-[#b38947]" />
          </div>
          <h2 className="text-xl font-bold text-[#101726] mb-2">No Orders Yet</h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            When customers place orders on your store, they will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                  <th className="px-6 py-4 font-medium">Order Number</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Total</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-[#101726]">
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{order.order_number}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-gray-500 text-xs">{order.customer_email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        ${Number(order.total).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleExpand(order.id)}
                          className="text-gray-400 hover:text-[#b38947] p-2"
                        >
                          {expandedOrderId === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row */}
                    {expandedOrderId === order.id && (
                      <tr className="bg-gray-50 border-b-2 border-gray-200">
                        <td colSpan={6} className="px-6 py-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <FileText size={16} /> Order Details
                              </h4>
                              <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                                {order.order_items?.map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-600">
                                      {item.quantity}x {item.product_name}
                                    </span>
                                    <span className="font-medium">${Number(item.line_total).toFixed(2)}</span>
                                  </div>
                                ))}
                                <div className="border-t border-gray-100 pt-2 mt-2">
                                  <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span>${Number(order.subtotal).toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm text-gray-500">
                                    <span>Shipping</span>
                                    <span>${Number(order.delivery_fee).toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between text-sm font-bold text-[#101726] mt-2">
                                    <span>Total</span>
                                    <span>${Number(order.total).toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-3">Shipping Information</h4>
                              <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-600">
                                <p className="font-medium text-[#101726] mb-1">{order.customer_name}</p>
                                <p>{order.delivery_address}</p>
                                <p>{order.delivery_city}, {order.postal_code}</p>
                                <p className="mt-2 text-gray-500">{order.customer_email}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
