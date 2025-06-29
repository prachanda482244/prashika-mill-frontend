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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
    <nav className="w-full bg-white shadow-sm">
      {/* Top Bar - Logo and Mobile Menu Button */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          className="border-2 md:border-4 font-medium text-sm md:text-base lg:text-xl px-2 py-1 md:px-3 md:py-2 border-black uppercase"
          to="/"
        >
          Prashika Mil
        </NavLink>

        {/* Desktop Navigation - Primary Links */}
        <div className="hidden md:flex space-x-4 lg:space-x-8">
          {navlinks_1?.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `text-xs lg:text-base uppercase tracking-wide ${isActive ? "text-teal-500" : "text-gray-700"
                } hover:text-teal-300`
              }
              key={link.id}
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Mobile Search Icon - Could implement search functionality */}
          <CiSearch className="h-5 w-5 cursor-pointer" />

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <RxCross1 className="h-6 w-6" />
            ) : (
              <GiHamburgerMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation - Secondary Links */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 border-b-2 border-black px-2 py-1 outline-none placeholder:text-gray-700"
            />
            <CiSearch className="absolute right-2 top-2" />
          </div>

          {/* Account Links */}
          <ul className="flex items-center space-x-4">
            {navlinks_2.map(
              (link) =>
                link.isVisible(isLoggedIn) && (
                  <li key={link.id}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-1 ${isActive ? "text-teal-500" : "text-gray-700"
                        } hover:text-teal-300`
                      }
                      onClick={link.id === 6 ? handleLogout : undefined}
                    >
                      <div className="relative">
                        {link.name !== "profile" && (
                          <span
                            className={`inline-flex items-center justify-center rounded-full p-1 ${link.id === 5 ? "text-black" : "text-gray-700"
                              }`}
                          >
                            <link.icons className="h-4 w-4 lg:h-5 lg:w-5" />
                          </span>
                        )}
                        {link.id === 5 && (
                          <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                            {cartItems ? cartItems?.products?.length : 0}
                          </span>
                        )}
                      </div>
                      <span className="text-xs lg:text-sm">
                        {link.name === "profile"
                          ? userData?.username
                          : link.name}
                      </span>
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t border-gray-200">
          {/* Mobile Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b-2 border-black px-2 py-1 outline-none placeholder:text-gray-700"
            />
            <CiSearch className="absolute right-2 top-2" />
          </div>

          {/* Primary Links */}
          <div className="flex flex-col space-y-3 mb-4">
            {navlinks_1?.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `text-sm uppercase tracking-wide py-1 ${isActive ? "text-teal-500" : "text-gray-700"
                  } hover:text-teal-300`
                }
                key={link.id}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Secondary Links */}
          <div className="flex flex-col space-y-3">
            {navlinks_2.map(
              (link) =>
                link.isVisible(isLoggedIn) && (
                  <NavLink
                    key={link.id}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 py-1 ${isActive ? "text-teal-500" : "text-gray-700"
                      } hover:text-teal-300`
                    }
                    onClick={() => {
                      if (link.id === 6) handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <div className="relative">
                      {link.name !== "profile" && (
                        <span
                          className={`inline-flex items-center justify-center rounded-full p-1 ${link.id === 5 ? "text-black" : "text-gray-700"
                            }`}
                        >
                          <link.icons className="h-5 w-5" />
                        </span>
                      )}
                      {link.id === 5 && (
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                          {cartItems ? cartItems?.products?.length : 0}
                        </span>
                      )}
                    </div>
                    <span className="text-sm">
                      {link.name === "profile" ? userData?.username : link.name}
                    </span>
                  </NavLink>
                )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;