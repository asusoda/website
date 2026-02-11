import React, { useEffect, useId } from 'react';
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
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
            className="fixed inset-x-4 top-20 bottom-4 sm:inset-x-6 sm:top-24 sm:bottom-6 md:inset-x-8 md:top-24 md:bottom-8 lg:inset-x-16 lg:top-28 lg:bottom-12 xl:inset-x-20 xl:top-28 xl:bottom-16 z-50 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-[3rem]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${color}`}></div>
            
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between p-4 md:p-6 lg:p-8 border-b border-white/20">
                <div className="text-left flex-1 pr-2">
                  <h2 id={titleId} className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-1 md:mb-2">{name}</h2>
                  <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-2xl">{description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3 transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
              
              {/* Products Grid */}
              <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="transform scale-75 sm:scale-[0.85] md:scale-90 lg:scale-95 xl:scale-100">
                      <ProductCard product={product} />
                    </div>
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
