import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Package, Wallet, User as UserIcon, ShoppingBag, TrendingUp, Calendar } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { OrderCard } from '../../components/Shop/OrderCard';

import { useUserPoints } from '../../hooks/useUserPoints';
import { useUserOrders } from '../../hooks/useUserOrders';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';

const Account: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { userPoints, loading: pointsLoading, error: pointsError } = useUserPoints();
  const { orders, loading: ordersLoading, error: ordersError } = useUserOrders();

  const loading = pointsLoading || ordersLoading;
  const error = pointsError || ordersError;

  if (!isLoaded || loading) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
          <div className="text-center">
            <UserIcon size={64} className="mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-bold mb-2">Sign In Required</h2>
            <p className="text-gray-400 mb-4">Please sign in to view your account</p>
          </div>
        </div>
      </>
    );
  }

  const primaryEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses[0]?.emailAddress;
  const hasPoints = userPoints && userPoints.points_breakdown.length > 0;

  return (
    <>
      <Helmet>
        <title>My Account - SoDA Shop</title>
      </Helmet>
      <div className="min-h-screen bg-black text-white pt-32 relative overflow-hidden">
        {/* Teddy image in bottom right background */}
        <div className="fixed bottom-0 right-0 w-64 md:w-80 lg:w-96 opacity-20 pointer-events-none z-0">
          <img 
            src="/teddy-laptop.webp" 
            alt="Teddy bear decoration" 
            className="w-full h-auto"
          />
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              My Account
            </h1>
            <p className="text-gray-400">Manage your points and view order history</p>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 mb-8"
            >
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar - User Info & Points */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* User Profile Card */}
              <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30">
                    <UserIcon size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {user.firstName || 'Member'}
                    </h2>
                    <p className="text-gray-400 text-sm truncate">{primaryEmail}</p>
                  </div>
                </div>
              </div>

              {/* Points Wallet Card */}
              <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Wallet className="text-blue-400" size={20} />
                      <span className="text-gray-400 text-sm font-medium">Points Balance</span>
                    </div>
                    <TrendingUp className="text-green-400" size={18} />
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                      {userPoints?.total_points || 0}
                    </div>
                    <p className="text-gray-500 text-sm mt-1">points available</p>
                  </div>
                  
                  {hasPoints && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Recent Activity</p>
                        <Calendar size={14} className="text-gray-600" />
                      </div>
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                        {userPoints.points_breakdown.slice(0, 8).map((item, index) => (
                          <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex justify-between items-center bg-black/30 rounded-lg p-3 border border-white/5 hover:border-white/10 transition-colors"
                          >
                            <span className="text-gray-300 text-sm truncate flex-1 mr-2">{item.event}</span>
                            <span className={`font-semibold text-sm whitespace-nowrap ${
                              item.points > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {item.points > 0 ? '+' : ''}{item.points}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right Content - Order History */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Package size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Order History</h3>
                    <p className="text-gray-500 text-sm">{orders.length} total orders</p>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                      </div>
                      <ShoppingBag size={72} className="mx-auto text-gray-700 relative z-10" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-300">No orders yet</h4>
                    <p className="text-gray-500 mb-6">
                      Start shopping to see your order history here
                    </p>
                    <Link 
                      to="/shop"
                      className="inline-block bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-lg"
                    >
                      Browse Products
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {orders.map((order, idx) => (
                      <OrderCard key={order.id} order={order} index={idx} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
