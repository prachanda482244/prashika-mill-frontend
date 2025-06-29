import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance";
import { FiSettings, FiShoppingBag, FiCalendar, FiTruck } from "react-icons/fi";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { userData } = useSelector((state) => state.user);

  const getCurrentUser = async () => {
    try {
      const { data } = await AxiosInstance.get("/users/me");
      setUserDetails(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!userData || !userDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const { avatar, email, username, createdAt, orderHistory } = userDetails;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={avatar}
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow"
              alt={username}
            />
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-800 capitalize">
                {username}
              </h1>
              <p className="text-gray-600">{email}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <FiCalendar className="mr-1" />
                <span>
                  Member since{" "}
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <Link
              to="/profile/settings"
              className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-md hover:bg-teal-100 transition-colors"
            >
              <FiSettings />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiShoppingBag className="mr-2" />
              Order History
            </h2>
          </div>

          {orderHistory?.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {orderHistory.map((order) => (
                <div key={order._id} className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FiCalendar className="mr-1" />
                        <span>
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {order.deliveredAt && (
                          <>
                            <span className="mx-2">•</span>
                            <FiTruck className="mr-1" />
                            <span>
                              Delivered on{" "}
                              {new Date(order.deliveredAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {order.products.map((item) => {
                      const isKg = item.quantityInKg > 0;
                      const quantity = isKg ? item.quantityInKg : item.quantity;
                      const pricePerUnit = isKg ? item?.product?.pricePerKg : item?.product?.price;

                      return (
                        <div
                          key={item._id}
                          className="flex items-center p-4 hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item?.product?.images[0]?.url}
                              alt={item?.product?.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                                {item?.product?.title}
                              </h4>
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${isKg ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                                }`}>
                                {isKg ? 'Sold by Kg' : 'Sold by Unit'}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <span>
                                {quantity} {isKg ? 'kg' : ''} × Rs. {pricePerUnit}
                              </span>
                              <span className="mx-2">•</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${item.product?.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {item.product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              Rs. {item.price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Payment: {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Online'} •
                      Status: {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                    </div>
                    <div className="flex">
                      <div className="text-right mr-8">
                        <p className="text-sm text-gray-500">Shipping</p>
                        <p className="text-sm font-medium text-gray-900">
                          Rs. {order.shippingDetails.shippingCost}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-lg font-bold text-teal-600">
                          Rs. {order.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No orders yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by placing your first order.
              </p>
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;