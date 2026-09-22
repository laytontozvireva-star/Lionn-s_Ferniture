import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../context/ProductContext';

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

export default function Shop() {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const MAX_PRICE = useMemo(() => {
    if (products.length === 0) return 2000;
    return Math.ceil(Math.max(...products.map(p => p.price)) / 100) * 100;
  }, [products]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 2000]); // Will adjust in useEffect
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update max price range when products load
  React.useEffect(() => {
    setPriceRange([0, MAX_PRICE]);
  }, [MAX_PRICE]);

  // ── Filter + sort pipeline ──
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryParam !== 'all') {
      result = result.filter(p => p.categorySlug === categoryParam);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categorySlug.replace('-', ' ').includes(q)
      );
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [categoryParam, searchQuery, sortBy, priceRange]);

  const handleCategorySelect = (slug) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="pt-24 pb-20">
      {/* ── Hero Banner ── */}
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
        {/* ── Search + Sort toolbar ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search furniture..."
              className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent bg-white"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#b38947] focus:border-transparent cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* ── Product count ── */}
        <div className="mb-6 text-sm text-gray-500">
          Showing <span className="font-semibold text-[#101726]">{filteredProducts.length}</span>{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'}
          {categoryParam !== 'all' && (
            <span>
              {' '}in <span className="font-semibold text-[#b38947] capitalize">{categoryParam.replace('-', ' ')}</span>
            </span>
          )}
          {searchQuery && (
            <span>
              {' '}for "<span className="font-semibold">{searchQuery}</span>"
            </span>
          )}
        </div>

        {/* ── Sidebar + Grid ── */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Desktop sidebar — always visible on lg */}
          <div className="hidden lg:block">
            <ProductFilters
              categories={categories}
              selectedCategory={categoryParam}
              onSelectCategory={handleCategorySelect}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              maxPrice={MAX_PRICE}
            />
          </div>

          {/* Mobile sidebar — toggled */}
          {showMobileFilters && (
            <div className="lg:hidden bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#101726]">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <ProductFilters
                categories={categories}
                selectedCategory={categoryParam}
                onSelectCategory={(slug) => {
                  handleCategorySelect(slug);
                  setShowMobileFilters(false);
                }}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                maxPrice={MAX_PRICE}
              />
            </div>
          )}

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
