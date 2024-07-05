import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { CiCircleChevDown } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const DashboardOrder = () => {
  const options = [
    {
      id: 1,
      label: "Pending",
      value: "pending",
    },
    {
      id: 2,
      label: "Delivered",
      value: "delivered",
    },
    {
      id: 3,
      label: "Cancelled",
      value: "cancelled",
    },
  ];
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getAllOrder = async () => {
    const { data } = await AxiosInstance.get("/dashboard/order/get-all-order");
    if (data.statusCode !== 200) return;
    setOrders(data?.data);
  };

  const handleDeleteOrder = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this order. ?"
    );
    if (!confirmDelete) return;
    try {
      const { data } = await AxiosInstance.delete(`/order/delete-order/${id}`);
      console.log(data);
      if (data?.statusCode !== 200) return;
      toast.success(data?.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Failed to delete the order");
    }
  };

  const handleChange = async (id, e) => {
    console.log(id);
    const { data } = await AxiosInstance.patch(`/order/${id}/update-status`);
    if (data?.statusCode !== 200) return;
    toast.success(data?.message);
  };
  useEffect(() => {
    getAllOrder();
  }, [refresh]);

  return (
    <div style={{ fontFamily: "sans-serif" }} className="flex px-6 flex-col ">
      <div>
        <div className="heading flex items-center py-2 px-8 border justify-between  bg-gray-100 rounded-lg font-bold text-base">
          <p className="flex w-20 items-center gap-2">
            Id
            <span>
              <FaCaretDown />
            </span>
          </p>
          <p className="w-40">Name</p>
          <p className="w-60">Address</p>
          <p className="flex items-center w-32 gap-2">
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
          <p className=" w-32">Action</p>
        </div>
        <div className="flex mt-2 flex-col gap-2">
          {orders &&
            orders?.map((order) => (
              <div
                key={order._id}
                className="flex gap-4 px-4 py-2 rounded-lg font-semibold tracking-wide leading-8 items-center justify-between border text-sm hover:bg-blue-500 hover:text-white cursor-pointer capitalize transition-all delay-75 ease-linear font-sans"
              >
                <p className=" w-20">#{order._id.slice(17)}</p>
                <p className=" w-40">{order.shippingDetails.name}</p>
                <p className="capitalize w-60">
                  {order.shippingDetails.address.city},{" "}
                  <span className="font-light tracking-widest">
                    {order.shippingDetails.address.street.toUpperCase()}
                  </span>
                </p>
                <p className="w-32">
                  {new Date(
                    order.createdAt.substring(0, 10)
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="w-32 ">Rs:{order.totalAmount}</p>
                <p
                  className={`w-20 ${
                    order.paymentStatus.toLowerCase() === "paid"
                      ? "text-green-400"
                      : "text-red-400"
                  } flex items-center gap-2`}
                >
                  <CiCircleChevDown className="text-xl " />
                  {order.paymentStatus}
                </p>
                <p className="w-40  justify-between flex items-center gap-2 text-black">
                  <select
                    onChange={(e) => handleChange(order._id, e)}
                    className="outline-none border-black border rounded-lg p-3 cursor-pointer"
                    name="orderStatus"
                    id="orderStatus"
                    defaultValue={
                      order.paymentStatus.toLowerCase() === "paid"
                        ? "delivered"
                        : "pending"
                    }
                  >
                    {options?.map((option) => (
                      <option
                        onClick={() => handleUpdate(order._id)}
                        key={option.id}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleDeleteOrder(order._id)}>
                    <MdDelete className="text-4xl hover:text-red-400 text-red-800" />
                  </button>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;
