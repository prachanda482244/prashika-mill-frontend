import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navlinks } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { logoutUser } from "../store/slices/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
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
      <div className="flex items-center gap-2">
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
        {user?.token ? (
          <div className="flex gap-2 items-center">
            <NavLink to="/profile">Profile</NavLink>
            <p className=" ">
              <img
                src={user?.userData?.avatar}
                alt="user"
                height={50}
                width={40}
                className="object-cover shadow-sm rounded-full"
              />
            </p>
          </div>
        ) : (
          navlinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-slate-500 text-white border-none " : ""
                } text-sm flex items-center gap-2 px-2 rounded-lg py-1  shadow-lg uppercase`
              }
            >
              <span>{<link.icons />}</span>
              {link.name}
            </NavLink>
          ))
        )}
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${
              isActive ? "bg-slate-500  text-white border-none " : ""
            } text-sm flex items-center gap-2 px-2 rounded-lg py-1  border-[1px] uppercase`
          }
        >
          <span>{<FaCartPlus />}</span>
          Cart
        </NavLink>
        {user?.token && (
          <button
            className="border-[1px] text-sm flex items-center gap-2 px-2 rounded-lg py-1 uppercase hover:bg-slate-400 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
