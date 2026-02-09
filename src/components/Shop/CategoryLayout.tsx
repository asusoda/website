import React, { useState } from 'react';
import { CategorySection } from './CategorySection';
import { CategoryPopup } from './CategoryPopup';
import { Product } from '../../lib/api';

interface CategoryLayoutProps {
  products: Product[];
}

interface CategoryConfig {
  name: string;
  description: string;
  color: string;
  keywords: string[];
  orientation?: 'horizontal' | 'vertical';
  animationDirection?: 'left-to-right' | 'right-to-left' | 'bottom-to-top';
}

const categories: CategoryConfig[] = [
  {
    name: 'Hoodies',
    description: 'Stay warm and stylish with our premium SoDA hoodies. Perfect for coding sessions and casual wear.',
    color: 'from-red-600/60 via-red-700/50 to-red-800/40',
    keywords: ['hoodie', 'hoodies'],
    animationDirection: 'right-to-left',
  },
  {
    name: 'T-Shirts',
    description: 'Express your love for coding with our comfortable and stylish SoDA t-shirts.',
    color: 'from-blue-600/80 via-blue-700/70 to-blue-800/60',
    keywords: ['tshirt', 't-shirt', 'shirt'],
    animationDirection: 'left-to-right',
  },
  {
    name: 'Stickers',
    description: 'Customize your laptop, notebook, or water bottle with our fun SoDA sticker packs.',
    color: 'from-red-500/60 via-red-600/50 to-red-700/40',
    keywords: ['sticker', 'decal'],
    animationDirection: 'right-to-left',
  },
  {
    name: 'Water Bottles',
    description: 'Stay hydrated in style with our durable SoDA water bottles and flasks.',
    color: 'from-blue-500/80 via-blue-600/70 to-blue-700/60',
    keywords: ['bottle', 'flask', 'hydro'],
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

  // Filter products by category
  const categorizedProducts = categories.map(category => ({
    ...category,
    products: products.filter(p => {
      const productNameLower = p.name.toLowerCase();
      return category.keywords.some(keyword => {
        const keywordLower = keyword.toLowerCase();
        // Use word boundaries to avoid false positives
        const regex = new RegExp(`\\b${keywordLower}\\b`, 'i');
        return regex.test(productNameLower);
      });
    }),
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
