import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { statusStyles } from "../../constants/constants";

const DashboardOrderDetails = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSingleDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get(`/order/get-single-order/${id}`);
      if (data?.statusCode === 200) {
        setUserOrder(data?.data);
        toast.success(data?.message);
      } else {
        toast.error("Failed to fetch order details");
      }
    } catch (error) {
      toast.error("An error occurred while fetching order details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userOrder) {
    return <div>No order details available</div>;
  }
  console.log(userOrder);

  const currentStatus = statusStyles[userOrder.status] || {
    text: "Unknown",
    bgColor: "bg-gray-200",
    textColor: "text-gray-700",
  };

  return (
    <div>
      {userOrder && (
        <div>
          <div className="text-xl justify-between font-sans flex items-center px-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                Order #
                <span className="text-purple-400">
                  {userOrder._id?.slice(17)}
                </span>
                details
              </div>
              <p>
                <img
                  className="h-10 rounded-full w-10 object-cover"
                  src={userOrder.imageUrl}
                  alt={userOrder.name}
                />
              </p>
            </div>
            <div>Total: {userOrder.totalAmount}</div>
          </div>
          <p className="text-gray-300">{userOrder.paymentMethod}</p>

          <div className="font-light border rounded-md px-5 py-2">
            <div className="flex justify-between gap-2">
              <div className="w-1/2 flex flex-col gap-3">
                <div>
                  <h5 className="font-semibold text-lg">General</h5>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h5 className="text-gray-400 text-sm">Date created:</h5>
                    <span className="border shadow-sm text-black font-bold py-1 px-4">
                      {new Date(
                        userOrder.createdAt.substring(0, 10)
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <p>Payment:</p>
                    <span className="bg-purple-200 text-purple-500 py-1 px-3 rounded-lg">
                      {userOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <p>Status:</p>
                  <span
                    className={`border capitalize ${currentStatus.bgColor} ${currentStatus.textColor} px-4 py-2 rounded-md`}
                  >
                    {currentStatus.text}
                  </span>
                </div>

                <div className="flex justify-between gap-1">
                  <div>
                    <p className="text-gray-700">Address:</p>
                    <span className="text-slate-400 font-bold">
                      {userOrder.address}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-700">Phone:</p>
                    <span className="text-slate-400 font-bold">
                      {userOrder.phone}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="text-gray-300">Name</p>
                    <span className="text-blue-500">{userOrder.name}</span>
                  </div>
                  <div>
                    <p>Email</p>
                    <span>{userOrder.email}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-bold text-lg">Notes:</h3>
                  <p>{userOrder.notes || "User order notes here "}</p>
                </div>
              </div>

              <div className="flex px-5 w-1/2 flex-col">
                <h4 className="font-bold text-lg font-serif tracking-wider">
                  Product details
                </h4>
                <div className="flex flex-col gap-2">
                  {userOrder.product?.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-lg border-blue-400 px-6 py-2 flex gap-2 cursor-pointer"
                    >
                      <div className="w-52">
                        <img
                          className="w-52 h-40 object-cover rounded-lg"
                          src={item.productImage}
                          alt={item.productTitle}
                        />
                      </div>
                      <div className="flex text-emerald-700 font-bold flex-col justify-between w-1/2">
                        <p className="flex flex-col">
                          <span className="text-lg tracking-wider">
                            {item.productTitle}
                          </span>
                          <span className="font-light">
                            {item.productDescription}
                          </span>
                        </p>
                        <div className="flex justify-between items-center text-black">
                          <div className="flex items-center">
                            Rs:<p>{item.productPrice}</p>
                          </div>
                          <div className="flex items-center">
                            Quantity: <p>{item.productQuantity}</p>
                          </div>
                          <div className="flex items-center">
                            Total:{" "}
                            <p>{item.productPrice * item.productQuantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOrderDetails;
