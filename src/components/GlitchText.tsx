import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', trigger = false }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (trigger && !isGlitching) {
      setIsGlitching(true);
      const timer = setTimeout(() => {
        setIsGlitching(false);
      }, 800); // Duration of glitch animation
      return () => clearTimeout(timer);
    }
  }, [trigger, isGlitching]);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className={`relative z-10 ${isGlitching ? 'animate-glitch' : ''}`}>
        {text}
      </span>
      
      {/* Blue glitch layer */}
      {isGlitching && (
        <span 
          className="absolute top-0 left-0 w-full h-full text-blue-500 opacity-70 animate-glitch-blue pointer-events-none"
        >
          {text}
        </span>
      )}
      
      {/* Red glitch layer */}
      {isGlitching && (
        <span 
          className="absolute top-0 left-0 w-full h-full text-red-500 opacity-70 animate-glitch-red pointer-events-none"
        >
          {text}
        </span>
      )}
    </span>
  );
};
