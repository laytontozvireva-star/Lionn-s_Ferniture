import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';

export default function Wishlist() {
  const { wishlistItems } = useWishlist();

  return (
    <section className="pt-24 pb-20 bg-[#FBF9F5] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <h1 className="font-display text-4xl text-[#101726] mb-6">Your Wishlist</h1>
        {wishlistItems.length === 0 ? (
          <p className="text-[#101726]">Your wishlist is empty. Browse our collection and add items you love.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link to="/shop" className="inline-flex items-center text-[#b38947] hover:underline">
            Continue Shopping
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
