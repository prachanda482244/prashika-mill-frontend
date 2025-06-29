import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { CiCircleChevDown } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { options, statusStyles } from "../../constants/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashboardOrder = () => {
  const { search } = useSelector((state) => state.search);
  const [orders, setOrders] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get("/dashboard/order/get-all-order");
      if (data.statusCode !== 200) return;
      setOrders(data?.data);
      setFilteredOrder(data?.data);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;
    try {
      const { data } = await AxiosInstance.delete(`/order/delete-order/${id}`);
      if (data?.statusCode !== 200) return;
      toast.success(data?.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Failed to delete the order");
    }
  };

  const handleChange = async (id, e) => {
    try {
      const { data } = await AxiosInstance.patch(`/admin/orders/${id}/update-status`, {
        status: e.target.value,
      });
      if (data?.statusCode !== 200) return;
      setRefresh(!refresh);
      toast.success(data?.message);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    getAllOrder();
  }, [refresh]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredOrder(orders);
    } else {
      const filteredOrdersArr = orders.filter(
        (order) =>
          order.name?.toLowerCase().includes(search.toLowerCase()) ||
          order.address?.join(" ").toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOrder(filteredOrdersArr);
    }
  }, [search, orders]);

  const getStatusTextAndStyles = (status) =>
    statusStyles[status] || {
      text: "Unknown",
      bgColor: "bg-gray-200",
      textColor: "text-gray-700",
    };

  // Calculate totals
  const totalOrders = filteredOrder.length;
  const totalAmount = filteredOrder.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Summary Cards - Mobile */}


      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b mb-1">
          <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all customer orders
          </p>
        </div>
        <div className=" mb-4 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-semibold">{totalOrders}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-semibold">Rs: {totalAmount}</p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow-sm border-b border-gray-200 rounded-lg">
                <table className="min-w-full divide-y  divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          ID <FaCaretDown className="ml-1" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Date <FaCaretDown className="ml-1" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Price <FaCaretUp className="ml-1" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrder.length ? (
                      filteredOrder.map((order) => {
                        const paymentStatusStyles = getStatusTextAndStyles(
                          order.paymentStatus
                        );
                        const orderStatusStyles = getStatusTextAndStyles(order.status);

                        return (
                          <tr
                            key={order._id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  navigate(`/dashboard/orders/${order._id}`)
                                }
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                #{order._id.slice(-6)}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 capitalize">
                                {order.name}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 capitalize">
                                {order.address}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {new Date(
                                  order.date?.substring(0, 10)
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                Rs: {order.totalPrice}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${paymentStatusStyles.bgColor} ${paymentStatusStyles.textColor}`}
                              >
                                {paymentStatusStyles.text}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <CiCircleChevDown className="mr-1" />
                                <span
                                  className={`${orderStatusStyles.textColor} text-sm font-medium`}
                                >
                                  {orderStatusStyles.text}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end space-x-2">
                                <select
                                  onChange={(e) => handleChange(order._id, e)}
                                  className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                                  defaultValue={order.status}
                                >
                                  {options.map((option) => (
                                    <option key={option.id} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={() => handleDeleteOrder(order._id)}
                                  className="text-red-600 hover:text-red-800 p-1"
                                >
                                  <MdDelete className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 mb-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                              />
                            </svg>
                            <p className="text-lg">No orders found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {filteredOrder.length ? (
            <div className="space-y-4 p-4">
              {filteredOrder.map((order) => {
                const paymentStatusStyles = getStatusTextAndStyles(
                  order.paymentStatus
                );
                const orderStatusStyles = getStatusTextAndStyles(order.status);

                return (
                  <div
                    key={order._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/orders/${order._id}`)
                          }
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                        >
                          #{order._id.slice(-6)}
                        </button>
                        <div className="flex space-x-2">
                          <select
                            onChange={(e) => handleChange(order._id, e)}
                            className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                            defaultValue={order.status}
                          >
                            {options.map((option) => (
                              <option key={option.id} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <MdDelete className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-2">
                        <h3 className="text-sm font-medium text-gray-900 capitalize">
                          {order.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 capitalize">
                          {order.address}
                        </p>
                      </div>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm">
                            {new Date(
                              order.date?.substring(0, 10)
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-sm font-medium">
                            Rs: {order.totalPrice}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Payment</p>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${paymentStatusStyles.bgColor} ${paymentStatusStyles.textColor}`}
                          >
                            {paymentStatusStyles.text}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Status</p>
                          <div className="flex items-center">
                            <span
                              className={`${orderStatusStyles.textColor} text-sm font-medium`}
                            >
                              {orderStatusStyles.text}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;