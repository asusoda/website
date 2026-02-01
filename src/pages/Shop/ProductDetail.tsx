import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import ShopNavbar from '../../components/Shop/ShopNavbar';
import { storefrontAPI, Product } from '../../lib/api';
import { useCart } from '../../lib/CartContext';

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
        <ShopNavbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <Package className="animate-spin" size={48} />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <ShopNavbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error || 'Product not found'}</p>
            <button onClick={() => navigate('/shop')} className="bg-blue-600 px-4 py-2 rounded">
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
      <ShopNavbar />
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Shop</span>
          </button>

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

              <div className="flex items-center space-x-4 mb-6">
                <label className="text-gray-400">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="bg-zinc-800 text-white px-4 py-2 rounded w-20"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-8 py-3 rounded-lg flex items-center space-x-2 text-lg"
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
