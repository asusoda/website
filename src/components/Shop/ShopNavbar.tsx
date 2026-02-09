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
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div 
        initial={{ 
          width: "60px", 
        }}
        animate={{ 
          width: isExpanded ? "min(calc(100vw - 2rem), 80rem)" : "60px",
          minWidth: isExpanded ? "320px" : "60px",
        }}
        transition={{ 
          width: {
            duration: 1.5,
            ease: [0.1, 0.8, 0.2, 1]
          }
        }}
        className="relative w-full max-w-7xl bg-gradient-to-br from-zinc-900/40 via-zinc-800/30 to-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 px-4 md:px-6 py-3 overflow-hidden"
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
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img 
                src="/logo/Soda_Logo_Dark_Mode.svg" 
                alt="SoDA Logo" 
                className="h-6 md:h-7 w-auto"
              />
            </Link>
            <Link to="/shop" className="text-white font-semibold text-base md:text-lg px-2 md:px-3 py-1 rounded hover:bg-white/10 transition-colors">
              Shop
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
            <Link
              to="/shop"
              className="px-4 py-2 rounded hover:bg-white/10 transition-colors bg-clip-text text-transparent font-medium"
            >
              Products
            </Link>
            {isSignedIn && (
              <Link
                to="/shop/account"
                className="px-4 py-2 rounded hover:bg-white/10 transition-colors bg-clip-text text-transparent font-medium"
              >
                My Orders
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {/* Cart */}
            <Link
              to="/shop/cart"
              className="relative p-1.5 md:p-2 rounded hover:bg-white/10 transition-colors inline-block"
              aria-label={`Cart (${getCartItemCount()} items)`}
            >
              <ShoppingCart size={20} className="text-white md:w-[22px] md:h-[22px]" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* User Account or Login */}
            {isSignedIn ? (
              <div className="flex items-center space-x-1 md:space-x-2">
                <Link
                  to="/shop/account"
                  className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-2 rounded hover:bg-white/10 transition-colors"
                >
                  <User size={18} className="text-white md:w-5 md:h-5" />
                  <span className="hidden xl:block text-sm text-white">
                    {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 md:p-2 rounded hover:bg-white/10 transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} className="text-white md:w-[18px] md:h-[18px]" />
                </button>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 text-white px-3 md:px-5 py-1.5 md:py-2 rounded-lg font-medium text-xs md:text-sm shadow-lg shadow-blue-500/5 hover:bg-blue-500/20 hover:border-blue-400/30 transition-colors">
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
