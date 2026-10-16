import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNav } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';
import { FloatingCartBar } from './components/FloatingCartBar';
import { Header } from './components/Header';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { PaymentInfoModal } from './components/PaymentInfoModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SplashScreen } from './components/SplashScreen';
import { ExploreTab } from './components/tabs/ExploreTab';
import { FavoritesTab } from './components/tabs/FavoritesTab';
import { HomeTab } from './components/tabs/HomeTab';
import { AppProvider, useApp } from './context/AppContext';

// Smooth slide and fade transition variant for native mobile feeling
const tabAnimationVariants = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as const, // iOS/Android native fluid easing curve
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
    transition: {
      duration: 0.16,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const MainAppContent: React.FC = () => {
  const { isSplashActive, activeTab } = useApp();

  return (
    <AnimatePresence mode="wait">
      {isSplashActive ? (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="w-full"
        >
          <SplashScreen />
        </motion.div>
      ) : (
        <motion.div
          key="main-catalog-view"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center"
        >
          {/* Mobile-First App Container */}
          <div className="w-full max-w-md min-h-screen bg-white dark:bg-slate-900 shadow-2xl flex flex-col relative border-x border-slate-200/80 dark:border-slate-800/80 transition-colors">
            {/* Sticky App Header with light/dark toggle and district */}
            <Header />

            {/* Tab Content with Fluid Animated Native Transitions */}
            <main className="flex-grow overflow-x-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabAnimationVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full"
                >
                  {activeTab === 'inicio' && <HomeTab />}
                  {activeTab === 'explorar' && <ExploreTab />}
                  {activeTab === 'favoritos' && <FavoritesTab />}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Floating Cart Pill (Appears immediately when cart has items) */}
            <FloatingCartBar />

            {/* Fixed Mobile Bottom Tab Bar */}
            <BottomNav />

            {/* Modals & Drawers */}
            <CartDrawer />
            <ProductDetailModal />
            <PaymentInfoModal />
            <OrderSuccessModal />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
