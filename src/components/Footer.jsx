import { NavLink } from "react-router-dom";
import { footerLinks, icons } from "../constants/constants";
import FooterHeading from "./FooterHeading";

const Footer = () => {
  return (
<div className="flex flex-col">

<div className="flex  justify-between px-10 py-20">
  <div>
    <h1 className="text-3xl p-2 border-4 border-black uppercase">Prashika mel</h1>
  </div>
  <div className="flex flex-col gap-10">
    <div className="flex flex-col gap-3">
    <FooterHeading title="shop" />

  <ul className=" flex flex-col gap-3 font-light">
    {
      footerLinks.slice(0,2).map(link=>(
        <NavLink className="uppercase tracking-wider" key={link.id} to={link.to}>{link.name}</NavLink>
      ))
    }
  </ul>
    </div>
      <div className="flex flex-col gap-3">
        <FooterHeading title="help" />
  <ul className=" flex flex-col gap-3 font-light">
        {
          footerLinks.slice(2,5).map(link=>(
        <NavLink className="uppercase tracking-wider" key={link.id} to={link.to}>{link.name}</NavLink>
          ))
        }
  </ul>
      </div>
  </div>

  <div className="flex flex-col gap-10 ">
    <div className="flex flex-col gap-3">
    <FooterHeading title="Prashika mel" />
    <ul className=" flex flex-col gap-3 font-light">
    {
          footerLinks.slice(5).map(link=>(
        <NavLink className="uppercase tracking-wider" key={link.id} to={link.to}>{link.name}</NavLink>
          ))
        }
    </ul>
    </div>

    <div className="flex flex-col gap-3 font-light tracking-widest">
      <FooterHeading title="Contact us" />
      <p>9860115454</p>
      <p>prakash@gmail.com</p>
      <div className="flex gap-5 text-2xl py-3">
        {
          icons.map(icon=>(
            <p className="cursor-pointer hover:text-gray-400" key={icon.id}>{<icon.name />}</p>
          ))
        }
      </div>
    </div>

  </div>
  <div>
  </div>
</div>     

  <div className="bg-[#5e5e4a] py-5  flex items-center text-white tracking-widest font-medium justify-center"> 
<h1> &copy; 2024 by prakash. All copyright reserved.</h1>
  </div>
</div>
  );
};

export default Footer;
