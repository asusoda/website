import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/**
 * ShopLayout wraps all shop routes with ClerkProvider.
 * This ensures Clerk authentication is only available in the /shop/* routes.
 */
const ShopLayout: React.FC = () => {
  // If no Clerk key is provided, show error state for shop routes
  if (!PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Shop Unavailable</h1>
          <p className="text-gray-400">
            The shop requires authentication configuration to be enabled.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Contact an administrator to configure Clerk authentication.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Outlet />
    </ClerkProvider>
  );
};

export default ShopLayout;
