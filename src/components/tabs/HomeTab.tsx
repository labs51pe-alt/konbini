import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cookie,
  Flame,
  Gift,
  Soup,
  Sparkles,
  Wine,
} from 'lucide-react';
import {
  CATEGORIES,
  PROMO_BANNERS,
} from '../../data/products';
import { useApp } from '../../context/AppContext';
import { CategoryId } from '../../types';
import { ProductCard } from '../ProductCard';

export const HomeTab: React.FC = () => {
  const {
    products,
    setActiveTab,
    setSelectedCategory,
    setSelectedProductForDetail,
  } = useApp();

  // Carousel touch/mouse swipe state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  // Auto-play timer for slide transitions (diapositiva)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < PROMO_BANNERS.length - 1 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : PROMO_BANNERS.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < PROMO_BANNERS.length - 1 ? prev + 1 : 0));
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId as CategoryId);
    setActiveTab('explorar');
  };

  const handleBannerClick = (banner: (typeof PROMO_BANNERS)[0]) => {
    if (banner.targetProductId) {
      const found = products.find((p) => p.id === banner.targetProductId);
      if (found) {
        setSelectedProductForDetail(found);
        return;
      }
    }
    if (banner.targetCategory) {
      setSelectedCategory(banner.targetCategory);
      setActiveTab('explorar');
    }
  };

  // Icons map for category cards
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame size={18} className="text-red-500" />;
      case 'Soup':
        return <Soup size={18} className="text-amber-500" />;
      case 'Wine':
        return <Wine size={18} className="text-emerald-500" />;
      case 'Cookie':
        return <Cookie size={18} className="text-purple-500" />;
      case 'Gift':
        return <Gift size={18} className="text-pink-500" />;
      default:
        return <Sparkles size={18} className="text-purple-600" />;
    }
  };

  // Filter subsets for sections
  const popularProducts = products.filter((p) => p.isPopular);
  const spicyRamen = products.filter((p) => p.category === 'ramen_spicy');
  const drinksAndSoju = products.filter((p) => p.category === 'drinks_soju');

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Promotional Banner Carousel with swipe & drag support */}
      <section className="relative px-4 pt-3">
        <div className="relative overflow-hidden rounded-3xl shadow-lg border border-purple-200/60 dark:border-slate-800">
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex transition-transform duration-500 ease-out select-none cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {PROMO_BANNERS.map((banner) => (
              <div
                key={banner.id}
                onClick={() => handleBannerClick(banner)}
                className="w-full shrink-0 relative aspect-16/9 sm:aspect-21/9 cursor-pointer overflow-hidden group"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Contrast Scrim */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${banner.bgColor} via-black/40 to-black/20 flex flex-col justify-end p-5 text-white`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white">
                      {banner.tag}
                    </span>
                    <span className="text-[10px] font-bold bg-pink-500 text-white px-2 py-0.5 rounded-full shadow-xs">
                      {banner.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight leading-tight mb-1 text-white text-shadow-sm">
                    {banner.title}
                  </h3>

                  <p className="text-xs text-white/90 line-clamp-1 max-w-sm">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next Slide buttons */}
          <button
            onClick={handlePrevSlide}
            aria-label="Promoción anterior"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Siguiente promoción"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {PROMO_BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Ir a la diapositiva ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Categories Grid */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Categorías Konbini
          </h2>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-0.5"
          >
            <span>Ver todo</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.slice(1).map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100/70 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 flex flex-col items-center text-center transition-all active:scale-95 group"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden mb-2 shadow-xs group-hover:scale-105 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {cat.count} opciones
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Featured / Most Popular Products */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                Más Pedidos en Huancayo
              </h2>
              <p className="text-[11px] text-slate-400">
                Los favoritos de la comunidad asiática y K-lovers
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            Ver más
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {popularProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Special Banner: White Rabbit Candy Showcase */}
      <section className="px-4">
        <div
          onClick={() => {
            const rabbit = products.find((p) => p.id === 'white-rabbit-candy');
            if (rabbit) setSelectedProductForDetail(rabbit);
          }}
          className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white cursor-pointer group shadow-lg"
        >
          <div className="relative z-10 max-w-[65%]">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
              Dulce Retro Asiático
            </span>
            <h3 className="text-base font-extrabold mt-2 mb-1 leading-snug">
              Caramelos White Rabbit 🐰
            </h3>
            <p className="text-xs text-blue-200 line-clamp-2 mb-3">
              ¡Con envoltura de papel de arroz comestible que se disuelve en tu boca!
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-white text-blue-950 py-1.5 px-3 rounded-xl group-hover:translate-x-1 transition-transform">
              <span>Probar por S/ 14.50</span>
              <ArrowRight size={13} />
            </span>
          </div>

          <img
            src="/images/konbini_white_rabbit_candy_1792167143543.jpg"
            alt="White Rabbit Candy"
            className="absolute right-0 top-0 bottom-0 w-44 object-cover object-left mask-gradient-left group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* 5. Buldak & Spicy Ramen Category Spotlight */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍜</span>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                Ramen Coreano Auténtico
              </h2>
              <p className="text-[11px] text-slate-400">
                Fideos de trigo importados con salsas tradicionales
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('ramen_spicy');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {spicyRamen.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Soju & Refreshing Drinks Section */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍾</span>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                Soju & Bebidas K-Pop
              </h2>
              <p className="text-[11px] text-slate-400">
                Chamisul de fresa, leche Binggrae y Milkis
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('drinks_soju');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {drinksAndSoju.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
