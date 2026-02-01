import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Package } from 'lucide-react';
import ShopNavbar from '../../components/Shop/ShopNavbar';
import ProductCarousel, { CarouselSlide } from '../../components/Shop/ProductCarousel';
import { storefrontAPI, Product } from '../../lib/api';
import { useCart } from '../../lib/CartContext';

const ShopIndex: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await storefrontAPI.getProducts();
        setProducts(data.filter((p) => p.stock > 0)); // Only show available products
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <>
        <ShopNavbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <Package className="animate-spin mx-auto mb-4" size={48} />
            <p>Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ShopNavbar />
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  // Carousel slides - can be fetched from API or configured
  const carouselSlides: CarouselSlide[] = [
    {
      id: 'featured-1',
      title: 'New Arrivals',
      subtitle: 'Fresh Drop',
      description: 'Check out our latest SoDA merchandise collection',
      imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200',
      ctaText: 'Shop Now',
      ctaLink: '#products',
      backgroundColor: '#1a1a2e',
    },
    {
      id: 'featured-2',
      title: 'Limited Edition',
      subtitle: 'Exclusive',
      description: 'Get your hands on exclusive SoDA gear before it\'s gone',
      imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200',
      ctaText: 'View Collection',
      ctaLink: '#products',
      backgroundColor: '#16213e',
    },
    {
      id: 'featured-3',
      title: 'Member Favorites',
      subtitle: 'Best Sellers',
      description: 'Most loved items by the SoDA community',
      imageUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1200',
      ctaText: 'Browse',
      ctaLink: '#products',
      backgroundColor: '#0f3460',
    },
  ];

  return (
    <>
      <Helmet>
        <title>SoDA Shop - Products</title>
        <meta name="description" content="Browse and purchase SoDA merchandise" />
      </Helmet>
      <ShopNavbar />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Carousel */}
        <ProductCarousel slides={carouselSlides} autoplayDelay={5000} />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div id="products" className="mb-8 mt-8">
            <h1 className="text-4xl font-bold mb-2">SoDA Shop</h1>
            <p className="text-gray-400">Browse our collection of exclusive merchandise</p>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 text-lg">No products available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-blue-500 transition-all duration-300 flex flex-col"
                >
                  <Link to={`/shop/product/${product.id}`} className="block">
                    <div className="aspect-square bg-zinc-800 relative overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={64} className="text-gray-600" />
                        </div>
                      )}
                      {product.stock < 10 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          Only {product.stock} left
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <Link to={`/shop/product/${product.id}`}>
                      <h3 className="text-lg font-semibold mb-2 hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-400">
                        {product.price} pts
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <ShoppingCart size={18} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShopIndex;
