import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import ShopNavbar from '../../components/Shop/ShopNavbar';
import { useCart } from '../../lib/CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - SoDA Shop</title>
        </Helmet>
        <ShopNavbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Start shopping to add items to your cart</p>
            <Link
              to="/shop"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - SoDA Shop</title>
      </Helmet>
      <ShopNavbar />
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-zinc-900 rounded-lg p-4 flex items-center space-x-4 border border-zinc-800"
                >
                  <div className="w-24 h-24 bg-zinc-800 rounded flex-shrink-0">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag size={32} className="text-gray-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-blue-400 font-bold">{item.product.price} pts each</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 p-2 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">{item.product.price * item.quantity} pts</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 sticky top-24">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-bold">{getCartTotal()} pts</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t border-zinc-700 pt-2">
                    <span>Total</span>
                    <span className="text-blue-400">{getCartTotal()} pts</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/shop/checkout')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                  Proceed to Checkout
                </button>
                <Link
                  to="/shop"
                  className="block text-center text-gray-400 hover:text-white mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
