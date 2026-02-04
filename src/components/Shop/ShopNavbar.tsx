import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useUser, useClerk, SignInButton } from '@clerk/clerk-react';
import { useCart } from '../../lib/CartContext';
import { motion } from 'framer-motion';

const ShopNavbar: React.FC = () => {
  const { getCartItemCount } = useCart();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    // Trigger expansion after component mounts
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <motion.div 
        initial={{ 
          width: "80px", 
        }}
        animate={{ 
          width: isExpanded ? "min(95vw, 80rem)" : "80px", 
        }}
        transition={{ 
          width: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }
        }}
        className="relative bg-gradient-to-br from-zinc-900/40 via-zinc-800/30 to-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 px-6 py-3 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.4) 0%, rgba(39, 39, 42, 0.3) 50%, rgba(24, 24, 27, 0.4) 100%)',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.08), 0 0 40px rgba(239, 68, 68, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Glossy overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
        <motion.div 
          className="flex items-center justify-between relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img 
                src="/logo/Soda_Logo_Dark_Mode.svg" 
                alt="SoDA Logo" 
                className="h-7 w-auto"
              />
            </Link>
            <Link to="/shop" className="text-white font-semibold text-lg hover:text-red-500 transition-colors duration-200">
              Shop
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
            <Link
              to="/shop"
              className="text-gray-300 hover:text-red-500 px-4 py-2 transition-colors duration-200"
            >
              Products
            </Link>
            {isSignedIn && (
              <Link
                to="/shop/account"
                className="text-gray-300 hover:text-red-500 px-4 py-2 transition-colors duration-200"
              >
                My Orders
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
            <Link
              to="/shop/cart"
              className="relative text-gray-300 hover:text-red-500 p-2 transition-colors duration-200"
              aria-label={`Cart (${getCartItemCount()} items)`}
            >
              <ShoppingCart size={22} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* User Account or Login */}
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/shop/account"
                  className="flex items-center space-x-2 text-gray-300 hover:text-red-500 px-3 py-2 transition-colors duration-200"
                >
                  <User size={20} />
                  <span className="hidden lg:block text-sm">
                    {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 p-2 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white px-5 py-2 rounded-lg transition-all duration-200 font-medium text-sm shadow-lg shadow-blue-500/5">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default ShopNavbar;
