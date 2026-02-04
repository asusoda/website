import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Package } from 'lucide-react';
import { storefrontAPI, Product } from '../../lib/api';
import { useCart } from '../../lib/CartContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      // Validate route param before calling the API
      if (!id) {
        setProduct(null);
        setError('Product not found');
        setLoading(false);
        return;
      }

      const numericId = Number(id);
      if (!Number.isFinite(numericId)) {
        setProduct(null);
        setError('Product not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await storefrontAPI.getProduct(numericId);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/shop/cart');
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
            <button onClick={() => navigate('/shop')} className="bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-lg">
              Back to Shop
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - SoDA Shop</title>
      </Helmet>
      <div className="min-h-screen bg-black text-white pt-32">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-900 rounded-lg overflow-hidden aspect-square">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={128} className="text-gray-600" />
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-blue-400 mb-6">{product.price} points</p>
              <p className="text-gray-300 mb-6">{product.description}</p>
              <p className="text-sm text-gray-400 mb-6">
                Stock: <span className={product.stock < 10 ? 'text-red-400' : 'text-green-400'}>
                  {product.stock} available
                </span>
              </p>

              {product.stock > 0 && (
                <div className="flex items-center space-x-4 mb-6">
                  <label className="text-gray-400">Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    max={product.stock}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))
                    }
                    className="bg-zinc-800 text-white px-4 py-2 rounded w-20"
                  />
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 disabled:bg-gray-600/10 disabled:border-gray-500/20 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/10 text-lg flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={24} />
                <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
