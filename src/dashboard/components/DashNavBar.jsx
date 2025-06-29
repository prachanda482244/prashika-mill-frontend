import React, { useState } from "react";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setsearch } from "../../store/slices/searchSlice";
import AxiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashNavBar = ({ onMenuToggle }) => {
  const { userData } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchInput(value);
    dispatch(setsearch(value));
  };

  const handlelogout = async () => {
    const { data } = await AxiosInstance.post("/users/logout", {});
    toast.success(data?.message);
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <nav className="bg-white shadow-sm py-3 px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <CiMenuBurger className="h-6 w-6" />
        </button>

        {/* Brand Logo */}
        <div className="flex items-center">
          <p className="text-xl md:text-2xl font-medium tracking-wider text-gray-800">Prashika Mel</p>
        </div>

        {/* Search Bar - Hidden on small screens */}
        <div className="hidden md:flex flex-grow relative mx-4 lg:mx-8">
          <input
            className="py-2 w-full px-10 outline-none focus:ring-2 focus:ring-purple-400 rounded-lg border border-gray-300 font-light h-10 md:h-12"
            type="text"
            value={searchInput}
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <CiSearch className="absolute left-3 top-2.5 md:top-3.5 text-xl text-gray-400" />
        </div>

        {/* User Profile and Logout */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2">
            <img
              src={userData?.avatar}
              className="h-8 w-8 object-cover rounded-full"
              alt="User"
            />
            <span className="font-light tracking-wider text-gray-700">
              {userData?.username}
            </span>
          </div>
          <button
            onClick={handlelogout}
            className="bg-blue-500 hover:bg-blue-600 py-1.5 px-3 md:py-2 md:px-4 rounded-lg text-white text-sm md:text-base transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Search - Only shows on small screens */}
      <div className="mt-3 md:hidden">
        <div className="relative">
          <input
            className="py-2 w-full px-10 outline-none focus:ring-2 focus:ring-purple-400 rounded-lg border border-gray-300 font-light h-10"
            type="text"
            value={searchInput}
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <CiSearch className="absolute left-3 top-2.5 text-xl text-gray-400" />
        </div>
      </div>
    </nav>
  );
};

export default DashNavBar;