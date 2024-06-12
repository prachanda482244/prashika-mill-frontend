import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import DashNavBar from "./components/DashNavBar";
import DashSideBar from "./components/DashSideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState({});

  const getDashboardDetails = async () => {
    const { data } = await AxiosInstance.get("/dashboard");
    console.log(data);
    if (data.statusCode !== 200) return;
    setDashboardDetails(data.data);
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);

  console.log(dashboardDetails);

  return (
    <div>
      <DashNavBar />
      <div className="flex ">
        <DashSideBar />
        <div className="flex-grow border  p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
