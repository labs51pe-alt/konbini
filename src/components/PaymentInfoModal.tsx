import React, { useState } from 'react';
import {
  Check,
  Copy,
  CreditCard,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/products';
import { useApp } from '../context/AppContext';

export const PaymentInfoModal: React.FC = () => {
  const { isPaymentModalOpen, setIsPaymentModalOpen, copiedText, copyToClipboard } = useApp();
  const [activeTab, setActiveTab] = useState<'yape' | 'bcp'>('yape');

  if (!isPaymentModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="absolute inset-0"
        onClick={() => setIsPaymentModalOpen(false)}
      />

      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-purple-100 dark:border-slate-800 p-5 z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Cuentas de Pago Locales
            </h3>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher: Yape vs BCP */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 my-4">
          <button
            onClick={() => setActiveTab('yape')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'yape'
                ? 'bg-[#742284] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Smartphone size={14} />
            <span>Yape</span>
          </button>
          <button
            onClick={() => setActiveTab('bcp')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'bcp'
                ? 'bg-[#002A8F] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <CreditCard size={14} />
            <span>BCP</span>
          </button>
        </div>

        {/* Yape Content */}
        {activeTab === 'yape' && (
          <div className="space-y-4">
            {/* Visual QR Card Representation */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#742284]/15 to-purple-100/40 dark:from-[#742284]/30 dark:to-slate-800 border border-[#742284]/30 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-2xl bg-white p-2.5 shadow-md flex items-center justify-center mb-3">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#742284]" fill="currentColor">
                  {/* Simulated high contrast QR pattern */}
                  <rect x="0" y="0" width="30" height="30" rx="4" />
                  <rect x="6" y="6" width="18" height="18" fill="white" />
                  <rect x="10" y="10" width="10" height="10" />
                  <rect x="70" y="0" width="30" height="30" rx="4" />
                  <rect x="76" y="6" width="18" height="18" fill="white" />
                  <rect x="80" y="10" width="10" height="10" />
                  <rect x="0" y="70" width="30" height="30" rx="4" />
                  <rect x="6" y="76" width="18" height="18" fill="white" />
                  <rect x="10" y="80" width="10" height="10" />
                  <rect x="40" y="10" width="20" height="10" />
                  <rect x="40" y="30" width="10" height="30" />
                  <rect x="60" y="40" width="30" height="10" />
                  <rect x="40" y="70" width="20" height="20" />
                  <rect x="70" y="70" width="20" height="10" />
                  <rect x="80" y="85" width="10" height="10" />
                </svg>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#742284] dark:text-purple-300">
                Número Yape Móvil
              </span>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-wider my-0.5">
                {BUSINESS_CONFIG.yape.number}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Titular: <strong className="text-slate-800 dark:text-slate-200">{BUSINESS_CONFIG.yape.name}</strong>
              </p>

              <button
                onClick={() => copyToClipboard(BUSINESS_CONFIG.yape.number, 'Yape')}
                className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#742284] hover:bg-[#5f1b6c] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                {copiedText === 'Yape' ? (
                  <>
                    <Check size={15} />
                    <span>¡Número Yape Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span>Copiar Número de Yape</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-[11px] text-slate-600 dark:text-slate-300">
              <p className="font-bold text-purple-900 dark:text-purple-200 mb-0.5">
                ¿Cómo pagar con Yape?
              </p>
              <ol className="list-decimal list-inside space-y-0.5 text-slate-600 dark:text-slate-300">
                <li>Abre tu app Yape y presiona "Yapear a celular".</li>
                <li>Pega el número <strong>{BUSINESS_CONFIG.yape.number}</strong> o escanea el QR.</li>
                <li>Verifica que el titular sea <strong>{BUSINESS_CONFIG.yape.name}</strong>.</li>
                <li>Envía la captura de tu comprobante a nuestro WhatsApp.</li>
              </ol>
            </div>
          </div>
        )}

        {/* BCP Content */}
        {activeTab === 'bcp' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#002A8F]/15 to-blue-100/40 dark:from-[#002A8F]/30 dark:to-slate-800 border border-[#002A8F]/30 space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#002A8F] dark:text-blue-300">
                  Cuenta Corriente Soles
                </span>
                <p className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums tracking-wide">
                  {BUSINESS_CONFIG.bcp.accountNumber}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Titular: <strong className="text-slate-800 dark:text-slate-200">{BUSINESS_CONFIG.bcp.name}</strong>
                </p>

                <button
                  onClick={() => copyToClipboard(BUSINESS_CONFIG.bcp.accountNumber, 'BCP_CTA')}
                  className="mt-2 w-full py-2 px-3 rounded-xl bg-[#002A8F] hover:bg-[#001f6b] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  {copiedText === 'BCP_CTA' ? (
                    <>
                      <Check size={14} />
                      <span>¡Cuenta BCP Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copiar N° de Cuenta BCP</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-[#002A8F]/20">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Código Interbancario (CCI)
                </span>
                <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                  {BUSINESS_CONFIG.bcp.cci}
                </p>
                <button
                  onClick={() => copyToClipboard(BUSINESS_CONFIG.bcp.cci, 'BCP_CCI')}
                  className="mt-1.5 w-full py-1.5 px-3 rounded-xl border border-[#002A8F]/40 text-[#002A8F] dark:text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#002A8F]/10 transition-colors"
                >
                  {copiedText === 'BCP_CCI' ? '¡CCI Copiado!' : 'Copiar CCI Interbancario'}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[11px] text-slate-600 dark:text-slate-300">
              <p className="font-bold text-blue-900 dark:text-blue-200 mb-0.5">
                Transferencias desde cualquier banco
              </p>
              <p>Puedes transferir directo vía BCP o interbancario con el CCI sin costo adicional en horario regular.</p>
            </div>
          </div>
        )}

        {/* WhatsApp Direct Help */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Verificación instantánea</span>
          </div>

          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappDigits}?text=${encodeURIComponent('Hola Konbini Market, deseo consultar los datos para realizar mi pago por Yape/BCP.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <MessageCircle size={14} />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
