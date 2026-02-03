import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Package, Wallet, User as UserIcon, Loader2 } from 'lucide-react';
import { useUser, useAuth } from '@clerk/clerk-react';
import ShopNavbar from '../../components/Shop/ShopNavbar';
import { pointsAPI, storefrontAPI, PointsRecord, Order, OrderItem, APIError, ERROR_MESSAGES } from '../../lib/api';

interface UserPointsData {
  total_points: number;
  points_breakdown: PointsRecord[];
}

const Account: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [userPoints, setUserPoints] = useState<UserPointsData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    fetchUserData();
  }, [isSignedIn, isLoaded, user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const email = user?.emailAddresses[0]?.emailAddress;
      
      if (!email) {
        console.error('No email address found for the signed-in user.');
        setError(
          'We could not find an email address associated with your account. Please contact support for assistance.'
        );
        return;
      }

      // Get Clerk session token
      const token = await getToken();
      
      if (!token) {
        setError('Authentication failed. Please sign in again.');
        return;
      }

      // Use Promise.allSettled to handle APIs independently
      const [pointsResult, ordersResult] = await Promise.allSettled([
        pointsAPI.getUserPoints(email, token),
        storefrontAPI.getOrders(email, token)
      ]);
      
      // Handle points data
      if (pointsResult.status === 'fulfilled') {
        setUserPoints({
          total_points: pointsResult.value.total_points,
          points_breakdown: pointsResult.value.points_breakdown,
        });
      } else {
        console.error('Failed to fetch points:', pointsResult.reason);
        // Check if it's a 404 or user not found error
        if (pointsResult.reason instanceof APIError && pointsResult.reason.status === 404) {
          setError(ERROR_MESSAGES.NO_POINTS_RECORD);
        } else {
          setError(pointsResult.reason instanceof Error ? pointsResult.reason.message : 'Failed to load wallet data');
        }
      }
      
      // Handle orders data independently
      if (ordersResult.status === 'fulfilled') {
        setOrders(ordersResult.value);
      } else {
        console.error('Failed to fetch orders:', ordersResult.reason);
        // Don't set error for orders - just log it and show empty orders
      }
      
      // Clear error if points loaded successfully
      if (pointsResult.status === 'fulfilled') {
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error fetching user data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <>
        <ShopNavbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto mb-4" size={48} />
            <p>Loading your account...</p>
          </div>
        </div>
      </>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <ShopNavbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <UserIcon size={64} className="mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-gray-400 mb-4">Please sign in to view your account</p>
          </div>
        </div>
      </>
    );
  }

  const hasPoints = userPoints && userPoints.points_breakdown.length > 0;

  return (
    <>
      <Helmet>
        <title>My Account - SoDA Shop</title>
      </Helmet>
      <ShopNavbar />
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          {error && (
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <UserIcon size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {user.firstName || 'Member'}
                    </h2>
                    <p className="text-gray-400 text-sm">{user.emailAddresses[0]?.emailAddress}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <div className="bg-black/50 rounded-lg p-4 border border-blue-500/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="text-blue-400" size={24} />
                    <span className="text-gray-400">Available Points</span>
                  </div>
                  <div className="text-4xl font-bold text-blue-400 mb-4">
                    {userPoints?.total_points || 0} pts
                  </div>
                  
                  {hasPoints && (
                    <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                      <p className="text-sm text-gray-500 font-semibold">Recent Activity:</p>
                      {userPoints.points_breakdown.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex justify-between text-sm border-t border-zinc-800 pt-2">
                          <span className="text-gray-400 truncate">{item.event}</span>
                          <span className={item.points > 0 ? 'text-green-400' : 'text-red-400'}>
                            {item.points > 0 ? '+' : ''}{item.points} pts
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <div className="flex items-center space-x-3 mb-6">
                  <Package size={24} className="text-blue-400" />
                  <h3 className="text-2xl font-semibold">Order History</h3>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={64} className="mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No orders yet</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Start shopping to see your order history here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Order #{order.id}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-blue-400">-{order.total_amount} pts</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                              order.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                              'bg-red-900/30 text-red-400'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        {order.items && order.items.length > 0 && (
                          <div className="space-y-2 mt-3 pt-3 border-t border-zinc-800">
                            {order.items.map((item: OrderItem, idx: number) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-400">{item.product?.name || 'Product'} x{item.quantity}</span>
                                <span className="text-gray-300">{item.price_at_time} pts</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
