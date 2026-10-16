import React, { useState } from 'react';
import {
  Check,
  Clock,
  Flame,
  Globe2,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductVariant } from '../types';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    toggleFavorite,
    isFavorite,
    setIsCartOpen,
  } = useApp();

  const product = selectedProductForDetail;
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product?.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!product) return null;

  const currentVariant: ProductVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const isLiked = isFavorite(product.id);
  const totalPrice = currentVariant.price * quantity;

  const handleAddAndClose = () => {
    addToCart(product, currentVariant.id, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setSelectedProductForDetail(null);
      setIsCartOpen(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Background click to dismiss */}
      <div
        className="absolute inset-0"
        onClick={() => setSelectedProductForDetail(null)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-purple-100 dark:border-slate-800 z-10 flex flex-col no-scrollbar">
        {/* Top Sticky Header with Close and Favorite */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>

          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Detalle del Producto
          </span>

          <button
            onClick={() => toggleFavorite(product.id)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors"
          >
            <Heart
              size={18}
              className={
                isLiked ? 'fill-red-500 text-red-500 scale-110' : 'stroke-[2]'
              }
            />
          </button>
        </div>

        {/* Product Media */}
        <div className="relative w-full aspect-16/10 bg-purple-50 dark:bg-slate-800">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {product.isPopular && (
            <span className="absolute top-3 left-3 bg-purple-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              Favorito K-Food
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-4">
          {/* Header metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300">
              <span>{product.brand}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                <Globe2 size={13} />
                {product.origin}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 leading-tight">
              {product.name}
            </h2>

            {product.nativeName && (
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mt-0.5">
                {product.nativeName}
              </p>
            )}

            {/* Rating & reviews */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} className="fill-amber-400" />
                <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-slate-400">
                ({product.reviewCount} valoraciones de clientes)
              </span>
            </div>
          </div>

          {/* Spicy Level Bar (if applicable) */}
          {product.spicyLevel !== undefined && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                  <Flame size={15} className="text-amber-600" />
                  Nivel de Picante
                </span>
                <span className="font-bold text-amber-800 dark:text-amber-300">
                  {product.spicyLevel === 0
                    ? 'Sin Picante (Mild)'
                    : product.spicyLevel <= 2
                    ? 'Picante Suave'
                    : product.spicyLevel <= 4
                    ? 'Picante Intenso 🌶️'
                    : '¡FUEGO EXTREMO! 🔥🔥🔥'}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`h-2 rounded-full ${
                      lvl <= (product.spicyLevel || 0)
                        ? lvl <= 2
                          ? 'bg-amber-400'
                          : lvl <= 4
                          ? 'bg-orange-500'
                          : 'bg-red-600'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              Descripción
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Ingredients list */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Ingredientes Principales
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs py-1 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Preparation hint */}
          {product.preparationTime && (
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 py-2 border-y border-slate-100 dark:border-slate-800">
              <Clock size={15} className="text-purple-600" />
              <span>Tiempo estimado de preparación: <strong>{product.preparationTime}</strong></span>
            </div>
          )}

          {/* Variant Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Seleccionar Presentación / Cantidad
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {product.variants.map((variant) => {
                const isSelected = variant.id === currentVariant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-100 ring-2 ring-purple-600/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-bold block">{variant.name}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-400">
                        {variant.weightOrVolume}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-purple-700 dark:text-purple-300 tabular-nums">
                        S/ {variant.price.toFixed(2)}
                      </span>
                      {variant.originalPrice && (
                        <span className="block text-xs text-slate-400 line-through tabular-nums">
                          S/ {variant.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper & Final Add CTA */}
          <div className="pt-2 flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center px-2 shrink-0 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Menos cantidad"
                className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-xs"
              >
                <Minus size={15} />
              </button>
              <span className="w-10 text-center font-extrabold text-slate-900 dark:text-white tabular-nums text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Más cantidad"
                className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-xs"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddAndClose}
              className={`flex-grow h-12 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${
                addedSuccess
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check size={18} />
                  <span>¡Agregado al Carrito!</span>
                </>
              ) : (
                <>
                  <span>Agregar al Carrito</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">S/ {totalPrice.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

          {/* Guarantee banner */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-2 text-center">
            <ShieldCheck size={14} className="text-purple-600" />
            <span>Productos sellados de fábrica con fecha de vencimiento vigente</span>
          </div>
        </div>
      </div>
    </div>
  );
};
