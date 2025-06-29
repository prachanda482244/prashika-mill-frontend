import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const shippingFee = 100;
  const [cartItems, setCartItems] = useState([]);
  const [editModes, setEditModes] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [quantityTypes, setQuantityTypes] = useState({});

  const getCartDetails = async () => {
    try {
      const { data } = await AxiosInstance.get('/cart');
      setCartItems(data?.data);

      // Initialize quantity types based on initial data
      const types = {};
      data?.data?.products?.forEach(item => {
        types[item.product._id] = item.quantityInKg > 0 ? 'kg' : 'quantity';
      });
      setQuantityTypes(types);
    } catch (error) {
      toast.error("Failed to load cart items");
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  const totalPrice = (cartItems?.totalAmount || 0) + shippingFee;

  const handleRemove = async (product) => {
    try {
      const { data } = await AxiosInstance.delete(`/cart/p/${product?.product?._id}`);
      setCartItems(data?.data);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to remove item");
    }
  };

  const handleQuantityChange = async (product, newValue) => {
    try {
      const isKgMode = quantityTypes[product.product._id] === 'kg';

      if (!newValue || newValue === 0) {
        await handleRemove(product);
        return;
      }

      const payload = isKgMode
        ? { quantityInKg: +newValue, quantity: 0 }
        : { quantity: +newValue, quantityInKg: 0 };

      const { data } = await AxiosInstance.post(
        `/cart/p/${product.product._id}`,
        payload
      );
      setCartItems(data?.data);
      setEditModes(prev => ({ ...prev, [product.product._id]: false }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update quantity");
    }
  };

  const handleIncrement = async (product) => {
    const isKgMode = quantityTypes[product.product._id] === 'kg';
    const currentValue = isKgMode ? product.quantityInKg : product.quantity;
    const newValue = currentValue + 1;
    await handleQuantityChange(product, newValue);
  };

  const handleDecrement = async (product) => {
    const isKgMode = quantityTypes[product.product._id] === 'kg';
    const currentValue = isKgMode ? product.quantityInKg : product.quantity;
    const newValue = Math.max(currentValue - 1, 1);
    await handleQuantityChange(product, newValue);
  };

  const toggleEditMode = (productId, currentValue) => {
    setEditModes(prev => ({ ...prev, [productId]: !prev[productId] }));
    setInputValues(prev => ({ ...prev, [productId]: currentValue }));
  };

  const handleInputChange = (productId, value) => {
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setInputValues(prev => ({ ...prev, [productId]: value }));
    }
  };

  const handleCheckOut = () => {
    if (!cartItems?.products?.length) {
      toast.error("Your cart is empty");
    } else {
      navigate("/order");
    }
  };

  const handleClearCart = async () => {
    try {
      if (window.confirm("Are you sure you want to clear your cart?")) {
        await AxiosInstance.delete("/cart/clear-cart");
        setCartItems([]);
        toast.success("Cart cleared successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to clear cart");
    }
  };

  const toggleQuantityType = (productId) => {
    setQuantityTypes(prev => ({
      ...prev,
      [productId]: prev[productId] === 'kg' ? 'quantity' : 'kg'
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light text-gray-800 mb-8">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {cartItems?.products?.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              {cartItems?.products?.map((item) => {
                const productId = item?.product?._id;
                const isKgMode = quantityTypes[productId] === 'kg';
                const currentValue = isKgMode ? item.quantityInKg : item.quantity;
                const stock = isKgMode ? item.product.stockInKg : item.product.stock;
                const price = isKgMode ? item.product.pricePerKg : item.product.price;
                const isEditMode = editModes[productId];

                return (
                  <div key={productId} className="p-6 flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item?.product?.images?.[0]?.url}
                        alt={item?.product?.title}
                        className="w-24 h-24 object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item?.product.title}
                        </h3>
                        <p className="text-lg font-semibold text-amber-600">
                          Rs. {price}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleQuantityType(productId)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${quantityTypes[productId] === 'quantity'
                                ? "bg-amber-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                          >
                            Quantity
                          </button>
                          <button
                            onClick={() => toggleQuantityType(productId)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${quantityTypes[productId] === 'kg'
                                ? "bg-amber-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                          >
                            Kg
                          </button>
                        </div>
                        <span className="text-sm text-gray-500">
                          Stock: {stock} {isKgMode ? 'kg' : ''}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isEditMode ? (
                            <>
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                min="1"
                                max={stock}
                                value={inputValues[productId] ?? ''}
                                onChange={(e) => handleInputChange(productId, e.target.value)}
                                className="w-20 px-3 py-1 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                                autoFocus
                              />
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleQuantityChange(
                                    item,
                                    inputValues[productId] || 1
                                  )}
                                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => toggleEditMode(productId, currentValue)}
                                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => handleDecrement(item)}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                  disabled={currentValue <= 1}
                                >
                                  -
                                </button>
                                <span
                                  className="px-4 py-1 cursor-pointer min-w-[40px] text-center"
                                  onClick={() => toggleEditMode(productId, currentValue)}
                                >
                                  {currentValue}
                                </span>
                                <button
                                  onClick={() => handleIncrement(item)}
                                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                  disabled={currentValue >= stock}
                                >
                                  +
                                </button>
                              </div>
                            </>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemove(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="px-6 py-4 flex justify-end">
                <button
                  onClick={handleClearCart}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your cart is empty</h3>
              <button
                onClick={() => navigate("/products")}
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems?.products?.length > 0 && (
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs. {cartItems?.totalAmount?.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Rs. {shippingFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Rs. 0</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold text-amber-600">Rs. {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckOut}
                className="mt-6 w-full bg-amber-500 py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium hover:bg-amber-600 focus:outline-none"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Contact us at <span className="text-amber-500">support@example.com</span> or call <span className="text-amber-500">+977 9860115454</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;