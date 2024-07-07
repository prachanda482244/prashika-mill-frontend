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
  const navigate = useNavigate();

  const getAllOrder = async () => {
    const { data } = await AxiosInstance.get("/dashboard/order/get-all-order");
    if (data.statusCode !== 200) return;
    setOrders(data?.data);
    setFilteredOrder(data?.data);
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
    const { data } = await AxiosInstance.patch(`/order/${id}/update-status`, {
      status: e.target.value,
    });

    if (data?.statusCode !== 200) return;
    setRefresh(!refresh);
    toast.success(data?.message);
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
          order.name.toLowerCase().includes(search.toLowerCase()) ||
          order.address.join(" ").toLowerCase().includes(search.toLowerCase())
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

  return (
    <div style={{ fontFamily: "sans-serif" }} className="flex px-6 flex-col">
      <div>
        <div className="heading flex items-center py-2 px-8 border justify-between bg-gray-100 rounded-lg font-bold text-base">
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
          <p className="w-28">Payment</p>
          <p className="w-20">Status</p>
          <p className="w-32">Action</p>
        </div>
        <div className="flex mt-2 flex-col gap-2">
          {filteredOrder.length ? (
            filteredOrder.map((order) => {
              const paymentStatusStyles = getStatusTextAndStyles(
                order.paymentStatus
              );
              const orderStatusStyles = getStatusTextAndStyles(order.status);

              return (
                <div
                  key={order._id}
                  className="flex gap-4 px-4 py-2 rounded-lg font-semibold tracking-wide leading-8 items-center justify-between border text-sm hover:bg-blue-400 hover:text-white cursor-pointer capitalize transition-all delay-75 ease-linear font-sans"
                >
                  <p
                    className="hover:text-green-200 w-20"
                    onClick={() => navigate(`/dashboard/orders/${order._id}`)}
                  >
                    #{order._id.slice(17)}
                  </p>
                  <p className="w-40">{order.name}</p>
                  <p className="capitalize w-60">
                    {order.address[0]},{" "}
                    <span className="font-light tracking-widest">
                      {order.address[1].toUpperCase()}
                    </span>
                  </p>
                  <p className="w-32">
                    {new Date(order.date.substring(0, 10)).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p className="w-32">Rs:{order.totalPrice}</p>
                  <p className="w-20">
                    <span
                      className={`px-2 py-1 ${paymentStatusStyles.bgColor} ${paymentStatusStyles.textColor} rounded-lg`}
                    >
                      {paymentStatusStyles.text}
                    </span>
                  </p>
                  <p
                    className={`w-20 ${orderStatusStyles.textColor} flex items-center gap-2`}
                  >
                    <CiCircleChevDown size={40} className="text-2xl" />
                    {orderStatusStyles.text}
                  </p>
                  <p className="w-40 justify-between flex items-center gap-2 text-black">
                    <select
                      onChange={(e) => handleChange(order._id, e)}
                      className="outline-none border-black border rounded-lg p-2 cursor-pointer"
                      name="orderStatus"
                      id="orderStatus"
                      defaultValue={order.status}
                    >
                      {options.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => handleDeleteOrder(order._id)}>
                      <MdDelete className="text-4xl hover:text-red-400 text-red-800" />
                    </button>
                  </p>
                </div>
              );
            })
          ) : (
            <div className="flex items-center font-semibold justify-center text-xl py-2 text-red-500">
              No order found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrder;
