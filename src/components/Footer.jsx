import React from "react";
import { icons } from "../constants/constants";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-sky-600 mt-5 py-10 px-10 flex justify-between items-center">
      <div className="flex gap-3 justify-center items-center ">
        {icons?.map((icon) => (
          <div key={icon.id} className="cursor-pointer text-white text-xl">
            {<icon.name />}
          </div>
        ))}
      </div>
      <div className="flex  text-white font-semibold text-lg">
        <p>&copy; all right reserved | prakash rana</p>
      </div>
      <div className="flex px-10 ">
        <NavLink
          to="/sign-in"
          className="px-4 bg-white text-slate-700 py-2 rounded-lg"
        >
          Admin login
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
