import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Product } from '../../../lib/api';
import { FALLBACK_IMAGES } from '../../../constants/shop';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-zinc-900/90 backdrop-blur-xl rounded-xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-red-500/20 group cursor-pointer border border-zinc-800">
      <Link to={`/shop/product/${product.id}`} className="block">
        <div className="aspect-square bg-zinc-800/50 relative overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-full h-full flex items-center justify-center ${product.image_url ? 'hidden' : ''}`}>
            <img 
              src={FALLBACK_IMAGES.product}
              alt={product.name}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          {product.stock < 10 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
              Only {product.stock} left
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-blue-400">
              {product.price}
            </span>
            <span className="text-gray-500 text-sm">points</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
