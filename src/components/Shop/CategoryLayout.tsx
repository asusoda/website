import React, { useState, useMemo } from 'react';
import { CategorySection } from './CategorySection';
import { CategoryPopup } from './CategoryPopup';
import { Product } from '../../lib/api';

interface CategoryLayoutProps {
  products: Product[];
}

// Define color patterns for categories (alternating blue/red)
const colorPatterns = {
  blue: 'from-blue-600/80 via-blue-700/70 to-blue-800/60',
  red: 'from-red-600/60 via-red-700/50 to-red-800/40',
};

export const CategoryLayout: React.FC<CategoryLayoutProps> = ({ products }) => {
  const [popupData, setPopupData] = useState<{
    name: string;
    description: string;
    color: string;
    products: Product[];
  } | null>(null);

  // Calculate category value and sort categories
  const sortedCategories = useMemo(() => {
    // Group products by category
    const categoryGroups = products.reduce((acc, product) => {
      if (!product.category) return acc;
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);

    // Calculate category value (weighted sum of quantity * price)
    const categoryValues = Object.entries(categoryGroups).map(([categoryId, categoryProducts]) => {
      const categoryValue = categoryProducts.reduce((sum, product) => {
        return sum + (product.stock * product.price);
      }, 0);

      return {
        id: categoryId,
        value: categoryValue,
        products: categoryProducts,
      };
    });

    // Sort by category value (descending)
    return categoryValues.sort((a, b) => b.value - a.value);
  }, [products]);

  // Assign layout properties to each category dynamically
  const categoriesWithLayout = useMemo(() => {
    return sortedCategories.map((cat, index) => {
      // Determine position in the pattern: [0,1,2], [3,4,5], [6,7,8]...
      const groupIndex = Math.floor(index / 3);
      const positionInGroup = index % 3;
      
      // Determine if this group is inverted (odd groups)
      const isInverted = groupIndex % 2 === 1;
      
      // Assign orientation and animation
      let orientation: 'horizontal' | 'vertical';
      let animationDirection: 'left-to-right' | 'right-to-left' | 'bottom-to-top';
      
      if (positionInGroup === 2) {
        // Third item in group is vertical
        orientation = 'vertical';
        animationDirection = 'bottom-to-top';
      } else {
        // First two items are horizontal
        orientation = 'horizontal';
        // Alternate animation direction
        animationDirection = positionInGroup === 0 ? 'right-to-left' : 'left-to-right';
      }

      // Assign colors based on position
      // Normal groups: [blue, blue, red], Inverted groups: [red, red, blue]
      let color: string;
      if (isInverted) {
        // Inverted pattern: red, red, blue
        color = positionInGroup === 2 ? colorPatterns.blue : colorPatterns.red;
      } else {
        // Normal pattern: blue, blue, red
        color = positionInGroup === 2 ? colorPatterns.red : colorPatterns.blue;
      }
      
      // Format category name (capitalize and format)
      const name = cat.id
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Generate description dynamically
      const description = `Explore our collection of ${name.toLowerCase()}.`;

      return {
        id: cat.id,
        name,
        description,
        color,
        orientation,
        animationDirection,
        products: cat.products,
        value: cat.value,
        isInverted,
        positionInGroup,
      };
    });
  }, [sortedCategories]);

  // Group categories into groups of 3 for layout
  const categoryGroups = useMemo(() => {
    const groups: typeof categoriesWithLayout[] = [];
    for (let i = 0; i < categoriesWithLayout.length; i += 3) {
      groups.push(categoriesWithLayout.slice(i, i + 3));
    }
    return groups;
  }, [categoriesWithLayout]);

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-10 md:space-y-12 lg:space-y-14">
        {categoryGroups.map((group, groupIndex) => {
          const isInverted = groupIndex % 2 === 1;
          const horizontalCategories = group.filter(c => c.orientation === 'horizontal');
          const verticalCategory = group.find(c => c.orientation === 'vertical');
          
          // Calculate height for vertical category
          const leftSectionCount = horizontalCategories.length;
          const leftSectionTotalHeight = leftSectionCount * 180 + (leftSectionCount - 1) * 32;
          const verticalHeight = Math.max(1000, leftSectionTotalHeight);
          const shouldShowVerticalColumn = !!verticalCategory && verticalHeight >= 700;

          return (
            <div 
              key={groupIndex}
              className={`${
                shouldShowVerticalColumn 
                  ? 'flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-14' 
                  : 'w-full'
              }`}
            >
              {/* Inverted: Vertical on left, Horizontal on right */}
              {isInverted && shouldShowVerticalColumn && verticalCategory && (
                <div className="hidden lg:block w-80 shrink-0">
                  <CategorySection
                    title={verticalCategory!.name}
                    description={verticalCategory!.description}
                    color={verticalCategory!.color}
                    products={verticalCategory!.products}
                    orientation="vertical"
                    animationDirection={verticalCategory!.animationDirection}
                    minHeight={`${verticalHeight}px`}
                    onExpand={() => setPopupData({
                      name: verticalCategory!.name,
                      description: verticalCategory!.description,
                      color: verticalCategory!.color,
                      products: verticalCategory!.products,
                    })}
                  />
                </div>
              )}

              {/* Horizontal categories */}
              <div className={`${shouldShowVerticalColumn ? 'flex-1' : 'w-full'} space-y-10 md:space-y-12 lg:space-y-14`}>
                {horizontalCategories.map((category) => (
                  <CategorySection
                    key={category.id}
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

              {/* Normal: Vertical on right, Horizontal on left */}
              {!isInverted && shouldShowVerticalColumn && verticalCategory && (
                <div className="hidden lg:block w-80 shrink-0">
                  <CategorySection
                    title={verticalCategory!.name}
                    description={verticalCategory!.description}
                    color={verticalCategory!.color}
                    products={verticalCategory!.products}
                    orientation="vertical"
                    animationDirection={verticalCategory!.animationDirection}
                    minHeight={`${verticalHeight}px`}
                    onExpand={() => setPopupData({
                      name: verticalCategory!.name,
                      description: verticalCategory!.description,
                      color: verticalCategory!.color,
                      products: verticalCategory!.products,
                    })}
                  />
                </div>
              )}

              {/* Mobile version of vertical category */}
              {verticalCategory && (
                <div className="lg:hidden">
                  <CategorySection
                    title={verticalCategory!.name}
                    description={verticalCategory!.description}
                    color={verticalCategory!.color}
                    products={verticalCategory!.products}
                    orientation="horizontal"
                    animationDirection="right-to-left"
                    minHeight="250px"
                    onExpand={() => setPopupData({
                      name: verticalCategory!.name,
                      description: verticalCategory!.description,
                      color: verticalCategory!.color,
                      products: verticalCategory!.products,
                    })}
                  />
                </div>
              )}
            </div>
          );
        })}
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
