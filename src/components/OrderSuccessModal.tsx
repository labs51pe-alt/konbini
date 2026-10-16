import React from 'react';
import {
  CheckCircle2,
  CreditCard,
  MessageCircle,
  Package,
  X,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/products';
import { useApp } from '../context/AppContext';

export const OrderSuccessModal: React.FC = () => {
  const {
    completedOrder,
    setCompletedOrder,
    sendOrderToWhatsApp,
    setIsPaymentModalOpen,
    setActiveTab,
  } = useApp();

  if (!completedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="absolute inset-0"
        onClick={() => setCompletedOrder(null)}
      />

      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-purple-100 dark:border-slate-800 p-6 z-10 text-center animate-scale-in">
        <button
          onClick={() => setCompletedOrder(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center justify-center"
        >
          <X size={18} />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-md">
          <CheckCircle2 size={36} className="stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
          ¡Pedido Registrado con Éxito!
        </h3>

        <div className="my-2 py-1 px-3 rounded-full bg-purple-50 dark:bg-slate-800 inline-block text-xs font-bold text-purple-700 dark:text-purple-300">
          Orden #{completedOrder.id}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-4">
          Hemos preparado tu mensaje formal de pedido. Si no se abrió WhatsApp automáticamente, haz clic abajo para enviarlo a nuestro equipo.
        </p>

        {/* Summary Mini Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-left text-xs space-y-1 mb-5">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Cliente:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {completedOrder.customerInfo.fullName}
            </span>
          </div>

          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Total a transferir:</span>
            <span className="font-extrabold text-purple-700 dark:text-purple-300 tabular-nums">
              S/ {completedOrder.total.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Método:</span>
            <span className="font-bold uppercase text-slate-800 dark:text-slate-200">
              Yape ({BUSINESS_CONFIG.yape.number})
            </span>
          </div>
        </div>

        {/* Primary CTA: Send to WhatsApp */}
        <div className="space-y-2.5">
          <button
            onClick={() => sendOrderToWhatsApp(completedOrder)}
            className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
          >
            <MessageCircle size={18} />
            <span>Abrir Chat de WhatsApp</span>
          </button>

          <button
            onClick={() => {
              setCompletedOrder(null);
              setIsPaymentModalOpen(true);
            }}
            className="w-full h-10 rounded-xl bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 text-purple-900 dark:text-purple-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-purple-200/60 dark:border-slate-700"
          >
            <CreditCard size={15} />
            <span>Ver Datos de Yape y BCP</span>
          </button>

          <button
            onClick={() => {
              setCompletedOrder(null);
              setActiveTab('inicio');
            }}
            className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            Seguir Explorando el Menú
          </button>
        </div>
      </div>
    </div>
  );
};
