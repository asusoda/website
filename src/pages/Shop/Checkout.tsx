import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useCart } from '../../lib/CartContext';
import { storefrontAPI, pointsAPI, APIError, ERROR_MESSAGES } from '../../lib/api';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      navigate('/shop/account');
      return;
    }

    if (cart.length === 0) {
      navigate('/shop/cart');
      return;
    }

    // Fetch user points
    const fetchUserPoints = async () => {
      try {
        const email = user?.emailAddresses?.[0]?.emailAddress;
        const token = await getToken();
        if (email && token) {
          const data = await pointsAPI.getUserPoints(email, token);
          setUserPoints(data.total_points || 0);
        }
      } catch (err) {
        console.error('Failed to fetch user points:', err);
        
        // Check if it's a 404 or user not found error
        if (err instanceof APIError && err.status === 404) {
          setError(ERROR_MESSAGES.NO_POINTS_RECORD);
        } else {
          setError('Failed to load your points balance. Please try again or contact support.');
        }
        setUserPoints(0);
      }
    };

    fetchUserPoints();
  }, [cart, navigate, isSignedIn, isLoaded, user, getToken]);

  const handlePlaceOrder = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const total = getCartTotal();

      // Check if user has enough points
      if (userPoints < total) {
        setError(`Insufficient points. You have ${userPoints} points but need ${total} points.`);
        return;
      }

      // Create order
      const orderData = {
        total_amount: total,
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      // Get Clerk auth token
      const token = await getToken();
      if (!token) {
        setError('Authentication failed. Please sign in again.');
        return;
      }

      await storefrontAPI.createOrder(orderData, token);

      // Success! Persist total before clearing cart
      setOrderTotal(total);
      setSuccess(true);
      clearCart();

      // Redirect to account page after 2 seconds
      setTimeout(() => {
        navigate('/shop/account');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
          <div className="text-center">
            <CheckCircle size={64} className="mx-auto mb-4 text-green-400" />
            <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-400 mb-4">
              {orderTotal} points have been deducted from your account.
            </p>
            <p className="text-sm text-gray-500">Redirecting to your account...</p>
          </div>
        </div>
      </>
    );
  }

  const total = getCartTotal();
  const hasEnoughPoints = userPoints >= total;

  return (
    <>
      <Helmet>
        <title>Checkout - SoDA Shop</title>
      </Helmet>
      <div className="min-h-screen bg-black text-white pt-24 relative overflow-hidden">
        {/* Teddy image in bottom left background */}
        <div className="fixed bottom-0 left-0 w-48 md:w-64 lg:w-80 opacity-15 pointer-events-none z-0">
          <img 
            src="/teddy-laptop.webp" 
            alt="Teddy bear decoration" 
            className="w-full h-auto"
          />
        </div>
        
        {/* Soda can image in bottom right background */}
        <div className="fixed bottom-0 right-0 w-48 md:w-64 lg:w-80 opacity-15 pointer-events-none z-0">
          <img 
            src="/soda-can.webp" 
            alt="Soda can decoration" 
            className="w-full h-auto"
          />
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          {/* User Info */}
          <div className="bg-zinc-900 rounded-lg p-6 mb-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <p className="text-gray-300">{user?.firstName || user?.emailAddresses?.[0]?.emailAddress}</p>
            <p className="text-gray-400">Email: {user?.emailAddresses?.[0]?.emailAddress}</p>
          </div>

          {/* Order Summary */}
          <div className="bg-zinc-900 rounded-lg p-6 mb-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-gray-300">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>{item.product.price * item.quantity} pts</span>
                </div>
              ))}
              <div className="border-t border-zinc-700 pt-2 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-400">{total} pts</span>
              </div>
            </div>
          </div>

          {/* Points Balance */}
          <div className="bg-zinc-900 rounded-lg p-6 mb-6 border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Points Balance</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Available Points:</span>
              <span className="text-2xl font-bold text-blue-400">{userPoints} pts</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-300">After Purchase:</span>
              <span className={`text-xl font-bold ${hasEnoughPoints ? 'text-green-400' : 'text-red-400'}`}>
                {userPoints - total} pts
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6 flex items-start space-x-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={24} />
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading || !hasEnoughPoints}
            className="w-full bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 disabled:bg-gray-600/10 disabled:border-gray-500/20 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-lg"
          >
            {loading ? 'Processing...' : !hasEnoughPoints ? 'Insufficient Points' : 'Place Order'}
          </button>

          {!hasEnoughPoints && (
            <p className="text-center text-red-400 mt-4 text-sm">
              You need {total - userPoints} more points to complete this purchase.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
