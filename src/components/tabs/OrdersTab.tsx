import React from 'react';
import {
  Clock,
  CreditCard,
  ExternalLink,
  MapPin,
  MessageCircle,
  PackageCheck,
  Receipt,
  RotateCcw,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data/products';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';

export const OrdersTab: React.FC = () => {
  const {
    orders,
    sendOrderToWhatsApp,
    setIsPaymentModalOpen,
    setActiveTab,
  } = useApp();

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'preparando':
        return (
          <span className="py-1 px-2.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 flex items-center gap-1">
            <Clock size={11} className="animate-spin" />
            <span>En Preparación</span>
          </span>
        );
      case 'en_camino':
        return (
          <span className="py-1 px-2.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 flex items-center gap-1">
            <Truck size={11} />
            <span>En Camino</span>
          </span>
        );
      case 'entregado':
      default:
        return (
          <span className="py-1 px-2.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 flex items-center gap-1">
            <PackageCheck size={11} />
            <span>Entregado</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 px-4 pt-3 pb-24">
      {/* Tab Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Mis Pedidos
          </h2>
          <p className="text-xs text-slate-400">
            Historial de compras y seguimiento directo por WhatsApp
          </p>
        </div>

        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="py-1.5 px-3 rounded-xl bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-100 dark:border-slate-700 flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
        >
          <CreditCard size={14} />
          <span>Datos de Pago</span>
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-18 h-18 rounded-3xl bg-purple-50 dark:bg-slate-800 flex items-center justify-center text-purple-400 mb-4">
            <Receipt size={36} className="stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No tienes pedidos registrados
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mt-1 mb-6">
            Cuando realices un pedido desde el catálogo aparecerá aquí con todos los detalles y opciones de reenvío.
          </p>
          <button
            onClick={() => setActiveTab('inicio')}
            className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/25 active:scale-95 transition-all"
          >
            Explorar Menú Konbini
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-purple-100/80 dark:border-slate-800 shadow-xs flex flex-col gap-3"
            >
              {/* Order Card Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                      #{order.id}
                    </span>
                    <span className="text-[11px] text-slate-400">·</span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {order.createdAt}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {order.customerInfo.fullName}
                  </span>
                </div>

                {getStatusBadge(order.status)}
              </div>

              {/* Items List Mini */}
              <div className="space-y-2 py-1">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-purple-100 dark:bg-slate-800 text-purple-800 dark:text-purple-300 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                        {item.quantity}x
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {item.product.name}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        ({item.variant.name})
                      </span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums shrink-0 ml-2">
                      S/ {(item.variant.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery and Payment summary */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-purple-600" />
                    Destino:
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {order.customerInfo.address || 'Huancayo'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Método de pago:</span>
                  <span className="font-bold uppercase text-purple-700 dark:text-purple-300">
                    Yape
                  </span>
                </div>

                <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>Total Pagado / Por Pagar:</span>
                  <span className="text-purple-700 dark:text-purple-300 tabular-nums">
                    S/ {order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Resend to WhatsApp & View Payment Data */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => sendOrderToWhatsApp(order)}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <MessageCircle size={15} />
                  <span>Reenviar a WhatsApp</span>
                </button>

                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="py-2.5 px-3 rounded-xl bg-purple-50 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CreditCard size={15} />
                  <span>Datos Yape / BCP</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
