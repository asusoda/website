import React, { useState } from 'react';
import { CategorySection } from './CategorySection';
import { CategoryPopup } from './CategoryPopup';
import { Product } from '../../lib/api';

interface CategoryLayoutProps {
  products: Product[];
}

interface CategoryConfig {
  id: string;
  name: string;
  description: string;
  color: string;
  orientation?: 'horizontal' | 'vertical';
  animationDirection?: 'left-to-right' | 'right-to-left' | 'bottom-to-top';
}

const categories: CategoryConfig[] = [
  {
    id: 'hoodies',
    name: 'Hoodies',
    description: 'Stay warm and stylish with our premium SoDA hoodies. Perfect for coding sessions and casual wear.',
    color: 'from-red-600/60 via-red-700/50 to-red-800/40',
    animationDirection: 'right-to-left',
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    description: 'Express your love for coding with our comfortable and stylish SoDA t-shirts.',
    color: 'from-blue-600/80 via-blue-700/70 to-blue-800/60',
    animationDirection: 'left-to-right',
  },
  {
    id: 'stickers',
    name: 'Stickers',
    description: 'Customize your laptop, notebook, or water bottle with our fun SoDA sticker packs.',
    color: 'from-red-500/60 via-red-600/50 to-red-700/40',
    animationDirection: 'right-to-left',
  },
  {
    id: 'water-bottles',
    name: 'Water Bottles',
    description: 'Stay hydrated in style with our durable SoDA water bottles and flasks.',
    color: 'from-blue-500/80 via-blue-600/70 to-blue-700/60',
    orientation: 'vertical',
    animationDirection: 'bottom-to-top',
  },
];

export const CategoryLayout: React.FC<CategoryLayoutProps> = ({ products }) => {
  const [popupData, setPopupData] = useState<{
    name: string;
    description: string;
    color: string;
    products: Product[];
  } | null>(null);

  // Filter products by category field
  const categorizedProducts = categories.map(category => ({
    ...category,
    products: products.filter(p => p.category === category.id),
  }));

  // Separate vertical and horizontal categories
  const horizontalCategories = categorizedProducts.filter(c => c.orientation !== 'vertical' && c.products.length > 0);
  const verticalCategories = categorizedProducts.filter(c => c.orientation === 'vertical' && c.products.length > 0);

  // Calculate heights for dynamic layout
  const leftSectionCount = horizontalCategories.length;
  const leftSectionTotalHeight = leftSectionCount * 180 + (leftSectionCount - 1) * 32;
  const bottleHeight = Math.max(1000, leftSectionTotalHeight);
  const shouldShowBottlesColumn = verticalCategories.length > 0 && bottleHeight >= 700;

  return (
    <>
      <div className={`${shouldShowBottlesColumn ? 'flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-14' : 'w-full'} max-w-6xl mx-auto`}>
        {/* Left/Main Column - Horizontal sections */}
        <div className={`${shouldShowBottlesColumn ? 'flex-1 space-y-10 md:space-y-12 lg:space-y-14' : 'w-full space-y-10 md:space-y-12 lg:space-y-14'}`}>
          {horizontalCategories.map((category) => (
            <CategorySection
              key={category.name}
              title={category.name}
              description={category.description}
              color={category.color}
              products={category.products}
              orientation="horizontal"
              animationDirection={category.animationDirection}
              minHeight="180px"
              onExpand={() => setPopupData({
                name: category.name,
                description: category.description,
                color: category.color,
                products: category.products,
              })}
            />
          ))}
        </div>

        {/* Right Column - Vertical sections (desktop only) */}
        {shouldShowBottlesColumn && verticalCategories.map((category) => (
          <div key={category.name} className="hidden lg:block w-80 shrink-0">
            <CategorySection
              title={category.name}
              description={category.description}
              color={category.color}
              products={category.products}
              orientation="vertical"
              animationDirection={category.animationDirection}
              minHeight={`${bottleHeight}px`}
              onExpand={() => setPopupData({
                name: category.name,
                description: category.description,
                color: category.color,
                products: category.products,
              })}
            />
          </div>
        ))}

        {/* Mobile version of vertical sections */}
        <div className="lg:hidden space-y-10 md:space-y-12">
          {verticalCategories.map((category) => (
            <CategorySection
              key={`${category.name}-mobile`}
              title={category.name}
              description={category.description}
              color={category.color}
              products={category.products}
              orientation="horizontal"
              animationDirection="right-to-left"
              minHeight="250px"
              onExpand={() => setPopupData({
                name: category.name,
                description: category.description,
                color: category.color,
                products: category.products,
              })}
            />
          ))}
        </div>
      </div>

      {/* Category Popup */}
      <CategoryPopup
        isOpen={!!popupData}
        onClose={() => setPopupData(null)}
        name={popupData?.name || ''}
        description={popupData?.description || ''}
        color={popupData?.color || ''}
        products={popupData?.products || []}
      />
    </>
  );
};
