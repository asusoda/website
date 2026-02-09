import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../lib/CartContext';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - SoDA Shop</title>
        </Helmet>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32 relative overflow-hidden">
          {/* Soda can image in bottom right background */}
          <div className="fixed bottom-0 right-0 w-48 md:w-64 lg:w-80 opacity-20 pointer-events-none z-0">
            <img 
              src="/soda-can.webp" 
              alt="Soda can decoration" 
              className="w-full h-auto"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md relative z-10"
          >
            <div className="mb-6 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
              <ShoppingBag size={80} className="mx-auto text-gray-700 relative z-10" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Start shopping to add items to your cart</p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-lg"
            >
              <span>Browse Products</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - SoDA Shop</title>
      </Helmet>
      <div className="min-h-screen bg-black text-white pt-32 relative overflow-hidden">
        {/* Soda can image in bottom right background */}
        <div className="fixed bottom-0 right-0 w-48 md:w-64 lg:w-80 opacity-20 pointer-events-none z-0">
          <img 
            src="/soda-can.webp" 
            alt="Soda can decoration" 
            className="w-full h-auto"
          />
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-400">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, idx) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-zinc-900/90 backdrop-blur-xl rounded-xl p-5 flex items-center space-x-4 border border-white/10 transition-all shadow-xl"
                >
                  <div className="w-24 h-24 bg-zinc-800/50 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={32} className="text-gray-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-1 truncate">{item.product.name}</h3>
                    <p className="text-blue-400 font-semibold">{item.product.price} pts each</p>
                  </div>

                  <div className="flex items-center space-x-2 bg-black/30 rounded-lg p-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="bg-white/5 hover:bg-white/10 p-2 rounded transition-colors"
                      aria-label={`Decrease quantity of ${item.product.name}`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded transition-colors"
                      aria-label={`Increase quantity of ${item.product.name}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                    <p className="text-xl font-bold text-blue-400">{item.product.price * item.quantity}</p>
                    <p className="text-xs text-gray-500">pts</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-400 hover:text-red-500 hover:bg-red-400/10 p-2 rounded-lg transition-all"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
                );
              })}

              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-500 text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 sticky top-32 shadow-xl">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span className="font-semibold text-white">{getCartTotal()} pts</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold border-t border-white/10 pt-4">
                    <span>Total</span>
                    <span className="text-blue-400">{getCartTotal()}</span>
                  </div>
                  <p className="text-xs text-gray-500 text-right">points</p>
                </div>
                <button
                  onClick={() => navigate('/shop/checkout')}
                  className="w-full bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-lg mb-4"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/shop"
                  className="block text-center text-gray-400 hover:text-red-400 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
