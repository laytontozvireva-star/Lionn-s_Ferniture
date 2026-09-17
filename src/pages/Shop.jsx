import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import { products } from '../data/products';
import { categories } from '../data/categories';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (categoryParam === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.categorySlug === categoryParam));
    }
  }, [categoryParam]);

  const handleCategorySelect = (slug) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="bg-[#f4edd6]/30 py-12 mb-12">
        <div className="container mx-auto px-4 md:px-10 lg:px-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-[#101726] mb-4">Shop Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium handcrafted furniture. 
            Designed for comfort, built to last.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <ProductFilters 
            categories={categories} 
            selectedCategory={categoryParam} 
            onSelectCategory={handleCategorySelect} 
          />
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
