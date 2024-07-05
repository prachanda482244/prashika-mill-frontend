import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";

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
  return <div></div>;
};

export default DashboardOrder;
