import React from 'react';

export default function ProductFilters({ categories, selectedCategory, onSelectCategory, priceRange, onPriceRangeChange, maxPrice }) {
  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 space-y-8">
        {/* Categories */}
        <div>
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

        {/* Price Range */}
        <div>
          <h3 className="font-display text-xl text-[#101726] mb-6 border-b border-gray-200 pb-4">
            Price Range
          </h3>
          <div className="space-y-4">
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#b38947]"
            />
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Min</label>
                <input
                  type="number"
                  min={0}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#b38947]"
                />
              </div>
              <span className="text-gray-400 mt-5">–</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Max</label>
                <input
                  type="number"
                  min={priceRange[0]}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#b38947]"
                />
              </div>
            </div>
            <button
              onClick={() => onPriceRangeChange([0, maxPrice])}
              className="text-xs text-[#b38947] hover:underline"
            >
              Reset price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
