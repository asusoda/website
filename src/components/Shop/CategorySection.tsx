import React, { useRef } from "react";
import { Maximize2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "../../lib/api";

interface CategorySectionProps {
  title: string;
  description: string;
  color: string;
  products: Product[];
  orientation?: "horizontal" | "vertical";
  animationDirection?: "left-to-right" | "right-to-left" | "bottom-to-top";
  minHeight?: string;
  onExpand: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  color,
  products,
  orientation = "horizontal",
  animationDirection = "right-to-left",
  minHeight = "250px",
  onExpand,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "100px" });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  if (products.length === 0) return null;

  const getScrollClass = () => {
    switch (animationDirection) {
      case "left-to-right":
        return "scroll-horizontal-reverse";
      case "bottom-to-top":
        return "scroll-vertical";
      default:
        return "scroll-horizontal";
    }
  };

  const getTextClass = () => {
    return orientation === "vertical"
      ? "text-[12rem] font-black text-white uppercase [writing-mode:vertical-lr] rotate-180"
      : "text-[16rem] font-black text-white px-8 italic uppercase";
  };

  const getAnimationVariants = () => {
    if (orientation === "vertical") {
      return {
        hidden: { scaleY: 0, originY: 0 },
        visible: {
          scaleY: 1,
          originY: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      };
    } else {
      return {
        hidden: { scaleX: 0, originX: 0 },
        visible: {
          scaleX: 1,
          originX: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      };
    }
  };

  const getShadowColor = () => {
    return color.includes("blue") ? "rgba(59, 130, 246, 0.6)" : "rgba(239, 68, 68, 0.6)";
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onExpand();
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] cursor-pointer"
      style={{
        minHeight: orientation === "vertical" ? minHeight : "470px",
        maxHeight: orientation === "vertical" ? minHeight : "470px",
        height: orientation === "vertical" ? minHeight : "470px",
        boxShadow: `0 0 25px 6px ${getShadowColor()}, 0 0 40px 10px ${getShadowColor().replace("0.6", "0.15")}`,
      }}
      onClick={onExpand}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title} category`}
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background Blob */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} transition-all duration-300 ease-in-out group-hover:brightness-110 will-change-[filter]`}
      ></div>

      {/* Static Section Title at top */}
      <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-4 pointer-events-none">
        <span className="text-white/90 text-2xl font-bold uppercase tracking-widest">{title}</span>
      </div>

      {/* Background Title - Only render animation when in view */}
      {isInView && (
        <motion.div
          ref={scrollRef}
          className={`absolute inset-0 flex ${orientation === "vertical" ? "flex-col justify-center" : "items-center"} overflow-hidden pointer-events-none group-hover:opacity-10 transition-opacity duration-300 ease-in-out will-change-[opacity]`}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={
            {
              transform: "translateZ(0)",
              backfaceVisibility: "hidden" as const,
            } as React.CSSProperties
          }
        >
          <div
            className={`${getScrollClass()} whitespace-nowrap flex ${orientation === "vertical" ? "flex-col" : ""}`}
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          >
            <h2 className={getTextClass()}>
              {title.toUpperCase()} {title.toUpperCase()} {title.toUpperCase()}{" "}
              {title.toUpperCase()} {title.toUpperCase()} {title.toUpperCase()}
            </h2>
            <h2 className={getTextClass()}>
              {title.toUpperCase()} {title.toUpperCase()} {title.toUpperCase()}{" "}
              {title.toUpperCase()} {title.toUpperCase()} {title.toUpperCase()}
            </h2>
          </div>
        </motion.div>
      )}

      {/* Expand Button - Visible on mobile, hover on desktop */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExpand();
        }}
        className="absolute top-3 right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 z-20 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2"
        aria-label={`Expand ${title} section`}
      >
        <Maximize2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </button>

      {/* Product Cards - Always visible on mobile, hover on desktop */}
      <div className="relative z-10 p-3 md:p-4 lg:p-6 h-full pt-14 md:pt-14 lg:pt-16">
        <div
          className={`grid gap-2 md:gap-3 lg:gap-4 pt-4 md:pt-6 lg:pt-8 ${
            orientation === "vertical" ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {products.slice(0, 3).map((product) => (
            <div key={product.id} className="md:scale-90" onClick={(e) => e.stopPropagation()}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
