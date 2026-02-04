import React from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from '../../lib/api';

interface CategoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  color: string;
  products: Product[];
}

export const CategoryPopup: React.FC<CategoryPopupProps> = ({
  isOpen,
  onClose,
  name,
  description,
  color,
  products,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50"
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-4 md:inset-8 lg:inset-20 xl:inset-24 z-50 overflow-hidden rounded-3xl md:rounded-[3rem]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${color}`}></div>
            
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/20">
                <div className="text-center flex-1">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{name}</h2>
                  <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">{description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3 transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
              
              {/* Products Grid */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
