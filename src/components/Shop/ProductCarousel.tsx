import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export interface CarouselSlide {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
}

interface ProductCarouselProps {
  slides: CarouselSlide[];
  autoplayDelay?: number;
  showControls?: boolean;
  showIndicators?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  slides,
  autoplayDelay = 5000,
  showControls = true,
  showIndicators = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-zinc-900 to-black">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[400px] md:h-[500px] flex items-center justify-center"
                style={{
                  backgroundColor: slide.backgroundColor || '#18181b',
                }}
              >
                {/* Background Image */}
                {slide.imageUrl && (
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {slide.subtitle && (
                      <p className="text-blue-400 font-semibold text-sm md:text-base uppercase tracking-wider mb-2">
                        {slide.subtitle}
                      </p>
                    )}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                      {slide.title}
                    </h2>
                    {slide.description && (
                      <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        {slide.description}
                      </p>
                    )}
                    {slide.ctaText && slide.ctaLink && (
                      <a
                        href={slide.ctaLink}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        {slide.ctaText}
                      </a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
