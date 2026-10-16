import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../ProductCard';

export const FavoritesTab: React.FC = () => {
  const { products, favorites, setActiveTab } = useApp();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-4 px-4 pt-3 pb-24">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Mis Favoritos
        </h2>
        <p className="text-xs text-slate-400">
          Tus productos guardados para agregarlos rápidamente en tu próximo pedido
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-18 h-18 rounded-3xl bg-pink-50 dark:bg-pink-950/30 flex items-center justify-center text-pink-500 mb-4">
            <Heart size={36} className="stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Aún no tienes favoritos
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1 mb-6">
            Toca el corazón en cualquier tarjeta de ramen, soju o dulce para guardarlo aquí.
          </p>
          <button
            onClick={() => setActiveTab('inicio')}
            className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/25 active:scale-95 transition-all"
          >
            Explorar Productos
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Tienes <strong>{favoriteProducts.length}</strong> {favoriteProducts.length === 1 ? 'producto guardado' : 'productos guardados'}
            </span>
            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold">
              <Sparkles size={12} />
              Konbini Market
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
