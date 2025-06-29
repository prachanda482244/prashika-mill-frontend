import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
      const dispatch = useDispatch();
      const [quantityType, setQuantityType] = useState('quantity'); // 'quantity' or 'kg'
      const [isAdding, setIsAdding] = useState(false);

      const handleAddToCart = async () => {
            setIsAdding(true);
            try {
                  await dispatch(addToCart({
                        productId: product._id,
                        [quantityType === 'kg' ? 'quantityInKg' : 'quantity']: 1,
                        [quantityType === 'kg' ? 'quantity' : 'quantityInKg']: 0
                  })).unwrap();
                  toast.success(`${product.title} added to cart`);
            } catch (error) {
                  toast.error(error.message || "Failed to add to cart");
            } finally {
                  setIsAdding(false);
            }
      };

      return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <Link to={`/product/${product._id}`} className="block">
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                              <img
                                    src={product.images[0]?.url || '/placeholder-product.jpg'}
                                    alt={product.title}
                                    className="h-full w-full object-contain"
                              />
                        </div>
                  </Link>

                  <div className="p-4">
                        <Link to={`/product/${product._id}`}>
                              <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate hover:text-teal-600">
                                    {product.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {product.description}
                              </p>
                        </Link>

                        <div className="flex justify-between items-center mb-3">
                              <div>
                                    <span className="text-gray-500 text-sm">Unit: </span>
                                    <span className="font-bold text-teal-600">Rs. {product.price}</span>
                              </div>
                              <div>
                                    <span className="text-gray-500 text-sm">Kg: </span>
                                    <span className="font-bold text-teal-600">Rs. {product.pricePerKg}</span>
                              </div>
                        </div>

                        {/* Add to Cart Button (shown on hover for desktop) */}
                        <button
                              onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCart();
                              }}
                              disabled={isAdding}
                              className={`w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors ${isAdding ? 'opacity-70' : ''
                                    } md:opacity-0 md:group-hover:opacity-100`}
                        >
                              {isAdding ? 'Adding...' : 'Add to Cart'}
                        </button>
                  </div>
            </div>
      );
};

export default ProductCard;