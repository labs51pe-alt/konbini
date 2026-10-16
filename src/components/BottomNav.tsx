import React from 'react';
import {
  Compass,
  Heart,
  Home,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, favorites } = useApp();

  const tabs = [
    { id: 'inicio' as const, label: 'Inicio', icon: Home },
    { id: 'explorar' as const, label: 'Explorar', icon: Compass },
    {
      id: 'favoritos' as const,
      label: 'Favoritos',
      icon: Heart,
      badge: favorites.length > 0 ? favorites.length : undefined,
    },
  ];

  return (
    <nav
      aria-label="Navegación principal de la aplicación"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-purple-100 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center relative py-1 transition-all ${
                isActive
                  ? 'text-purple-600 dark:text-purple-400 font-bold'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] rounded-full text-[9px] font-bold flex items-center justify-center px-1 text-white shadow-xs ${
                      isActive ? 'bg-purple-600' : 'bg-slate-400 dark:bg-slate-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
