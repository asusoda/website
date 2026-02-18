import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Package } from "lucide-react";
import ProductCarousel, { CarouselSlide } from "../../components/Shop/ProductCarousel";
import { EmptyState } from "../../components/Shop/EmptyState";
import { GlitchText } from "../../components/GlitchText";
import { CategoryLayout } from "../../components/Shop/CategoryLayout";
import { useProducts } from "../../hooks/useProducts";
import { motion, useInView } from "framer-motion";
import LoadingSpinner from "../../components/LoadingSpinner";
import PointsBreakdownTable from "../../components/Shop/PointsBreakdownTable";
import "./styles/scrolling-text.css";

const ShopIndex: React.FC = () => {
  const { products, loading, error } = useProducts();
  const productsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(productsRef, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px",
  });

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
          <EmptyState
            icon={Package}
            title="Error Loading Products"
            description={error}
            action={{
              label: "Retry",
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
      id: "featured-1",
      title: "New Arrivals",
      subtitle: "Fresh Drop",
      description: "Check out our latest SoDA merchandise collection",
    },
    {
      id: "featured-2",
      title: "Limited Edition",
      subtitle: "Exclusive",
      description: "Get your hands on exclusive SoDA gear before it's gone",
    },
  ];

  return (
    <>
      <Helmet>
        <title>SoDA Shop - Products</title>
        <meta name="description" content="Browse and purchase SoDA merchandise" />
      </Helmet>
      <div className="min-h-screen bg-black text-white h-screen overflow-y-scroll snap-y snap-mandatory snap-container">
        {/* Hero Carousel Section - Full Screen Snap */}
        <div className="snap-section relative overflow-y-auto lg:overflow-hidden flex flex-col">
          <div className="flex-1 flex flex-col justify-center">
            <ProductCarousel
              slides={carouselSlides}
              autoplayDelay={5000}
              rightPanel={<PointsBreakdownTable />}
            />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <svg
              className="w-8 h-8 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-label="Scroll down"
              role="img"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Products Section - Full Screen Snap */}
        <div className="snap-section bg-black relative z-20 overflow-y-auto">
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8"
            ref={productsRef}
          >
            {/* Header */}
            <motion.div
              id="products"
              className="mb-8 md:mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3">
                <GlitchText
                  text="SoDA Shop"
                  className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                />
              </h1>
              <p className="text-gray-400 text-sm md:text-lg">
                Browse our collection of exclusive merchandise
              </p>
            </motion.div>

            {/* Products Grid */}
            {loading ? (
              <motion.div
                className="flex items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <LoadingSpinner />
              </motion.div>
            ) : products.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No products available"
                description="Check back soon for new merchandise"
                glowColor="bg-red-500/10"
              />
            ) : (
              <>
                {/* Category Sections with Creative Layout */}
                <CategoryLayout products={products} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopIndex;
