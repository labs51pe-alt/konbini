import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  Truck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_CONFIG } from '../data/products';
import { useApp } from '../context/AppContext';
import { KonbiniLogo } from './KonbiniLogo';

const KOREA_PHOTOS = [
  {
    id: 'korea-store',
    image: '/images/korean_night_konbini_1792173001195.jpg',
  },
  {
    id: 'korean-snacks',
    image: '/images/korean_viral_snacks_1792173014616.jpg',
  },
  {
    id: 'buldak-carbonara',
    image: '/images/konbini_buldak_carbonara_1792167126441.jpg',
  },
  {
    id: 'tteokbokki',
    image: '/images/korean_tteokbokki_snack_1792173000590.jpg',
  },
  {
    id: 'jinro-soju',
    image: '/images/konbini_soju_jinro_strawberry_1792167127107.jpg',
  },
  {
    id: 'shin-ramyun',
    image: '/images/konbini_shin_ramyun_spicy_1792167126979.jpg',
  },
];

export const SplashScreen: React.FC = () => {
  const {
    setIsSplashActive,
    setActiveTab,
    darkMode,
    toggleDarkMode,
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-play the Korean photography carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % KOREA_PHOTOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % KOREA_PHOTOS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + KOREA_PHOTOS.length) % KOREA_PHOTOS.length);
  };

  const handleEnterCatalog = () => {
    setActiveTab('inicio');
    setIsSplashActive(false);
  };

  const activePhoto = KOREA_PHOTOS[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25 },
    }),
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between px-3.5 py-3 sm:py-5 overflow-hidden bg-gradient-to-b from-purple-100/70 via-white to-purple-100/80 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-500">
      {/* Animated Ambient Glow Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-ring" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-pink-300/25 dark:bg-pink-600/15 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Animated Emojis & Korean Motifs */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 8, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-18 left-4 text-2xl select-none pointer-events-none drop-shadow-md z-10"
      >
        🍜
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-28 right-4 text-2xl select-none pointer-events-none drop-shadow-md z-10"
      >
        🍓
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-32 left-4 text-xl select-none pointer-events-none drop-shadow-md z-10"
      >
        🇰🇷
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-36 right-5 text-xl select-none pointer-events-none drop-shadow-md z-10"
      >
        ✨
      </motion.div>

      {/* Top Header with Delivery status and Dark/Light Mode switch */}
      <header className="w-full max-w-md flex items-center justify-between z-20">
        <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-xs border border-purple-100 dark:border-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 tracking-wide flex items-center gap-1">
            <Truck size={12} className="text-emerald-500" />
            <span>Delivery Activo</span>
          </span>
        </div>

        <div className="flex items-center p-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs border border-purple-100 dark:border-slate-800">
          <button
            onClick={() => darkMode && toggleDarkMode()}
            aria-label="Modo claro"
            className={`flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-bold transition-all ${
              !darkMode
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            <Sun size={13} className={!darkMode ? 'rotate-90 transition-transform' : ''} />
            <span className="text-[10px]">Claro</span>
          </button>
          <button
            onClick={() => !darkMode && toggleDarkMode()}
            aria-label="Modo oscuro"
            className={`flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-bold transition-all ${
              darkMode
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            <Moon size={13} className={darkMode ? '-rotate-12 transition-transform' : ''} />
            <span className="text-[10px]">Oscuro</span>
          </button>
        </div>
      </header>

      {/* Main Container: Pure Visual Photography Showcase & CTA */}
      <main className="w-full max-w-md flex flex-col items-center text-center my-auto z-10 py-1">
        {/* Mascot & Brand Header */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={handleEnterCatalog}
          >
            <KonbiniLogo size={68} showText={false} />
          </motion.div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-purple-900 dark:text-purple-200">
                KONBINI
              </h1>
              <span className="text-xs bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold px-2 py-0.5 rounded-md shadow-xs">
                Corea 🇰🇷
              </span>
            </div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              Snacks y cultura coreana
            </p>
          </div>
        </div>

        {/* Pure Photo & Animation Showcase (Zero clutter, zero titles) */}
        <div className="w-full relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border-2 border-purple-200/90 dark:border-purple-800/80 my-2 group">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activePhoto.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={handleEnterCatalog}
              >
                {/* Visual Photo with subtle Ken Burns zoom animation */}
                <motion.img
                  src={activePhoto.image}
                  alt="Corea"
                  animate={{ scale: [1, 1.06] }}
                  transition={{ duration: 4.5, ease: 'easeOut' }}
                  className="w-full h-full object-cover select-none"
                  loading="eager"
                />
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-75 hover:opacity-100 hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Siguiente foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-75 hover:opacity-100 hover:scale-110 active:scale-95"
            >
              <ChevronRight size={18} />
            </button>

            {/* Progress Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none">
              {KOREA_PHOTOS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-5 bg-white shadow-xs'
                      : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Primary Action CTA Button: Big, Clean, Animated */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleEnterCatalog}
          className="w-full mt-2 h-13 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-purple-600/35 transition-all cursor-pointer animate-bounce-subtle"
        >
          <span>Ingresar al Catálogo</span>
          <ArrowRight size={20} className="stroke-[2.5]" />
        </motion.button>
      </main>


    </div>
  );
};
