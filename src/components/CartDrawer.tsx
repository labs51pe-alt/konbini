import React, { useState } from 'react';
import {
  Check,
  Copy,
  Minus,
  Plus,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/products';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartFinalTotal,
    customerInfo,
    setCustomerInfo,
    placeOrder,
    copiedText,
    copyToClipboard,
  } = useApp();

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isCartOpen) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!customerInfo.fullName.trim()) {
      errors.fullName = 'Por favor ingresa tu nombre completo';
    }
    if (!customerInfo.phone.trim() || customerInfo.phone.length < 8) {
      errors.phone = 'Ingresa tu número de celular / WhatsApp';
    }
    if (!customerInfo.address.trim()) {
      errors.address = 'Por favor escribe tu dirección de entrega';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    placeOrder();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10 overflow-hidden transition-colors">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Canasta de Compras
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded-md transition-colors"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-50 dark:bg-slate-800 flex items-center justify-center text-purple-400 mb-4">
              <ShoppingBag size={38} className="stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
              Tu canasta está vacía
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-400 max-w-xs mb-6">
              Selecciona tus ramen, soju, dulces o snacks asiáticos favoritos para agregarlos aquí.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 active:scale-95 transition-all"
            >
              Explorar Catálogo
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmOrder} className="flex-grow flex flex-col justify-between overflow-hidden">
            <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
              {/* 1. List of items */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Productos Seleccionados ({cart.reduce((s, i) => s + i.quantity, 0)})
                </span>
                {cart.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 bg-white"
                    />

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                        {item.variant.name}
                      </p>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white tabular-nums mt-0.5">
                        S/ {(item.variant.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Stepper */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <div className="h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center px-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variantId, -1)
                          }
                          aria-label="Disminuir"
                          className="w-5 h-5 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-purple-600"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs font-bold tabular-nums text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(item.productId, item.variantId, 1)
                          }
                          aria-label="Aumentar"
                          className="w-5 h-5 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:text-purple-600"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        aria-label="Eliminar producto"
                        className="text-[10px] text-slate-400 hover:text-red-500 transition-colors flex items-center gap-0.5"
                      >
                        <Trash2 size={11} />
                        <span>Quitar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 2. Simple Customer Delivery Details Form */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wider block">
                  Datos de Entrega del Cliente
                </span>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Camila Vargas"
                    value={customerInfo.fullName}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className="w-full text-xs font-medium py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-purple-500"
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 987 654 321"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full text-xs font-medium py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-purple-500"
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                {/* Delivery Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Escribe tu Dirección de Entrega *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej. Jr. Puno 420 (frente al parque) o Av. Giráldez 350, Huancayo"
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))
                    }
                    className="w-full text-xs font-medium py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-purple-500 resize-none"
                  />
                  {formErrors.address && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1">
                      {formErrors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* 3. Direct Yape Payment Info Card */}
              <div className="p-3.5 rounded-2xl bg-[#742284]/10 dark:bg-[#742284]/20 border border-[#742284]/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#742284] text-white flex items-center justify-center font-extrabold text-xs">
                      Y
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#742284] dark:text-purple-300">
                        Pagar por Yape
                      </span>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                        {BUSINESS_CONFIG.yape.number}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(BUSINESS_CONFIG.yape.number, 'Yape_Cart')
                    }
                    className="py-1 px-3 rounded-xl bg-[#742284] hover:bg-[#5f1b6c] text-white text-[11px] font-bold flex items-center gap-1 transition-colors active:scale-95 shadow-xs"
                  >
                    {copiedText === 'Yape_Cart' ? (
                      <>
                        <Check size={13} />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 border-t border-[#742284]/20 flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  <QrCode size={15} className="text-[#742284] shrink-0 mt-0.5" />
                  <span>
                    Transfiere <strong>S/ {cartFinalTotal.toFixed(2)}</strong> a este número por Yape. Al confirmar se abrirá WhatsApp para que envíes la captura.
                  </span>
                </div>
              </div>

              {/* 4. Financial Total */}
              <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                    Total a Pagar en Soles:
                  </span>
                  <span className="text-xl font-extrabold text-purple-700 dark:text-purple-300 tabular-nums">
                    S/ {cartFinalTotal.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 py-1 px-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900">
                    Envío 100% Gratis
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action Footer */}
            <div className="p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-purple-100 dark:border-slate-800">
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all"
              >
                <span>Confirmar Pedido por WhatsApp</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">S/ {cartFinalTotal.toFixed(2)}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-2">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>Envío directo al WhatsApp oficial: {BUSINESS_CONFIG.whatsappNumber}</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
