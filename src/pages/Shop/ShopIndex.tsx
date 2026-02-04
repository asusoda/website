import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Package } from 'lucide-react';
import ProductCarousel, { CarouselSlide } from '../../components/Shop/ProductCarousel';
import { storefrontAPI, Product } from '../../lib/api';
import { useCart } from '../../lib/CartContext';
import { motion, useInView } from 'framer-motion';

const ShopIndex: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const productsRef = useRef(null);
  const isInView = useInView(productsRef, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontAPI.getProducts();
        setProducts(data.filter((p) => p.stock > 0)); // Only show available products
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>
              </div>
              <Package size={72} className="mx-auto text-red-500 relative z-10" />
            </div>
            <p className="text-red-400 mb-6 text-lg">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-red-500/20 hover:border-red-400/40 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium"
            >
              Retry
            </button>
          </motion.div>
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
      ctaText: 'Shop Now',
      ctaLink: '#products',
    },
    {
      id: 'featured-2',
      title: 'Limited Edition',
      subtitle: 'Exclusive',
      description: 'Get your hands on exclusive SoDA gear before it\'s gone',
      ctaText: 'View Collection',
      ctaLink: '#products',
    },
    {
      id: 'featured-3',
      title: 'Member Favorites',
      subtitle: 'Best Sellers',
      description: 'Most loved items by the SoDA community',
      ctaText: 'Browse',
      ctaLink: '#products',
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
              <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                SoDA Shop
              </h1>
              <p className="text-gray-400 text-lg">Browse our collection of exclusive merchandise</p>
            </motion.div>

            {/* Products Grid */}
          {/* Products Grid */}
          {products.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                </div>
                <Package size={80} className="mx-auto mb-4 text-gray-700 relative z-10" />
              </div>
              <p className="text-gray-400 text-xl">No products available at the moment</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    delay: isInView ? idx * 0.05 : 0,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 transition-all duration-300 shadow-xl hover:shadow-red-500/20 group cursor-pointer"
                >
                  <Link to={`/shop/product/${product.id}`} className="block">
                    <div className="aspect-square bg-zinc-800/50 relative overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={64} className="text-gray-600" />
                        </div>
                      )}
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
                        <span className="text-3xl font-bold text-red-400">
                          {product.price}
                        </span>
                        <span className="text-gray-500 text-sm">points</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
