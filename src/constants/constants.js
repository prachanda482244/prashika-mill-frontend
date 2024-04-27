import { FaCartPlus, FaRegUser, FaHouseUser } from "react-icons/fa";
import * as yup from "yup";
export const navlinks = [
  {
    id: 1,
    name: "register",
    path: "/sign-up",
    icons: FaHouseUser,
  },
  {
    id: 2,
    name: "login",
    path: "/sign-in",
    icons: FaRegUser,
  },
  {
    id: 3,
    name: "cart",
    path: "/cart",
    icons: FaCartPlus,
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
  avatar: yup.string().required("avatar is required"),
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
