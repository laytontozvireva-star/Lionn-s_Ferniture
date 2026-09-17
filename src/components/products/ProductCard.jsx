import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/shop/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#101726] shadow-md hover:bg-[#101726] hover:text-white transition-colors" title="Add to Wishlist">
            <Heart size={18} />
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
  );
}
