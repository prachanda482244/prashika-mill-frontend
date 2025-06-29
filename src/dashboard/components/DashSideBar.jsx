import React from "react";
import { dashSidebar } from "../../constants/constants";
import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";

const DashSideBar = () => {
  return (
    <aside className="h-full  bg-white shadow-sm w-64 py-4">
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end px-4 mb-4">
        <button className="text-gray-500 hover:text-gray-700">
          <FiX className="h-6 w-6" />
        </button>
      </div>

      <ul className="space-y-1">
        {dashSidebar?.map((data) => (
          <li key={data.id}>
            <NavLink
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm md:text-base font-medium transition-colors ${isActive
                  ? "bg-purple-50 text-purple-600 border-r-4 border-purple-600"
                  : "text-gray-600 hover:bg-gray-100"
                }`
              }
              to={data.link}
            >
              <span className="mr-3 text-lg">{<data.icon />}</span>
              <p>{data.name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashSideBar;