import React from 'react';
import { ClerkProvider, useUser, useClerk } from '@clerk/clerk-react';
import { Outlet } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ShopNavbar from './ShopNavbar';
import LoadingSpinner from '../LoadingSpinner';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const ALLOWED_EMAIL_DOMAIN = '@asu.edu';

/**
 * EmailDomainGuard checks if the signed-in user has an @asu.edu email.
 * Only renders children if the user has an ASU email or is not signed in yet.
 */
const EmailDomainGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Still loading user data
  if (!isLoaded) {
    return (
      <motion.div 
        className="min-h-screen bg-black text-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <LoadingSpinner />
      </motion.div>
    );
  }

  // If signed in, check email domain
  if (isSignedIn && user) {
    const primaryEmail = user.primaryEmailAddress?.emailAddress;
    const allowedDomain = ALLOWED_EMAIL_DOMAIN.toLowerCase();

    // Fail closed: if we cannot determine a primary email, do not allow access
    if (!primaryEmail) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <AlertCircle size={64} className="mx-auto mb-6 text-red-400" />
            <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
            <p className="text-gray-300 mb-4">
              The SoDA Shop is only available to ASU students and members with a valid ASURITE email.
            </p>
            <p className="text-sm text-gray-400 mb-6">
              We could not determine a primary email address for your account. Please ensure your
              account has an <span className="text-blue-400 font-mono">@asu.edu</span> email associated
              as the primary email and try again.
            </p>
            <button
              type="button"
              onClick={() => {
                void signOut({ redirectUrl: '/shop' });
              }}
              className="bg-red-500/10 backdrop-blur-xl border border-red-400/20 hover:bg-red-500/20 hover:border-red-400/40 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Sign Out and Switch Account
            </button>
          </div>
        </div>
      );
    }

    if (!primaryEmail.toLowerCase().endsWith(allowedDomain)) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <AlertCircle size={64} className="mx-auto mb-6 text-red-400" />
            <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
            <p className="text-gray-300 mb-4">
              The SoDA Shop is only available to ASU students and members.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400 mb-2">
                You are currently signed in with:
              </p>
              <p className="text-white font-mono text-sm break-all">
                {primaryEmail.toLowerCase()}
              </p>
            </div>
            <p className="text-yellow-400 font-semibold mb-2">
              Please sign up with your ASURITE email
            </p>
            <p className="text-sm text-gray-500">
              Your ASURITE email ends with <span className="text-blue-400 font-mono">@asu.edu</span>
            </p>
            <button
              type="button"
              onClick={() => {
                void signOut({ redirectUrl: '/shop' });
              }}
              className="mt-6 bg-red-500/10 backdrop-blur-xl border border-red-400/20 hover:bg-red-500/20 hover:border-red-400/40 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
            >
              Sign Out and Switch Account
            </button>
          </div>
        </div>
      );
    }
  }

  // User not signed in or has valid ASU email
  return <>{children}</>;
};

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
      <EmailDomainGuard>
        <ShopNavbar />
        <Outlet />
      </EmailDomainGuard>
    </ClerkProvider>
  );
};

export default ShopLayout;
