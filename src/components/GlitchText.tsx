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
  }, [trigger]);

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
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          {text}
        </span>
      )}
      
      {/* Red glitch layer */}
      {isGlitching && (
        <span 
          className="absolute top-0 left-0 w-full h-full text-red-500 opacity-70 animate-glitch-red pointer-events-none"
          style={{ clipPath: 'inset(0 0 0 0)' }}
        >
          {text}
        </span>
      )}
      
      <style>{`
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          2% { transform: translate(-2px, 2px); }
          4% { transform: translate(-2px, -2px); }
          6% { transform: translate(2px, 2px); }
          8% { transform: translate(2px, -2px); }
          10% { transform: translate(-2px, 2px); }
          12% { transform: translate(-2px, -2px); }
          14% { transform: translate(2px, 2px); }
          16% { transform: translate(0); }
        }
        
        @keyframes glitch-blue {
          0%, 100% { transform: translate(0); opacity: 0; }
          2% { transform: translate(-4px, 0); opacity: 0.7; }
          4% { transform: translate(-2px, 0); opacity: 0.7; }
          6% { transform: translate(4px, 0); opacity: 0.7; }
          8% { transform: translate(-4px, 0); opacity: 0.7; }
          10% { transform: translate(3px, 0); opacity: 0.7; }
          12% { transform: translate(-3px, 0); opacity: 0.7; }
          14% { transform: translate(2px, 0); opacity: 0.7; }
          16% { transform: translate(0); opacity: 0; }
        }
        
        @keyframes glitch-red {
          0%, 100% { transform: translate(0); opacity: 0; }
          2% { transform: translate(4px, 0); opacity: 0.7; }
          4% { transform: translate(2px, 0); opacity: 0.7; }
          6% { transform: translate(-4px, 0); opacity: 0.7; }
          8% { transform: translate(4px, 0); opacity: 0.7; }
          10% { transform: translate(-3px, 0); opacity: 0.7; }
          12% { transform: translate(3px, 0); opacity: 0.7; }
          14% { transform: translate(-2px, 0); opacity: 0.7; }
          16% { transform: translate(0); opacity: 0; }
        }
        
        .animate-glitch {
          animation: glitch 0.8s ease-in-out;
        }
        
        .animate-glitch-blue {
          animation: glitch-blue 0.8s ease-in-out;
        }
        
        .animate-glitch-red {
          animation: glitch-red 0.8s ease-in-out;
        }
      `}</style>
    </span>
  );
};
