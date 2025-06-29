import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import FormikInput from "../formik/FormikInput";
import { orderValidationSchema } from "../constants/constants";
import { useSelector } from "react-redux";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartItems, setCartItems] = useState({ products: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);

  const initialValues = {
    name: userData.username,
    email: userData.email,
    phone: "",
    street: "",
    city: "",
    paymentMethod: "cod",
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await AxiosInstance.get('/cart');
        setCartItems(data?.data || { products: [], totalAmount: 0 });
      } catch (error) {
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const handleSubmit = async (values) => {
    try {
      console.log(values, "values")
      const { data } = await AxiosInstance.post("/order", {
        ...values,

      });

      toast.success(data?.message);
      navigate("/order-success");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <p className="text-lg text-gray-700">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Cart Items Section */}
            <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-blue-50 to-gray-100 p-8">
              <div className="h-full flex flex-col">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Your Order</h3>

                {cartItems?.products?.length > 0 ? (
                  <div className="divide-y divide-gray-200 overflow-y-auto max-h-[500px]">
                    {cartItems.products.map((item) => (
                      <div key={item?.product?._id} className="py-4 flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item?.product?.images?.[0]?.url}
                            alt={item?.product?.title}
                            className="w-16 h-16 object-contain rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{item?.product?.title}</h4>
                            <p className="text-sm font-semibold text-amber-600">
                              Rs. {item?.product?.price * (item.quantity || item.quantityInKg)}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.quantity ? `Qty: ${item.quantity}` : `Qty: ${item.quantityInKg} kg`}
                          </p>
                          <p className="text-xs text-gray-500">
                            Rs. {item?.product?.price} {item.quantity ? 'per item' : 'per kg'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                )}

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total:</span>
                    <span className="text-amber-600">Rs. {cartItems?.totalAmount || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8 md:w-3/5">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Complete Your Order</h2>
                <div className="mt-1 border-b-2 border-blue-100 w-20"></div>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={orderValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Name
                        </label>
                        <div className="text-gray-800 font-medium">
                          {userData.username}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Email
                        </label>
                        <div className="text-gray-800 font-medium">
                          {userData.email}
                        </div>
                      </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700 flex items-center">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">
                          1
                        </span>
                        Shipping Information
                      </h3>

                      <FormikInput
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        required
                        placeholder="+977 98XXXXXXXX"
                        containerClass="bg-gray-50 rounded-lg"
                        inputClass="bg-gray-50"
                      />

                      <FormikInput
                        name="street"
                        label="Street Address"
                        required
                        placeholder="123 Main Street"
                        containerClass="bg-gray-50 rounded-lg"
                        inputClass="bg-gray-50"
                      />

                      <FormikInput
                        name="city"
                        label="City"
                        required
                        placeholder="Kathmandu"
                        containerClass="bg-gray-50 rounded-lg"
                        inputClass="bg-gray-50"
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium text-gray-700 flex items-center">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">
                          2
                        </span>
                        Payment Method
                      </h3>

                      <div className="space-y-3">
                        {/* COD Option */}
                        <div
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === "cod"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                          onClick={() => setPaymentMethod("cod")}
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-sm font-medium text-gray-900">Cash on Delivery (COD)</h4>
                              <p className="text-sm text-gray-500">Pay with cash when you receive your order</p>
                            </div>
                            {paymentMethod === "cod" && (
                              <div className="ml-auto">
                                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Cash on Delivery Option */}
                        <div
                          className={`p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === "cash_on_delivery"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                            }`}
                          onClick={() => setPaymentMethod("cash_on_delivery")}
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                            <div className="ml-4">
                              <h4 className="text-sm font-medium text-gray-900">Cash on Delivery</h4>
                              <p className="text-sm text-gray-500">Standard cash payment upon delivery</p>
                            </div>
                            {paymentMethod === "cash_on_delivery" && (
                              <div className="ml-auto">
                                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting || cartItems.products.length === 0}
                        className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors shadow-md
                          ${isSubmitting || cartItems.products.length === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"}`}
                      >
                        {isSubmitting ? "Processing Order..." : "Place Your Order"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;