import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', trigger = false }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
        {text}
      
         </span>
  );
};
