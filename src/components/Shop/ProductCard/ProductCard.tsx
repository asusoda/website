import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../lib/api';
import { FALLBACK_IMAGES } from '../../../constants/shop';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const hasValidImage = !!product.image_url && !hasImageError;

  return (
    <div className="bg-zinc-900/90 backdrop-blur-xl rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-red-500/20 group cursor-pointer border border-zinc-800">
      <Link to={`/shop/product/${product.id}`} className="block">
        <div className="aspect-square bg-zinc-800/50 relative overflow-hidden">
          {hasValidImage ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={() => {
                setHasImageError(true);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={FALLBACK_IMAGES.product}
                alt={product.name}
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          )}
          {product.stock < 10 && (
            <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-red-500 text-white text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-full font-semibold shadow-lg">
              Only {product.stock} left
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-3 md:p-4 lg:p-5">
          <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2 md:mb-3 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-baseline space-x-1.5 md:space-x-2">
            <span className="text-2xl md:text-3xl font-bold text-blue-400">
              {product.price}
            </span>
            <span className="text-gray-500 text-xs md:text-sm">points</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
