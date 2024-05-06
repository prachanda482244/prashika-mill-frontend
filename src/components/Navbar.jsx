import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { navlinks } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    setIsOpen((prev) => !prev);
    const { data } = await AxiosInstance.post("/users/logout", {});
    toast.success(data?.message);
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <nav className="flex sm:flex-row flex-col py-2 bg-slate-600 text-slate-300 items-center border-b-2  px-2 sm:px-5 justify-between border-2">
      <div className="flex items-center  w-full justify-between">
        <div className=" p-[2px] ">
          <NavLink
            className="text-xs  sm:text-x uppercase md:p-2  rounded-md"
            to="/"
          >
            Prashika Mel
          </NavLink>
        </div>

        <div className="flex items-center md:mr-20  w-[60%] sm:w-auto   relative gap-2">
          <input
            type="text"
            placeholder="Search here"
            className="py-[1px] sm:text-base text-sm sm:py-1 px-4 w-full rounded-md outline-none"
          />

          <CiSearch className="absolute right-2   text-slate-600 cursor-pointer text-2xl " />
        </div>
        <div className="sm:hidden" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <GiHamburgerMenu className="h-5 w-5 cursor-pointer" />
          ) : (
            <RxCross1 className="h-5 w-5 cursor-pointer" />
          )}
        </div>
      </div>

      <ul
        className={`sm:flex sm:flex-row flex-col w-full sm:w-auto   items-center ${
          isOpen ? "hidden" : "block"
        }`}
      >
        {navlinks.map(
          (link) =>
            link.isVisible(isLoggedIn) && (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : ""
                  } text-sm flex hover:text-slate-100 w-full sm:w-auto items-center pr-4 justify-end g1 gap-[1px] capitalize  px-2 rounded-lg py-1  ${
                    link.name === "profile"
                      ? "underline underline-offset-4"
                      : ""
                  }`
                }
                onClick={
                  link.name === "logout"
                    ? handleLogout
                    : () => {
                        setIsOpen((prev) => !prev);
                      }
                }
              >
                {link.name === "profile" ? "" : <span>{<link.icons />}</span>}
                {link.name === "profile" ? userData?.username : link.name}
              </NavLink>
            )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
