import { NavLink } from "react-router-dom";
import { footerLinks, icons } from "../constants/constants";
import FooterHeading from "./FooterHeading";

const Footer = () => {
  return (
    <div className="w-full bg-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo Section - Full width on mobile, then first column */}
          <div className="col-span-2 md:col-span-1 mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h1 className="text-2xl sm:text-3xl p-2 border-4 border-black uppercase inline-block">
              Prashika mel
            </h1>
            <p className="mt-4 text-gray-600 text-center md:text-left hidden sm:block">
              Quality organic products straight from our farm
            </p>
          </div>

          {/* Shop Links - First column on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <FooterHeading title="shop" />
            <ul className="mt-3 space-y-2">
              {footerLinks.slice(0, 2).map((link) => (
                <li key={link.id}>
                  <NavLink
                    className="uppercase tracking-wider text-xs sm:text-sm md:text-base text-gray-600 hover:text-black transition-colors text-center sm:text-left"
                    to={link.to}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links - Second column on mobile */}
          <div className="flex flex-col items-center sm:items-start">
            <FooterHeading title="help" />
            <ul className="mt-3 space-y-2">
              {footerLinks.slice(2, 5).map((link) => (
                <li key={link.id}>
                  <NavLink
                    className="uppercase tracking-wider text-xs sm:text-sm md:text-base text-gray-600 hover:text-black transition-colors text-center sm:text-left"
                    to={link.to}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info & Contact - Full width on mobile, then last column */}
          <div className="col-span-2 md:col-span-1 space-y-6 md:space-y-8 mt-6 md:mt-0">
            <div className="flex flex-col items-center sm:items-start">
              <FooterHeading title="Prashika mel" />
              <ul className="mt-3 space-y-2">
                {footerLinks.slice(5).map((link) => (
                  <li key={link.id}>
                    <NavLink
                      className="uppercase tracking-wider text-xs sm:text-sm md:text-base text-gray-600 hover:text-black transition-colors text-center sm:text-left"
                      to={link.to}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <FooterHeading title="Contact us" />
              <div className="mt-3 space-y-1 text-xs sm:text-sm md:text-base text-gray-600 text-center sm:text-left">
                <p className="hover:text-black transition-colors">9860115454</p>
                <p className="hover:text-black transition-colors">
                  prakash@gmail.com
                </p>
                <div className="flex gap-3 pt-3 text-lg md:text-xl justify-center sm:justify-start">
                  {icons.map((icon) => (
                    <a
                      key={icon.id}
                      href="#"
                      className="text-gray-600 hover:text-black transition-colors"
                      aria-label={icon.name}
                    >
                      <icon.name />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#5e5e4a] py-4">
        <div className="container mx-auto px-4 text-center text-white tracking-wider text-xs sm:text-sm md:text-base">
          <p>&copy; 2024 by prakash. All copyright reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;