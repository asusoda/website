import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useUser, useClerk, SignInButton } from '@clerk/clerk-react';
import { useCart } from '../../lib/CartContext';

const ShopNavbar: React.FC = () => {
  const { getCartItemCount } = useCart();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/shop" className="flex items-center space-x-3">
            <img 
              src="/logo/Soda_Logo_Dark_Mode.svg" 
              alt="SoDA Logo" 
              className="h-8 w-auto"
            />
            <span className="text-white font-bold text-xl">Shop</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/shop"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            {isSignedIn && (
              <>
                <Link
                  to="/shop/account"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  My Orders
                </Link>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/shop/cart"
              className="relative text-gray-300 hover:text-white transition-colors"
              aria-label={`Cart (${getCartItemCount()} items)`}
            >
              <ShoppingCart size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {/* User Account or Login */}
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/shop/account"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User size={24} />
                  <span className="hidden md:block">
                    {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ShopNavbar;
