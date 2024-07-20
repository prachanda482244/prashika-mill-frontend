import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "../formik/FormikInput";
import { loginValidationSchema } from "../constants/constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const formSubmit = async (values) => {
    console.log(values);
    try {
      const { data } = await AxiosInstance.post("/users/login", values);
      if (data.statusCode !== 200) return;
      const userData = data.data.userData;
      const token = data?.data?.token;
      const role = userData.role;
      console.log(userData);
      dispatch(loginUser({ userData, token, role }));
      toast.success(data?.message);
      if (userData?.role === "admin") {
        navigate("/dashboard");
      }
      navigate("/profile");
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error.response.data);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => {
        return (
          <div className="py-2 border  border-black mx-auto sm:w-1/2">
            <Form className="  p-2">
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="font-semibold text-3xl pl-2 capitalize border-b pb-2">
                    Sign In
                  </h1>
                </div>
                <div>
                  <FormikInput
                    type="email"
                    label="email"
                    required={true}
                    name="email"
                  />
                </div>
                <div>
                  <FormikInput
                    type="password"
                    label="password"
                    required={true}
                    name="password"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 justify-between px-4">
                <button
                  type="submit"
                  className="border-black hover:bg-slate-700  border duration-200 w-full py-1 bg-black text-white rounded-sm"
                >
                  {isSubmitting ? "loading" : "login"}
                </button>
                <Link
                  to="/sign-up"
                  className="border-black hover:bg-slate-300 border duration-200 w-full text-center py-1 bg-white text-black rounded-sm"
                >
                  Signup
                </Link>
              </div>
            </Form>
            <div className="flex justify-center mt-2">
              <Link
                to="/forgot-password"
                className="hover:text-blue-500 hover:underline"
              >
                Forgot password ?
              </Link>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
