import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { navlinks_1, navlinks_2 } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { fetchCartData } from "../store/slices/cartSlice";

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const { cartItems, status } = useSelector((state) => state.cart);
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
  useEffect(() => {
    dispatch(fetchCartData());
  }, [status]);

  return (
    <nav className="flex sm:flex-row py-2  flex-col sm:py-16  items-center sm:px-20 font-normal   w-full justify-between ">
      <div className="flex items-center   w-full justify-between">
        <div className="sm:flex  hidden  uppercase tracking-wide items-center gap-10">
          {navlinks_1?.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `${isActive ? "text-teal-500" : ""} hover:text-teal-300`
              }
              key={link.id}
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div>
          <NavLink
            className=" border-2 sm:border-4 font-medium text-xs sm:text-2xl px-1 py-2 border-black uppercase"
            to="/"
          >
            Prashika Mil
          </NavLink>
        </div>

        <div className="sm:flex hidden relative items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="sm:w-60 w-40   border-b-2 sm:mr-8 border-black px-8 hover:border-2 outline-none sm:py-2 placeholder:text-black"
          />
          <CiSearch className="absolute left-0 text-2xl " />

          <ul
            className={`sm:flex  sm:flex-row flex-col gap-3 text-xl items-center hidden `}
          >
            {navlinks_2.map(
              (link) =>
                link.isVisible(isLoggedIn) && (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `${isActive ? "text-teal-500" : ""} 
                       ${
                         link.name === "profile" ? "uppercase" : ""
                       } hover:text-teal-300 flex items-center gap-3 font-light tracking-wide`
                    }
                    onClick={
                      link.id === 6
                        ? handleLogout
                        : () => {
                            setIsOpen((prev) => !prev);
                          }
                    }
                  >
                    <div className="relative">
                      {link.name === "profile" ? (
                        ""
                      ) : (
                        <span
                          className={` ${
                            link.id !== 5 ? "text-lg" : "text-xl  text-black"
                          } flex items-center justify-center bg-gray-500 rounded-full text-white p-3 `}
                        >
                          {<link.icons />}
                        </span>
                      )}
                      {link.id === 5 ? (
                        <span className="absolute text-xs  text-white h-5 w-5 text-center rounded-full top-7 font-bold left-5">
                          {cartItems ? cartItems?.products?.length : 0}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-base">
                      {link.name === "profile" ? userData?.username : link.name}
                    </span>
                  </NavLink>
                )
            )}
          </ul>
        </div>

        <div className="sm:hidden" onClick={() => setIsOpen((prev) => !prev)}>
          <div className="sm:hidden flex items-center">
            {navlinks_2.map(
              (link) =>
                link.isVisible(isLoggedIn) && (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `${isActive ? "text-teal-500" : ""} 
                       ${
                         link.name === "profile" ? "uppercase" : ""
                       } hover:text-teal-300 flex items-center  font-light tracking-wide`
                    }
                    onClick={
                      link.id === 6
                        ? handleLogout
                        : () => {
                            setIsOpen((prev) => !prev);
                          }
                    }
                  >
                    <div className="relative">
                      {link.name === "profile" ? (
                        ""
                      ) : (
                        <span
                          className={` ${
                            link.id !== 5 ? "text-md" : "text-xl  text-black"
                          } flex items-center justify-center bg-gray-500 rounded-full text-white p-3 `}
                        >
                          {<link.icons />}
                        </span>
                      )}
                      {link.id === 5 ? (
                        <span className="absolute text-xs  text-white h-5 w-5 text-center rounded-full top-7 font-bold left-5">
                          {cartItems ? cartItems?.products?.length : 0}
                        </span>
                      ) : null}
                    </div>
                  </NavLink>
                )
            )}
          </div>
          {isOpen ? (
            <GiHamburgerMenu className="h-5 w-5 cursor-pointer" />
          ) : (
            <RxCross1 className="h-5 w-5 cursor-pointer" />
          )}
        </div>
      </div>
      {/* {!isOpen && (
        <div className="bg-[#d7d7cb] min-h-screen min-w-full">
          <div className="flex flex-col gap-5 items-center text-left py-10">
            {navlinks_2.map(
              (link) =>
                link.isVisible(isLoggedIn) && (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `${isActive ? "text-teal-500" : ""} 
                       ${
                         link.name === "profile" ? "uppercase" : ""
                       } hover:text-teal-300 flex items-center gap-3 font-light tracking-wide`
                    }
                    onClick={
                      link.id === 6
                        ? handleLogout
                        : () => {
                            setIsOpen((prev) => !prev);
                          }
                    }
                  >
                    <div className="relative">
                      {link.name === "profile" ? (
                        ""
                      ) : (
                        <span
                          className={` ${
                            link.id !== 5 ? "text-lg" : "text-xl  text-black"
                          } flex items-center justify-center bg-gray-500 rounded-full text-white p-3 `}
                        >
                          {<link.icons />}
                        </span>
                      )}
                      {link.id === 5 ? (
                        <span className="absolute text-xs  text-white h-5 w-5 text-center rounded-full top-7 font-bold left-5">
                          {cartItems ? cartItems?.products?.length : 0}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-base">
                      {link.name === "profile" ? userData?.username : link.name}
                    </span>
                  </NavLink>
                )
            )}
            {navlinks_1?.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-teal-500" : ""} hover:text-teal-300`
                }
                key={link.id}
                to={link.path}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
