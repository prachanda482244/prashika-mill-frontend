import { CgProductHunt } from "react-icons/cg";
import {
  FaRegUser,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiShoppingBag } from "react-icons/gi";

import * as yup from "yup";
export const navlinks_1=[
  {
    id:1,
    name:"Shop",
    path:"/products",
  },
  {
    id:2,
    name:"Our story",
    path:"/about"
  },
  {
    id:3,
    name:"Blog",
    path:"/blog"
  },
  {
    id:4,
    name:"Contact",
    path:"/contact"
  }
]
export const navlinks_2 = [
  // {
  //   id: 1,
  //   name: "register",
  //   path: "/sign-up",
  //   icons: FaHouseUser,
  //   isVisible: (isLoggedIn) => !isLoggedIn,
  // },
  {
    id: 2,
    name: "Log in",
    path: "/sign-in",
    icons: FaRegUser,
    isVisible: (isLoggedIn) => !isLoggedIn,
  }, 
  {
    id: 3,
    name: "profile",
    path: "/profile",
    icons: CgProductHunt,
    isVisible: (isLoggedIn) => isLoggedIn,
  },
  {
    id: 5,
    name: "",
    path: "/cart",
    icons: GiShoppingBag,
    isVisible: () => true,
  },
  {
    id: 6,
    name: "",
    path: "/  ",
    icons: FiLogOut,
    isVisible: (isLoggedIn) => isLoggedIn,
  },
];

export const registrationValidationSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username is not less than 4 character")
    .required("User name is required"),
  email: yup
    .string()
    .email("Provide valid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 character long")
    .required("Password is required"),
  avatar: yup.mixed().required("avatar is required"),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 character long")
    .required("Password is required"),
});

export const icons = [
  {
    id: 1,
    name: FaFacebook,
  },
  {
    id: 2,
    name: FaTwitter,
  },
  {
    id: 3,
    name: FaInstagram,
  },
  {
    id: 4,
    name: FaLinkedin,
  },
];
