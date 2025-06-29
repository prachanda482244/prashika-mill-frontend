import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { statusStyles } from "../../constants/constants";

const DashboardOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get(`/order/${id}`);
      if (data?.statusCode === 200) {
        setOrder(data?.data);
      } else {
        toast.error("Failed to fetch order details");
      }
    } catch (error) {
      toast.error("No order available");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-10 text-gray-500">
        No order details available
      </div>
    );
  }

  const currentStatus = statusStyles[order.orderDetails.status] || {
    text: "Unknown",
    bgColor: "bg-gray-200",
    textColor: "text-gray-700",
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  console.log(order, "order")
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800">
            Order #<span className="text-purple-600">{order._id?.slice(-6)}</span>
          </h1>
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
              src={order.customer.imageUrl}
              alt={order.customer.name}
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              {order.customer.name}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-lg font-semibold text-gray-800">
            Total: Rs. {order.payment.total.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 capitalize">
            {order.payment.method.replace(/_/g, ' ')}
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date Created</h3>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {formatDate(order.orderDetails.createdAt)}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
              <p className={`mt-1 inline-flex px-3 py-1 rounded-full text-xs font-medium ${order.payment.status === 'paid'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
                }`}>
                {order.payment.status}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order Status</h3>
              <p className={`mt-1 inline-flex px-3 py-1 rounded-full text-xs font-medium ${currentStatus.bgColor} ${currentStatus.textColor}`}>
                {currentStatus.text}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Customer Notes</h3>
              <p className="mt-1 text-sm text-gray-900">
                {order.orderDetails.notes || "No additional notes"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
              <p className="mt-1 text-sm text-gray-900">
                {order.shipping.address}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Shipping Cost</h3>
              <p className="mt-1 text-sm text-gray-900">
                Rs. {order.shipping.cost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information Section */}
      <div className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Customer Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {order.customer.name}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-sm text-gray-900">
              {order.customer.email}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p className="mt-1 text-sm text-gray-900">
              {order.customer.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Products</h2>
        </div>

        <div className="divide-y">
          {order.products.map((product, index) => (
            <div key={index} className="p-6 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain rounded-lg border"
                />
              </div>

              <div className="w-full md:w-3/4">
                <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Price</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      {product.quantity}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Subtotal</h4>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      Rs. {(product.price * product.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end">
            <div className="text-right space-y-2">
              <div className="flex items-center justify-between w-64">
                <span className="text-sm font-medium text-gray-500">Subtotal:</span>
                <span className="text-sm text-gray-900">
                  Rs. {(order.payment.total - order.shipping.cost).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between w-64">
                <span className="text-sm font-medium text-gray-500">Shipping:</span>
                <span className="text-sm text-gray-900">
                  Rs. {order.shipping.cost.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between w-64 pt-2 border-t">
                <span className="text-base font-semibold text-gray-800">Total:</span>
                <span className="text-base font-semibold text-gray-900">
                  Rs. {order.payment.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderDetails;