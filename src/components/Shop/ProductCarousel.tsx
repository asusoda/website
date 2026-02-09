import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CarouselSlide {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
}

interface ProductCarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
  videoUrl?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  slides,
  autoplayDelay = 5000,
  videoUrl = 'https://framerusercontent.com/assets/sRXQsZpCuTpukMUfotGcRUuvg.mp4', // Default video
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [slides.length, autoplayDelay]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <>
      {/* Video Background - extends behind navbar and through header */}
      <div className="fixed top-0 left-0 right-0 h-[100vh] md:h-[90vw] pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
          onLoadedData={() => setVideoLoaded(true)}
          style={{ opacity: videoLoaded ? 0.4 : 0, transition: 'opacity 0.3s ease-in' }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Colored overlay - red and blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-purple-500/30 to-red-600/60" />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Carousel Content */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] z-10 pt-24 md:pt-32">
        {/* Animated Text Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, x: -60, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 60, scale: 0.95 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentSlide.subtitle && (
                    <motion.p 
                      className="text-blue-400 font-semibold text-xs md:text-sm lg:text-base uppercase tracking-wider mb-2 md:mb-3"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                    >
                      {currentSlide.subtitle}
                    </motion.p>
                  )}
                  <motion.h2 
                    className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white mb-2 md:mb-3 leading-tight"
                    initial={{ opacity: 0, x: -50, rotateX: -15 }}
                    animate={{ opacity: 1, x: 0, rotateX: 0 }}
                    transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentSlide.title}
                  </motion.h2>
                  {currentSlide.description && (
                    <motion.p 
                      className="text-gray-300 text-sm md:text-lg lg:text-2xl mb-6 md:mb-10 max-w-2xl"
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                    >
                      {currentSlide.description}
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>
            
            {/* Static CTA Button */}
            <a
              href="#products"
              className="inline-block bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white font-semibold px-6 py-3 md:px-10 md:py-4 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-sm md:text-base lg:text-lg"
            >
              Shop Now
            </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
