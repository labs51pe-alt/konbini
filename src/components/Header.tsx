import React from 'react';
import {
  ChevronDown,
  CreditCard,
  Home,
  MapPin,
  Moon,
  ShoppingBag,
  Sun,
} from 'lucide-react';
import { BUSINESS_CONFIG, DELIVERY_DISTRICTS } from '../data/products';
import { useApp } from '../context/AppContext';
import { KonbiniLogo } from './KonbiniLogo';

export const Header: React.FC = () => {
  const {
    setIsSplashActive,
    darkMode,
    toggleDarkMode,
    cartTotalCount,
    setIsCartOpen,
    selectedDistrict,
    setSelectedDistrict,
    setIsPaymentModalOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-purple-100 dark:border-slate-800 transition-colors">
      <div className="max-w-md mx-auto px-4 h-15 flex items-center justify-between gap-2">
        {/* Left: Logo & Back to Splash button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsSplashActive(true)}
            title="Volver a la Portada Inicial"
            className="flex items-center gap-2 group active:scale-95 transition-transform"
          >
            <KonbiniLogo size={44} showText={false} className="group-hover:rotate-6 transition-transform" />
            <div className="text-left">
              <span className="block text-base font-black tracking-tight text-purple-900 dark:text-purple-200 leading-none">
                KONBINI
              </span>
              <span className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400 tracking-wider">
                market
              </span>
            </div>
          </button>
        </div>

        {/* Center: City Badge */}
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-purple-50 dark:bg-slate-800 border border-purple-100 dark:border-slate-700 text-xs font-bold text-purple-900 dark:text-purple-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Huancayo</span>
          </div>
        </div>

        {/* Right: Quick Actions (Splash button, Payment Info, Theme, Cart) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Back to Splash Button */}
          <button
            onClick={() => setIsSplashActive(true)}
            aria-label="Volver a la portada de bienvenida"
            title="Ver Portada"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Home size={18} />
          </button>

          {/* Payment Info Modal Trigger */}
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            aria-label="Ver datos de pago Yape y BCP"
            title="Datos de Pago Yape / BCP"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          >
            <CreditCard size={18} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Cambiar tema claro / oscuro"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 transition-colors"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir Carrito de compras"
            className="relative p-2 rounded-xl text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 transition-colors ml-0.5 active:scale-95"
          >
            <ShoppingBag size={19} />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[19px] h-[19px] rounded-full bg-purple-600 text-white text-[10px] font-extrabold flex items-center justify-center px-1 shadow-sm animate-scale-in">
                {cartTotalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
