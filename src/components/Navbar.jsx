import React from "react";
import { NavLink } from "react-router-dom";
import { navlinks } from "../constants/constants";

const Navbar = () => {
  return (
    <nav className="flex py-2 items-center border-b-2 border-b-slate-300 px-5 justify-between">
      <div>
        <NavLink
          className="text-xl text-purple-900 uppercase p-2 rounded-lg shadow-lg"
          to={"/"}
        >
          Prashika Mel
        </NavLink>
      </div>
      <div className="flex items-center  w-[40%] gap-2">
        <input
          type="search"
          placeholder="Search here"
          className=" focus:outline-slate-400 bg-slate-200 w-full rounded-lg px-4 py-1 font-light"
        />
        <button className="bg-cyan-500 uppercase font-light text-white py-1 px-4 rounded-lg">
          search
        </button>
      </div>
      <ul className="flex items-center  gap-2 p-2">
        {navlinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `${
                isActive ? "bg-slate-500 text-white border-none " : ""
              } text-lg flex items-center gap-2 px-2 rounded-lg py-1  shadow-lg uppercase`
            }
          >
            <span>{<link.icons />}</span>
            {link.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
