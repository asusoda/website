import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Package } from 'lucide-react';
import ProductCarousel, { CarouselSlide } from '../../components/Shop/ProductCarousel';
import { ProductCard } from '../../components/Shop/ProductCard';
import { EmptyState } from '../../components/Shop/EmptyState';
import { GlitchText } from '../../components/GlitchText';
import { useProducts } from '../../hooks/useProducts';
import { motion, useInView } from 'framer-motion';

const ShopIndex: React.FC = () => {
  const { products, loading, error } = useProducts();
  const productsRef = useRef(null);
  const isInView = useInView(productsRef, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" });

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopIndex;
