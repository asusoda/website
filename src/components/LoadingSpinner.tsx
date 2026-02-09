import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
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
      </div>
    </div>
  );
};

export default LoadingSpinner;
