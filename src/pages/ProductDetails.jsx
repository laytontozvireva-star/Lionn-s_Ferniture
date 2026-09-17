import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronRight, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams(); // actually slug
  const product = products.find(p => p.slug === id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center container mx-auto px-4">
        <h2 className="text-3xl font-display mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-[#b38947] hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const images = [product.image, product.hoverImage].filter(Boolean);

  // related products (same category, not this one)
  const relatedProducts = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100 py-4 mb-8">
        <div className="container mx-auto px-4 md:px-10 lg:px-16 flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-[#b38947]">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/shop" className="hover:text-[#b38947]">Shop</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to={`/shop?category=${product.categorySlug}`} className="hover:text-[#b38947] capitalize">
            {product.categorySlug.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-[#101726] font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <Link to="/shop" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#b38947] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 no-scrollbar">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-[#b38947]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden aspect-square">
              <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 flex flex-col pt-2 lg:pt-6">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.isNew && <span className="px-3 py-1 bg-[#f4edd6] text-[#8a6730] text-xs font-bold uppercase tracking-wider rounded-sm">New Arrival</span>}
              {product.isOnSale && <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm">On Sale</span>}
            </div>

            <h1 className="font-display text-4xl lg:text-5xl text-[#101726] mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-[#b38947]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="font-display text-3xl font-semibold text-[#101726]">${product.price.toFixed(2)}</span>
              {product.isOnSale && product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
              <br/><br/>
              Crafted with precision and designed for ultimate comfort, this piece is a perfect addition to any modern home. 
              Its timeless aesthetic ensures it will remain a centerpiece in your space for years to come.
            </p>

            <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg h-12 w-32 shrink-0">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-l-lg"
                  >-</button>
                  <span className="flex-1 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-r-lg"
                  >+</button>
                </div>

                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 h-12 bg-white border border-[#101726] text-[#101726] rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                  <button className="flex-1 h-12 bg-[#b38947] text-white rounded-lg font-medium hover:bg-[#916a2e] transition-colors flex items-center justify-center">
                    Buy Now
                  </button>
                </div>

                <button className="h-12 w-12 shrink-0 flex items-center justify-center border border-gray-300 rounded-lg text-gray-500 hover:border-[#b38947] hover:text-[#b38947] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>



            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#b38947] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-[#101726]">Free Shipping & Returns</h4>
                  <p className="text-sm text-gray-500">Free standard shipping on all orders and 30-day returns.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#b38947] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-[#101726]">5-Year Warranty</h4>
                  <p className="text-sm text-gray-500">We stand by our quality. All furniture comes with a structural warranty.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-gray-200 pt-16">
            <h2 className="font-display text-3xl text-[#101726] mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
