import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import DashNavBar from "./components/DashNavBar";
import DashSideBar from "./components/DashSideBar";
import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Dashboard = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getDashboardDetails = async () => {
    const { data } = await AxiosInstance.get("/dashboard");
    if (data.statusCode !== 200) return;
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashNavBar onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile unless toggled */}
        <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <DashSideBar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ">
          <div className="p-4 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;