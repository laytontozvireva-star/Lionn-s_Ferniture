import React from 'react';

export default function ProductFilters({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24">
        <h3 className="font-display text-xl text-[#101726] mb-6 border-b border-gray-200 pb-4">
          Categories
        </h3>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => onSelectCategory('all')}
              className={`text-sm hover:text-[#b38947] transition-colors ${selectedCategory === 'all' ? 'text-[#b38947] font-semibold' : 'text-gray-600'}`}
            >
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelectCategory(cat.slug)}
                className={`text-sm hover:text-[#b38947] transition-colors ${selectedCategory === cat.slug ? 'text-[#b38947] font-semibold' : 'text-gray-600'}`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
