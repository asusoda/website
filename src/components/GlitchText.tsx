import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
        {text}
      
         </span>
  );
};
