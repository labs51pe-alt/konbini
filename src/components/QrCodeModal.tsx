import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Download, Share2, Copy, Check, QrCode as QrIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KonbiniLogo } from './KonbiniLogo';

export const QrCodeModal: React.FC = () => {
  const { isQrModalOpen, setIsQrModalOpen, copiedText, copyToClipboard } = useApp();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const systemUrl = 'https://konbini-lac.vercel.app/';

  useEffect(() => {
    if (isQrModalOpen) {
      QRCode.toDataURL(systemUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#4A154B', // Rich Purple
          light: '#FFFFFF',
        },
      })
        .then((url) => {
          setQrDataUrl(url);
        })
        .catch((err) => {
          console.error('Error generating QR code:', err);
        });
    }
  }, [isQrModalOpen]);

  if (!isQrModalOpen) return null;

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'konbini-qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KONBINI Market - Huancayo',
          text: '¡Descubre el minimarket asiático y urbano Konbini Market!',
          url: systemUrl,
        });
      } catch (err) {
        // User cancelled or not allowed
      }
    } else {
      copyToClipboard(systemUrl, 'Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-purple-100 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-5 text-white relative">
          <button
            onClick={() => setIsQrModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/15 rounded-2xl backdrop-blur-md">
              <QrIcon size={26} className="text-purple-200" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">QR del Sistema</h3>
              <p className="text-xs text-purple-200 font-medium">Konbini Market - Huancayo</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Escanea este código QR con la cámara de cualquier celular para ingresar instantáneamente a la plataforma o compártelo.
          </p>

          {/* QR Card Container */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-md border-2 border-purple-100 dark:border-slate-700 relative group flex items-center justify-center">
            {qrDataUrl ? (
              <div className="relative">
                <img
                  src={qrDataUrl}
                  alt="QR Code Konbini"
                  className="w-52 h-52 object-contain rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white dark:bg-slate-900 p-1.5 rounded-full shadow-md border border-purple-200">
                    <KonbiniLogo size={36} showText={false} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-52 h-52 flex items-center justify-center text-purple-500 font-bold text-sm">
                Generando QR...
              </div>
            )}
          </div>

          <div className="w-full bg-purple-50 dark:bg-slate-800/80 py-2.5 px-3 rounded-xl border border-purple-100 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-900 dark:text-purple-200 truncate max-w-[210px]">
              {systemUrl}
            </span>
            <button
              onClick={() => copyToClipboard(systemUrl, 'Enlace copiado')}
              className="p-1.5 bg-white dark:bg-slate-700 rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-colors shadow-xs flex items-center gap-1 text-xs font-bold"
              title="Copiar enlace"
            >
              {copiedText ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copiedText ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full pt-1">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-purple-500/20 transition-all cursor-pointer"
            >
              <Download size={16} />
              <span>Descargar QR</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 px-4 bg-purple-100 dark:bg-slate-800 hover:bg-purple-200 dark:hover:bg-slate-700 active:scale-95 text-purple-900 dark:text-purple-200 rounded-2xl text-xs font-extrabold transition-all border border-purple-200 dark:border-slate-700 cursor-pointer"
            >
              <Share2 size={16} />
              <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
