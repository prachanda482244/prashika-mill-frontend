import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi"

const OrderSuccess = () => {
      const navigate = useNavigate();

      return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
                              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white bg-opacity-20">
                                    <FiCheckCircle className="h-8 w-8 text-white" />
                              </div>
                              <h2 className="mt-3 text-xl font-bold text-white">Order Confirmed!</h2>
                        </div>

                        <div className="px-6 py-8">
                              <div className="text-center">
                                    <p className="text-lg font-medium text-gray-800 mb-4">
                                          Thank you for your purchase!
                                    </p>
                                    <p className="text-gray-600 mb-6">
                                          Your order has been successfully placed. We've sent a confirmation email with all the details.
                                    </p>

                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                          <h3 className="text-sm font-medium text-gray-500 mb-2">WHAT'S NEXT?</h3>
                                          <ul className="text-sm text-gray-600 space-y-2">
                                                <li className="flex items-start">
                                                      <span className="h-5 w-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">1</span>
                                                      <span>We're processing your order</span>
                                                </li>
                                                <li className="flex items-start">
                                                      <span className="h-5 w-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">2</span>
                                                      <span>You'll receive shipping updates</span>
                                                </li>
                                                <li className="flex items-start">
                                                      <span className="h-5 w-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">3</span>
                                                      <span>Your package will arrive soon</span>
                                                </li>
                                          </ul>
                                    </div>

                                    <div className="mt-8">
                                          <button
                                                onClick={() => navigate("/products")}
                                                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                          >
                                                Continue Shopping
                                          </button>
                                    </div>

                                    <div className="mt-4">
                                          <button
                                                onClick={() => navigate("/profile")} // Assuming you have an orders page
                                                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
                                          >
                                                View Order Details
                                          </button>
                                    </div>
                              </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                              <p className="text-xs text-gray-500 text-center">
                                    Need help? <a href="mailto:support@example.com" className="text-emerald-600 hover:text-emerald-500">Contact us</a> or call +977 9860115454
                              </p>
                        </div>
                  </div>
            </div>
      );
};

export default OrderSuccess;