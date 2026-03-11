import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const ITEMS_PER_PAGE = 6;

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const activeCategory = searchParams.get('category') || '';
  const activeGender = searchParams.get('gender') || '';
  const activeSort = searchParams.get('sort') || 'popular';

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    if (activeGender) {
      if (activeGender === 'limited') result = result.filter(p => p.isLimited);
      else result = result.filter(p => p.gender === activeGender);
    }
    switch (activeSort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      default: result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [activeCategory, activeGender, activeSort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProducts = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const categories = ['floral', 'woody', 'citrus', 'oriental', 'fresh'];
  const genders = [
    { value: 'men', label: 'Pour Homme' },
    { value: 'women', label: 'Pour Femme' },
    { value: 'unisex', label: 'Sans Genre' },
    { value: 'limited', label: 'Limited' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-display text-4xl md:text-5xl mb-4"
        >
          Collections
        </motion.h1>
        <div className="section-divider mt-4" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="nav-link flex items-center gap-2"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <p className="text-muted-foreground text-xs">{filtered.length} fragrances</p>
          <select
            value={activeSort}
            onChange={e => setFilter('sort', e.target.value)}
            className="bg-transparent text-foreground text-xs uppercase tracking-wider border border-border px-4 py-2 focus:outline-none focus:border-primary"
          >
            <option value="popular">Popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        <div className="flex gap-12">
          {/* Filters Sidebar */}
          {filtersOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-56 shrink-0 hidden md:block"
            >
              {/* Category */}
              <div className="mb-10">
                <h3 className="heading-display text-xs mb-4">Fragrance Family</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilter('category', activeCategory === cat ? '' : cat)}
                      className={`block text-sm capitalize transition-colors duration-300 ${
                        activeCategory === cat ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-10">
                <h3 className="heading-display text-xs mb-4">Collection</h3>
                <div className="space-y-2">
                  {genders.map(g => (
                    <button
                      key={g.value}
                      onClick={() => setFilter('gender', activeGender === g.value ? '' : g.value)}
                      className={`block text-sm transition-colors duration-300 ${
                        activeGender === g.value ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear */}
              {(activeCategory || activeGender) && (
                <button
                  onClick={() => { setFilter('category', ''); setFilter('gender', ''); }}
                  className="flex items-center gap-1 text-primary text-xs uppercase tracking-wider"
                >
                  <X size={12} /> Clear Filters
                </button>
              )}
            </motion.aside>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} featured={i === 0 && paginatedProducts.length > 3} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 text-xs transition-colors duration-300 ${
                      page === i + 1 ? 'text-primary border border-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
