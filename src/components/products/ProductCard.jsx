import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import Toast from '../ui/Toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setToast({ show: true, message: `${product.name} added to cart!`, type: 'success' });
  };

  const handleToggleWishlist = () => {
    addToWishlist(product);
    setToast({
      show: true,
      message: inWishlist ? `${product.name} removed from wishlist` : `${product.name} added to wishlist!`,
      type: 'info',
    });
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={14} className="fill-[#b38947] text-[#b38947]" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <span key={i} className="relative inline-block">
            <Star size={14} className="text-gray-300" />
            <span className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={14} className="fill-[#b38947] text-[#b38947]" />
            </span>
          </span>
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <>
      <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Link to={`/shop/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2.5 py-1 bg-[#f4edd6] text-[#8a6730] text-[10px] font-bold uppercase tracking-wider rounded-sm">
                New
              </span>
            )}
            {product.isOnSale && (
              <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-[#101726] hover:bg-[#101726] hover:text-white'
              }`}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={handleToggleWishlist}
            >
              <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#101726] shadow-md hover:bg-[#101726] hover:text-white transition-colors"
              title="Add to Cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
            {product.categorySlug.replace('-', ' ')}
          </div>
          <Link to={`/shop/${product.slug}`} className="mb-2">
            <h3 className="font-display text-lg text-[#101726] group-hover:text-[#b38947] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          <div className="mt-auto flex items-center gap-2">
            <span className="font-bold text-[#101726]">${product.price.toFixed(2)}</span>
            {product.isOnSale && product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      <Toast
        message={toast.message}
        isVisible={toast.show}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
}
