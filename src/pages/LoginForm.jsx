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
      const userData = data.data;
      const role = userData.role;
      dispatch(loginUser({ userData, role }));
      toast.success(data?.message);
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error.request.response);
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
                  <h1 className="font-semibold flex justify-between items-center text-3xl px-2 capitalize border-b pb-2">
                    Sign In
                    <p className="text-sm flex gap-3 text-gray-500 ">
                      Dont have an account ?{" "}
                      <Link
                        to="/sign-up"
                        className="underline text-blue-500 hover:text-blue-300"
                      >
                        Signup
                      </Link>
                    </p>
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
                  className="border-black hover:bg-white hover:text-black  border duration-200 w-full py-1 bg-black text-white rounded-sm"
                >
                  {isSubmitting ? "loading" : "Sign in"}
                </button>
              </div>
            </Form>
            <div className="flex border-t pt-2 justify-center mt-2">
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
