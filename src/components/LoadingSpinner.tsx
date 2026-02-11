import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div 
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-full animate-spin-slow">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-blue-500 opacity-75 blur-sm"></div>
        </div>
        
        {/* Static gradient border for depth */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 via-red-500/30 to-blue-500/30 animate-pulse"></div>
        
        {/* Logo container */}
        <div className="relative bg-black rounded-full p-8 border-4 border-transparent">
          <img 
            src="/logo/Soda_Logo_Dark_Mode.svg" 
            alt="SoDA Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
