import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosInstance from '../config/AxiosInstance';
import ProductCard from '../components/ProductCard';
import { CiSearch } from 'react-icons/ci';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const SearchPage = () => {
      const [results, setResults] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [searchQuery, setSearchQuery] = useState('');
      const location = useLocation();
      const navigate = useNavigate();

      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('query');

      useEffect(() => {
            if (!query) {
                  navigate('/');
                  return;
            }

            setSearchQuery(query);
            const searchProducts = async () => {
                  setIsLoading(true);
                  try {
                        const { data } = await AxiosInstance.get(`/product/search?query=${query}`);
                        if (data.success) {
                              setResults(data.data);
                        }
                  } catch (error) {
                        console.error('Error searching products:', error);
                  } finally {
                        setIsLoading(false);
                  }
            };

            searchProducts();
      }, [query, navigate]);

      const handleSearchSubmit = (e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
                  navigate(`/search?query=${searchQuery}`);
            }
      };

      return (
            <div className="container mx-auto px-4 py-8">
                  <div className="max-w-2xl mx-auto mb-8">
                        <form onSubmit={handleSearchSubmit} className="relative">
                              <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 pr-10 focus:border-teal-500 focus:outline-none"
                              />
                              <button
                                    type="submit"
                                    className="absolute right-3 top-3 text-gray-500 hover:text-teal-600"
                              >
                                    <CiSearch className="h-6 w-6" />
                              </button>
                        </form>
                  </div>

                  <h1 className="text-2xl font-bold mb-6">
                        {results.length > 0 ? `Search Results for: ` : `No results for: `}
                        <span className="text-teal-500">"{query}"</span>
                  </h1>

                  {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                              {[...Array(8)].map((_, i) => (
                                    <ProductCardSkeleton key={i} />
                              ))}
                        </div>
                  ) : results.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                              {results.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                              ))}
                        </div>
                  ) : (
                        <div className="text-center py-12">
                              <p className="text-gray-600 text-lg mb-4">We couldn't find any products matching your search.</p>
                              <button
                                    onClick={() => navigate('/products')}
                                    className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                              >
                                    Browse All Products
                              </button>
                        </div>
                  )}
            </div>
      );
};

export default SearchPage;