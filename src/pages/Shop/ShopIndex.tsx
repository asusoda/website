import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Package, Maximize2, X } from 'lucide-react';
import ProductCarousel, { CarouselSlide } from '../../components/Shop/ProductCarousel';
import { ProductCard } from '../../components/Shop/ProductCard';
import { EmptyState } from '../../components/Shop/EmptyState';
import { GlitchText } from '../../components/GlitchText';
import { useProducts } from '../../hooks/useProducts';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './styles/scrolling-text.css';
import { Product } from '../../types/product';

interface CategoryPopupData {
  name: string;
  description: string;
  color: string;
  products: Product[];
}

const ShopIndex: React.FC = () => {
  const { products, loading, error } = useProducts();
  const productsRef = useRef(null);
  const isInView = useInView(productsRef, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" });
  const [popupData, setPopupData] = useState<CategoryPopupData | null>(null);

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
          <EmptyState
            icon={Package}
            title="Error Loading Products"
            description={error}
            action={{
              label: 'Retry',
              onClick: () => window.location.reload(),
            }}
            glowColor="bg-red-500/20"
          />
        </div>
      </>
    );
  }

  // Carousel slides - can be fetched from API or configured
  const carouselSlides: CarouselSlide[] = [
    {
      id: 'featured-1',
      title: 'New Arrivals',
      subtitle: 'Fresh Drop',
      description: 'Check out our latest SoDA merchandise collection',
    },
    {
      id: 'featured-2',
      title: 'Limited Edition',
      subtitle: 'Exclusive',
      description: 'Get your hands on exclusive SoDA gear before it\'s gone',
    },
   
  ];

  return (
    <>
      <Helmet>
        <title>SoDA Shop - Products</title>
        <meta name="description" content="Browse and purchase SoDA merchandise" />
      </Helmet>
      <div className="min-h-screen bg-black text-white h-screen overflow-y-scroll snap-y snap-mandatory snap-container">
        <style>{`
          /* Smooth scroll with custom easing and duration */
          .snap-container {
            scroll-behavior: smooth;
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
            height: 100vh;
            scroll-padding: 0;
          }
          
          /* Add smooth scroll polyfill for better control */
          @supports (scroll-behavior: smooth) {
            .snap-container {
              scroll-behavior: smooth;
            }
          }
          
          /* Prevent overscroll */
          .snap-container {
            overscroll-behavior-y: contain;
            -webkit-overflow-scrolling: touch;
          }
          
          .snap-section {
            scroll-snap-align: start;
            scroll-snap-stop: always;
            height: 100vh;
            scroll-margin-top: 0;
          }
          
          /* Smooth scroll timing */
          * {
            scroll-behavior: smooth !important;
          }
          
          html {
            scroll-behavior: smooth;
          }
        `}</style>
        
        <script dangerouslySetInnerHTML={{__html: `
          // Enhanced smooth scroll with custom easing
          (function() {
            let isScrolling = false;
            const container = document.querySelector('.snap-container');
            
            if (container) {
              container.addEventListener('wheel', function(e) {
                if (isScrolling) {
                  e.preventDefault();
                  return;
                }
                
                const delta = e.deltaY;
                const scrollThreshold = 50;
                
                if (Math.abs(delta) > scrollThreshold) {
                  e.preventDefault();
                  isScrolling = true;
                  
                  const sections = document.querySelectorAll('.snap-section');
                  const currentScroll = container.scrollTop;
                  const viewportHeight = window.innerHeight;
                  
                  let targetSection = 0;
                  sections.forEach((section, index) => {
                    const sectionTop = section.offsetTop;
                    if (delta > 0 && sectionTop > currentScroll + 10) {
                      if (targetSection === 0) targetSection = sectionTop;
                    } else if (delta < 0 && sectionTop < currentScroll - 10) {
                      targetSection = sectionTop;
                    }
                  });
                  
                  // Smooth scroll with easing
                  const start = container.scrollTop;
                  const distance = targetSection - start;
                  const duration = 1200; // 1.2 seconds
                  const startTime = performance.now();
                  
                  function easeInOutCubic(t) {
                    return t < 0.5 
                      ? 4 * t * t * t 
                      : 1 - Math.pow(-2 * t + 2, 3) / 2;
                  }
                  
                  function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = easeInOutCubic(progress);
                    
                    container.scrollTop = start + (distance * eased);
                    
                    if (progress < 1) {
                      requestAnimationFrame(animate);
                    } else {
                      isScrolling = false;
                    }
                  }
                  
                  requestAnimationFrame(animate);
                }
              }, { passive: false });
            }
          })();
        `}} />
        
        {/* Hero Carousel Section - Full Screen Snap */}
        <div className="snap-section relative overflow-hidden flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <ProductCarousel slides={carouselSlides} autoplayDelay={5000} />
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Products Section - Full Screen Snap */}
        <div className="snap-section bg-black relative z-20 overflow-y-auto">
          <div className="container mx-auto px-4 pt-32 pb-8" ref={productsRef}>
            {/* Header */}
            <motion.div 
              id="products" 
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-bold mb-3">
                <GlitchText 
                  text="SoDA Shop" 
                  className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                  trigger={isInView}
                />
              </h1>
              <p className="text-gray-400 text-lg">Browse our collection of exclusive merchandise</p>
            </motion.div>

            {/* Products Grid */}
          {products.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No products available"
              description="Check back soon for new merchandise"
              glowColor="bg-red-500/10"
            />
          ) : (
            <>
              {/* All Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Category Sections with Creative Layout */}
              {(() => {
                const bottleProducts = products.filter(p => p.name.toLowerCase().includes('bottle') || p.name.toLowerCase().includes('flask') || p.name.toLowerCase().includes('hydro'));
                const hoodieProducts = products.filter(p => p.name.toLowerCase().includes('hoodie') || p.name.toLowerCase().includes('hoodies'));
                const tshirtProducts = products.filter(p => p.name.toLowerCase().includes('tshirt') || p.name.toLowerCase().includes('t-shirt') || p.name.toLowerCase().includes('shirt'));
                const stickerProducts = products.filter(p => p.name.toLowerCase().includes('sticker') || p.name.toLowerCase().includes('decal'));
                
                // Calculate approximate heights needed
                const leftSectionCount = [hoodieProducts, tshirtProducts, stickerProducts].filter(arr => arr.length > 0).length;
                const leftSectionTotalHeight = leftSectionCount * 350 + (leftSectionCount - 1) * 32; // 350px per section + 32px gap
                const bottleHeight = Math.max(1000, leftSectionTotalHeight);
                const hasBottles = bottleProducts.length > 0;
                
                // Determine if bottles section should overlap with certain left sections
                const shouldShowBottlesColumn = hasBottles && bottleHeight >= 700;
                
                return (
                  <div className={shouldShowBottlesColumn ? "flex gap-8" : "w-full"}>
                    {/* Left Column - Hoodies, T-Shirts, Stickers */}
                    <div className={shouldShowBottlesColumn ? "flex-1 space-y-8" : "w-full space-y-8"}>
                  {/* Hoodies Section */}
                  {(() => {
                    if (hoodieProducts.length === 0) return null;
                    
                    return (
                      <div className="relative group overflow-hidden rounded-[3rem]" style={{ minHeight: '250px' }}>
                        {/* Background Blob */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-red-700/70 to-red-800/60 transition-all duration-500 ease-in-out group-hover:from-red-600/90 group-hover:via-red-700/80 group-hover:to-red-800/70"></div>
                        
                        {/* Background Title - Always Visible */}
                        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity duration-500 ease-in-out">
                          <div className="scroll-horizontal whitespace-nowrap flex">
                            <h2 className="text-[24rem] font-black text-white px-8 italic uppercase">
                              HOODIES HOODIES HOODIES HOODIES HOODIES HOODIES 
                            </h2>
                            <h2 className="text-[24rem] font-black text-white px-8 italic uppercase">
                              HOODIES HOODIES HOODIES HOODIES HOODIES HOODIES 
                            </h2>
                          </div>
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => setPopupData({
                            name: 'Hoodies',
                            description: 'Stay warm and stylish with our premium SoDA hoodies. Perfect for coding sessions and casual wear.',
                            color: 'from-red-600/80 via-red-700/70 to-red-800/60',
                            products: hoodieProducts
                          })}
                          className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3"
                        >
                          <Maximize2 className="w-6 h-6 text-white" />
                        </button>

                        {/* Hover View - Product Cards */}
                        <div className="relative z-10 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-8">
                            {hoodieProducts.map((product) => (
                              <div key={product.id}>
                                <ProductCard product={product} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* T-Shirts Section */}
                  {(() => {
                    if (tshirtProducts.length === 0) return null;
                    
                    return (
                      <div className="relative group overflow-hidden rounded-[3rem]" style={{ minHeight: '250px' }}>
                        {/* Background Blob */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/70 to-blue-800/60 transition-all duration-500 ease-in-out group-hover:from-blue-600/90 group-hover:via-blue-700/80 group-hover:to-blue-800/70"></div>
                        
                        {/* Background Title - Always Visible */}
                        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity duration-500 ease-in-out">
                          <div className="scroll-horizontal whitespace-nowrap flex">
                            <h2 className="text-[24rem] font-black text-white px-8 italic uppercase">
                              T-SHIRTS T-SHIRTS T-SHIRTS T-SHIRTS T-SHIRTS T-SHIRTS 
                            </h2>
                            <h2 className="text-[24rem] font-black text-white px-8 italic uppercase">
                              T-SHIRTS T-SHIRTS T-SHIRTS T-SHIRTS T-SHIRTS T-SHIRTS 
                            </h2>
                          </div>
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => setPopupData({
                            name: 'T-Shirts',
                            description: 'Express your love for coding with our comfortable and stylish SoDA t-shirts.',
                            color: 'from-blue-600/80 via-blue-700/70 to-blue-800/60',
                            products: tshirtProducts
                          })}
                          className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3"
                        >
                          <Maximize2 className="w-6 h-6 text-white" />
                        </button>

                        {/* Hover View - Product Cards */}
                        <div className="relative z-10 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-8">
                            {tshirtProducts.map((product) => (
                              <div key={product.id}>
                                <ProductCard product={product} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Stickers Section */}
                  {(() => {
                    if (stickerProducts.length === 0) return null;
                    
                    return (
                      <div className="relative group overflow-hidden rounded-[3rem]" style={{ minHeight: '250px' }}>
                        {/* Background Blob */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/80 via-red-600/70 to-red-700/60 transition-all duration-500 ease-in-out group-hover:from-red-500/90 group-hover:via-red-600/80 group-hover:to-red-700/70"></div>
                        
                        {/* Background Title - Always Visible */}
                        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity duration-500 ease-in-out">
                          <div className="scroll-horizontal whitespace-nowrap flex">
                            <h2 className="text-[24rem] font-black text-white px-8 italic uppercase">
                              STICKERS STICKERS STICKERS STICKERS STICKERS STICKERS 
                            </h2>
                            <h2 className="text-[24rem] font-black text-white px-8 italic uppercase">
                              STICKERS STICKERS STICKERS STICKERS STICKERS STICKERS 
                            </h2>
                          </div>
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => setPopupData({
                            name: 'Stickers',
                            description: 'Customize your laptop, notebook, or water bottle with our fun SoDA sticker packs.',
                            color: 'from-red-500/80 via-red-600/70 to-red-700/60',
                            products: stickerProducts
                          })}
                          className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3"
                        >
                          <Maximize2 className="w-6 h-6 text-white" />
                        </button>

                        {/* Hover View - Product Cards */}
                        <div className="relative z-10 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-8">
                            {stickerProducts.map((product) => (
                              <div key={product.id}>
                                <ProductCard product={product} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Right Column - Water Bottles (Vertical Full Height) */}
                {shouldShowBottlesColumn && (() => {
                  if (bottleProducts.length === 0) return null;
                  
                  return (
                    <div className="w-64 shrink-0 group">
                      <div className="relative overflow-hidden rounded-[3rem]" style={{ minHeight: `${bottleHeight}px` }}>
                        {/* Background Blob */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-blue-600/70 to-blue-700/60 transition-all duration-500 ease-in-out group-hover:from-blue-500/90 group-hover:via-blue-600/80 group-hover:to-blue-700/70"></div>
                        
                        {/* Background Title - Always Visible (Vertical) */}
                        <div className="absolute inset-0 flex justify-center overflow-hidden pointer-events-none opacity-30 group-hover:opacity-10 transition-opacity duration-500 ease-in-out">
                          <div className="scroll-vertical whitespace-nowrap">
                            <h2 className="text-9xl font-black text-white py-8 transform rotate-180 italic uppercase" style={{ writingMode: 'vertical-rl' }}>
                              WATER BOTTLES WATER BOTTLES WATER BOTTLES WATER BOTTLES WATER BOTTLES 
                            </h2>
                            <h2 className="text-9xl font-black text-white py-8 transform rotate-180 italic uppercase" style={{ writingMode: 'vertical-rl' }}>
                              WATER BOTTLES WATER BOTTLES WATER BOTTLES WATER BOTTLES WATER BOTTLES 
                            </h2>
                          </div>
                        </div>

                        {/* Expand Button */}
                        <button
                          onClick={() => setPopupData({
                            name: 'Water Bottles',
                            description: 'Stay hydrated in style with our premium SoDA water bottles. Perfect for the gym, office, or coding marathons.',
                            color: 'from-blue-500/80 via-blue-600/70 to-blue-700/60',
                            products: bottleProducts
                          })}
                          className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3"
                        >
                          <Maximize2 className="w-6 h-6 text-white" />
                        </button>

                        {/* Hover View - Product Cards */}
                        <div className="relative z-10 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                          <div className="flex flex-col gap-6 pt-8">
                            {bottleProducts.map((product) => (
                              <div key={product.id}>
                                <ProductCard product={product} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                </div>
              );
            })()}
            </>
          )}
          </div>
        </div>

        {/* Category Popup Modal */}
        <AnimatePresence>
          {popupData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={() => setPopupData(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative w-full max-w-7xl h-[85vh] overflow-y-auto rounded-[3rem] bg-gradient-to-br ${popupData.color} p-8`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setPopupData(null)}
                  className="absolute top-6 right-6 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Header */}
                <div className="mb-8 text-center">
                  <h2 className="text-6xl font-black text-white mb-4 uppercase">
                    {popupData.name}
                  </h2>
                  <p className="text-xl text-white/90">
                    {popupData.description}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {popupData.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ShopIndex;
