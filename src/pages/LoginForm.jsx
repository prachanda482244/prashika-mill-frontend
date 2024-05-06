import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "../formik/FormikInput";
import { loginValidationSchema } from "../constants/constants";
import { NavLink, useNavigate } from "react-router-dom";
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
          <Form autoComplete="nope">
            <h1 className="text-center flex items-center justify-between text-2xl w-1/2 mx-auto p-4  font-light shadow-sm">
              Welcome to Prashika-Mel ! Login{" "}
              <span className="text-base">
                New member ?{" "}
                <NavLink to={"/sign-up"} className="text-blue-500">
                  register{" "}
                </NavLink>
                here
              </span>
            </h1>
            <div className="flex flex-col flex-wrap justify-between w-1/2 mx-auto mt-5 p-4 rounded-md shadow-xl">
              <FormikInput
                type="email"
                label="email"
                required={true}
                name="email"
              />
              <FormikInput
                type="password"
                label="password"
                required={true}
                name="password"
              />

              <button
                type="submit"
                className="bg-blue-400 px-2 rounded-lg text-white font-semibold shadow-md py-2"
              >
                {isSubmitting ? "loading" : "login"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
