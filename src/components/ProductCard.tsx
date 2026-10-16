import React, { useState } from 'react';
import {
  Flame,
  Heart,
  Minus,
  Plus,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, ProductVariant } from '../types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact = false,
}) => {
  const {
    cart,
    addToCart,
    updateCartQuantity,
    toggleFavorite,
    isFavorite,
    setSelectedProductForDetail,
  } = useApp();

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );

  const currentVariant: ProductVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const isLiked = isFavorite(product.id);

  // Check how many of this current variant are in cart
  const cartItem = cart.find(
    (item) =>
      item.productId === product.id && item.variantId === currentVariant.id
  );
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-purple-100/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all overflow-hidden">
      {/* Top Media Area */}
      <div
        className="relative w-full aspect-4/3 overflow-hidden bg-purple-50/50 dark:bg-slate-800/50 cursor-pointer"
        onClick={() => setSelectedProductForDetail(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Elegant fallback if image path ever fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={isLiked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-xs text-slate-400 hover:text-red-500 transition-colors z-10"
        >
          <Heart
            size={16}
            className={
              isLiked ? 'fill-red-500 text-red-500 scale-110' : 'stroke-[2]'
            }
          />
        </button>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {product.isPopular && (
            <span className="text-[10px] font-extrabold uppercase tracking-wide bg-purple-600 text-white px-2 py-0.5 rounded-md shadow-xs">
              Popular
            </span>
          )}
          {product.spicyLevel !== undefined && product.spicyLevel > 0 && (
            <span className="text-[10px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-xs">
              <Flame size={11} className="fill-white" />
              <span>Nivel {product.spicyLevel}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Info Area */}
      <div className="p-3.5 flex flex-col flex-grow justify-between">
        <div>
          {/* Metadata line: Brand & Origin (unboxed, zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-700 dark:text-purple-300 mb-1">
            <span>{product.brand}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-slate-400 dark:text-slate-500">{product.origin}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Native Name if available */}
          {product.nativeName && (
            <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-0.5 tracking-wide">
              {product.nativeName}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-slate-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Variant Selector (if more than 1 variant) */}
        {product.variants.length > 1 && (
          <div className="mt-2.5">
            <select
              aria-label="Seleccionar presentación o tamaño"
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="w-full text-[11px] font-medium py-1 px-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 outline-none focus:border-purple-400 cursor-pointer"
            >
              {product.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name} — S/ {variant.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Pricing and Stepper Controls */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
                S/ {currentVariant.price.toFixed(2)}
              </span>
              {currentVariant.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  S/ {currentVariant.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {currentVariant.weightOrVolume}
            </span>
          </div>

          {/* Add or Stepper Button */}
          {currentQuantity === 0 ? (
            <button
              onClick={() => addToCart(product, currentVariant.id, 1)}
              aria-label={`Agregar ${product.name} al carrito`}
              className="h-8 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1 shadow-xs shadow-purple-600/20 transition-all shrink-0"
            >
              <Plus size={14} className="stroke-[2.5]" />
              <span>Agregar</span>
            </button>
          ) : (
            <div className="h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900/60 flex items-center px-1 shrink-0">
              <button
                onClick={() =>
                  updateCartQuantity(product.id, currentVariant.id, -1)
                }
                aria-label="Disminuir cantidad"
                className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 flex items-center justify-center hover:bg-purple-200 transition-colors shadow-xs"
              >
                <Minus size={12} className="stroke-[2.5]" />
              </button>
              <span className="w-6 text-center text-xs font-extrabold text-purple-950 dark:text-purple-100 tabular-nums">
                {currentQuantity}
              </span>
              <button
                onClick={() =>
                  updateCartQuantity(product.id, currentVariant.id, 1)
                }
                aria-label="Aumentar cantidad"
                className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700 transition-colors shadow-xs"
              >
                <Plus size={12} className="stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
