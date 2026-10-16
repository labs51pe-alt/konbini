import React, { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Flame,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { useApp } from '../../context/AppContext';
import { CategoryId, Product } from '../../types';
import { ProductCard } from '../ProductCard';

export const ExploreTab: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpicy, setSelectedSpicy] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'rating'>(
    'recommended'
  );

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Spicy filter
    if (selectedSpicy !== 'all') {
      if (selectedSpicy === 0) {
        result = result.filter((p) => (p.spicyLevel ?? 0) === 0);
      } else if (selectedSpicy === 3) {
        result = result.filter((p) => p.spicyLevel === 3);
      } else if (selectedSpicy === 5) {
        result = result.filter((p) => (p.spicyLevel ?? 0) >= 4);
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.nativeName && p.nativeName.toLowerCase().includes(q)) ||
          p.origin.toLowerCase().includes(q) ||
          (p.ingredients && p.ingredients.some((ing) => ing.toLowerCase().includes(q)))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'recommended':
      default:
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, selectedSpicy, searchQuery, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSpicy('all');
    setSortBy('recommended');
  };

  return (
    <div className="space-y-4 px-4 pt-3 pb-24">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Buscar ramen, soju, dulces, marcas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-10 pr-10 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-purple-500 shadow-xs transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Limpiar búsqueda"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryId)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-xs shadow-purple-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-purple-100/80 dark:border-slate-800 hover:border-purple-200'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-5 h-5 rounded-full object-cover shadow-xs"
              />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Spicy Level & Sort Bar */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        {/* Spicy selector buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedSpicy('all')}
            className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedSpicy === 'all'
                ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setSelectedSpicy(0)}
            className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedSpicy === 0
                ? 'bg-emerald-600 text-white'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Sin Picante
          </button>
          <button
            onClick={() => setSelectedSpicy(3)}
            className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
              selectedSpicy === 3
                ? 'bg-orange-500 text-white'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Flame size={12} />
            <span>Medio</span>
          </button>
          <button
            onClick={() => setSelectedSpicy(5)}
            className={`py-1 px-2.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
              selectedSpicy === 5
                ? 'bg-red-600 text-white'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Flame size={12} />
            <span>Extremo</span>
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-1 shrink-0">
          <ArrowUpDown size={13} className="text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-[11px] font-semibold bg-transparent text-slate-700 dark:text-slate-300 border-none outline-none cursor-pointer"
          >
            <option value="recommended" className="bg-white dark:bg-slate-900">
              Populares
            </option>
            <option value="price_asc" className="bg-white dark:bg-slate-900">
              Menor Precio
            </option>
            <option value="price_desc" className="bg-white dark:bg-slate-900">
              Mayor Precio
            </option>
            <option value="rating" className="bg-white dark:bg-slate-900">
              Mejor Calificados
            </option>
          </select>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Mostrando <strong>{filteredProducts.length}</strong> de {products.length} productos
        </span>
        {(searchQuery || selectedCategory !== 'all' || selectedSpicy !== 'all') && (
          <button
            onClick={clearFilters}
            className="text-purple-600 dark:text-purple-400 font-bold hover:underline"
          >
            Restablecer filtros
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-slate-800 flex items-center justify-center text-purple-400 mb-3">
            <SlidersHorizontal size={28} />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No encontramos productos
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1 mb-4">
            Prueba buscando con otra palabra o restablece los filtros activos.
          </p>
          <button
            onClick={clearFilters}
            className="py-2 px-4 rounded-xl bg-purple-600 text-white font-bold text-xs"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};
