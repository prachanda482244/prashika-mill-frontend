import { AiFillBank } from "react-icons/ai";
import { CgProductHunt } from "react-icons/cg";
import {
  FaRegUser,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaUserFriends,
  FaBloggerB,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiShoppingBag } from "react-icons/gi";
import {
  MdOutlineInventory2,
  MdProductionQuantityLimits,
} from "react-icons/md";

import * as yup from "yup";
const message = "This field is required";

export const navlinks_1 = [
  {
    id: 1,
    name: "Shop",
    path: "/products",
  },
  {
    id: 2,
    name: "Our story",
    path: "/about",
  },
  {
    id: 3,
    name: "Blog",
    path: "/blog",
  },
  {
    id: 4,
    name: "Contact",
    path: "/contact",
  },
];
export const navlinks_2 = [
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
    isVisible: (isLoggedIn) => isLoggedIn,
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

export const productValidationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title should be more than 3 character")
    .required("Title is required"),
  price: yup.number().required("Price is required"),
  stock: yup.number().required("Stock is required"),
  description: yup
    .string()
    .min(10, "Description should be 10 character long")
    .required("description is required"),
  image: yup.mixed(),
  pricePerKg: yup.number().required("Price per kg is required"),
  stockInKg: yup.number(),
  kgPerUnit: yup.number()
});
export const blogValidationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title should be more than 3 character")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Description should be 10 character long")
    .required("description is required"),
  image: yup.mixed(),
});

export const orderValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name should be more than 3 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits long")
    .required("Phone number is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  notes: yup.string().optional(),
  cashondelivery: yup
    .string()
    .oneOf(["cashondelivery"], "Invalid payment option"),
});

export const settingValidationSchema = yup.object({
  username: yup.string().min(4, "Must be 4 character long").required(message),
  oldPassword: yup
    .string()
    .min(4, "Must be 4 character long")
    .required(message),
  newPassword: yup.string().required(message),
  confirmNewPassword: yup.string().required(message),
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

export const footerLinks = [
  {
    id: 1,
    name: "Rice",
    to: "/rice",
  },
  {
    id: 2,
    name: "Maize",
    to: "/maize",
  },
  {
    id: 3,
    name: "Terms and condition",
    to: "/terms-and-condition",
  },
  {
    id: 4,
    name: "Privacy policy",
    to: "/privacy-policy",
  },
  {
    id: 5,
    name: "Shipping and returns",
    to: "/shipping-and-returns",
  },
  {
    id: 6,
    name: "Our story",
    to: "/blog",
  },
  {
    id: 7,
    name: "Contact us",
    to: "/contact",
  },
];

export const dashSidebar = [
  {
    id: 1,
    name: "Products",
    icon: MdProductionQuantityLimits,
    link: "/dashboard/products",
  },
  {
    id: 2,
    name: "Customer",
    icon: FaUserFriends,
    link: "/dashboard/customers",
  },
  {
    id: 3,
    name: "Order",
    icon: AiFillBank,
    link: "/dashboard/orders",
  },
  {
    id: 4,
    name: "Blogs",
    icon: FaBloggerB,
    link: "/dashboard/blogs",
  },
  {
    id: 5,
    name: "Inventory",
    icon: MdOutlineInventory2,
    link: "/dashboard/inventory",
  },
];

export const options = [
  {
    id: 0,
    label: "Pending",
    value: "pending",
  },
  {
    id: 1,
    label: "Processing",
    value: "processing",
  },
  {
    id: 2,
    label: "Delivered",
    value: "delivered",
  },
  {
    id: 3,
    label: "Cancelled",
    value: "cancelled",
  },
];

export const statusStyles = {
  pending: {
    text: "Pending",
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-700",
  },
  processing: {
    text: "Processing",
    bgColor: "bg-blue-200",
    textColor: "text-blue-700",
  },
  delivered: {
    text: "Delivered",
    bgColor: "bg-green-200",
    textColor: "text-green-700",
  },
  cancelled: {
    text: "Cancelled",
    bgColor: "bg-red-200",
    textColor: "text-red-700",
  },
  unpaid: {
    text: "Unpaid",
    bgColor: "bg-purple-100",
    textColor: "text-purple-500",
  },
  paid: {
    text: "Paid",
    bgColor: "bg-green-100",
    textColor: "text-green-500",
  },
};
// constants/constants.js
export const contactValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});