import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Oops! Page Not Found</h2>
      <img
        src="/teddy-laptop.webp" // Path relative to the public directory
        alt="Cute teddy bear using a laptop"
        className="w-64 h-auto my-8 mx-auto" // Added margin top/bottom and centered
      />
      <p className="text-lg mb-8">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>
      <Button asChild>
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
