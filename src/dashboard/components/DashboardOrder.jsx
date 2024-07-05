import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const DashboardOrder = () => {
  const [orders, setOrders] = useState([]);
  const getAllOrder = async () => {
    const { data } = await AxiosInstance.get("/dashboard/order/get-all-order");
    if (data.statusCode !== 200) return;
    setOrders(data?.data);
  };
  useEffect(() => {
    getAllOrder();
  }, []);

  console.log(orders);
  return (
    <div style={{ fontFamily: "sans-serif" }} className="flex px-6 flex-col ">
      <div>
        <div className="heading flex items-center py-2 px-8 border justify-between  bg-gray-100 rounded-lg font-bold text-base">
          <p className="flex items-center gap-2">
            Id
            <span>
              <FaCaretDown />
            </span>
          </p>
          <p className="w-40">Name</p>
          <p className="w-60">Address</p>
          <p className="flex items-center gap-2">
            Date
            <span>
              <FaCaretDown />
            </span>
          </p>
          <p className="flex w-32 items-center gap-2">
            Price
            <span>
              <FaCaretUp />
            </span>
          </p>
          <p className="w-20">Status</p>
          <p>Action</p>
        </div>
        <div className="flex mt-2 flex-col gap-2">
          {orders &&
            orders?.map((order) => (
              <div
                key={order._id}
                className="flex gap-4 px-4 py-4 rounded-lg font-light items-center justify-between border text-sm"
              >
                <p>#{order._id.slice(17)}</p>
                <p className=" w-40">{order.shippingDetails.name}</p>
                <p className="capitalize w-60">
                  {order.shippingDetails.address.city},{" "}
                  {order.shippingDetails.address.street}
                </p>
                <p>
                  {new Date(
                    order.createdAt.substring(0, 10)
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="w-32 ">Rs:{order.totalAmount}</p>
                <p className=" w-20">{order.paymentStatus}</p>
                <p>
                  <select name="" id="">
                    <option value="pending">Pending</option>
                    <option value="fulfill">Fullfill</option>
                  </select>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;
