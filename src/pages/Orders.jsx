import React from 'react';
import { Link } from 'react-router-dom';

// Mock order data – in real app this would be fetched from backend
const mockOrders = [
  { id: 'LF-2026-00123', date: '2026-09-10', total: '$1,294.00', status: 'Delivered' },
  { id: 'LF-2026-00122', date: '2026-09-05', total: '$749.00', status: 'Shipped' },
  { id: 'LF-2026-00121', date: '2026-08-28', total: '$428.00', status: 'Processing' },
];

export default function Orders() {
  return (
    <section className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-16 max-w-4xl">
        <h1 className="font-display text-4xl text-[#101726] mb-8">Your Orders</h1>
        {mockOrders.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {mockOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-1">
                  <p className="font-medium text-[#101726]">Order #: {order.id}</p>
                  <p className="text-gray-500 text-sm">Date: {order.date}</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <p className="text-[#b38947] font-semibold">{order.total}</p>
                  <span className={
                    order.status === 'Delivered'
                      ? 'text-green-600'
                      : order.status === 'Shipped'
                        ? 'text-yellow-600'
                        : 'text-blue-600'
                  }>{order.status}</span>
                  <Link
                    to={`/order/${order.id}`}
                    className="text-[#b38947] hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center bg-[#b38947] text-white px-6 py-3 rounded-lg hover:bg-[#916a2e] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

