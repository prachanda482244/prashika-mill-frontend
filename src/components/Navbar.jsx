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
    const { data } = await AxiosInstance.post("/users/logout", {});
    toast.success(data?.message);
    dispatch(logoutUser());
    navigate("/");
  };
  useEffect(() => {
    dispatch(fetchCartData());
  }, [status]);

  return (
    <nav className="flex sm:flex-row py-2  flex-col lg:py-16  items-center lg:px-20 font-normal   w-full justify-between ">
      <div className="flex flex-col justify-between md:flex-row p-2 w-full ">
        {isOpen && (
          <div className="flex mt-2 sm:mt-0 order-2 md:order-1 flex-col md:flex-row  sm:flex uppercase tracking-wide  items-center text-xs lg:text-base sm:w-full gap-5 md:w-1/2 lg:w-[70%]  lg:gap-10">
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
        )}

        <div className="flex order-1 md:order-2  items-center w-full justify-between  md:gap-10">
          <div>
            <NavLink
              className=" border-2 sm:border-4 font-medium sm:text-xs md:text-sm lg:text-xl px-1 py-2 border-black uppercase"
              to="/"
            >
              Prashika Mil
            </NavLink>
          </div>

          <div className="md:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-20  border-b-2 sm:mr-8 border-black hover:border-2 outline-none sm:py-2 placeholder:text-black"
            />
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <RxCross1 className="h-7 w-7 cursor-pointer" />
              ) : (
                <GiHamburgerMenu className="h-7 w-7 cursor-pointer" />
              )}
            </button>
          </div>

          <div className="md:flex hidden relative items-center gap-2">
            <ul className="sm:flex  sm:flex-row flex-col lg:gap-3 text-xs  lg:text-xl items-center ">
              <input
                type="text"
                placeholder="Search..."
                className="lg:w-40 w-10  border-b-2 sm:mr-8 border-black px-8 hover:border-2 outline-none sm:py-2 placeholder:text-black"
              />
              <CiSearch className="absolute text-sm left-0 lg:text-2xl " />

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
                      onClick={link.id === 6 && handleLogout}
                    >
                      <div className="relative">
                        {link.name === "profile" ? (
                          ""
                        ) : (
                          <span
                            className={` ${
                              link.id !== 5
                                ? "text-xs lg:text-xl"
                                : "text-xs lg:text-xl  text-black"
                            } flex items-center justify-center bg-gray-500 rounded-full text-white p-2 `}
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
                        {link.name === "profile"
                          ? userData?.username
                          : link.name}
                      </span>
                    </NavLink>
                  )
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
