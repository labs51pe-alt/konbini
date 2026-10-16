import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FloatingCartBar: React.FC = () => {
  const { cartTotalCount, cartFinalTotal, setIsCartOpen, isCartOpen } = useApp();

  if (cartTotalCount === 0 || isCartOpen) return null;

  return (
    <aside
      aria-label="Resumen flotante del carrito"
      className="fixed bottom-18 left-0 right-0 z-30 px-4 pointer-events-none animate-slide-up"
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white shadow-xl shadow-purple-900/30 flex items-center justify-between px-4 active:scale-[0.98] transition-all border border-purple-400/30 backdrop-blur-md"
        >
          {/* Left: Bag count & label */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {cartTotalCount}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs font-bold block text-purple-100">
                {cartTotalCount} {cartTotalCount === 1 ? 'producto' : 'productos'}
              </span>
              <span className="text-sm font-extrabold tabular-nums">
                S/ {cartFinalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-1.5 text-xs font-extrabold bg-white/20 hover:bg-white/30 py-2 px-3.5 rounded-xl transition-colors">
            <span>Ver Pedido</span>
            <ArrowRight size={15} />
          </div>
        </button>
      </div>
    </aside>
  );
};
