import React from "react";

const HandDrawnStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" // Adjust size as needed
    height="24" // Adjust size as needed
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // Inherits text color
    strokeWidth="1.5" // Adjust line thickness
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props} // Allows passing additional props like className
  >
    {/* Single path with slight curves for a rougher, hand-drawn asterisk look */}
    <path d="M12 4 Q 11.5 12 12.2 19.8 M 6 8.5 Q 12 12 18 15.5 M 18 8.5 Q 12 12 6.5 16.2" />
  </svg>
);

export default HandDrawnStar;
