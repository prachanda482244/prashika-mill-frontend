import React from "react";
import { Form, Formik } from "formik";
import FormikInput from "../formik/FormikInput";
import { registrationValidationSchema } from "../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../config/AxiosInstance";
import FormikFile from "../formik/FormikFile";
import { loginUser } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const initialValues = {
    username: "",
    email: "",
    password: "",
    avatar: null,
  };

  const formSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.avatar) formData.append("avatar", values.avatar);

      const { data } = await AxiosInstance.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(loginUser({ userData: data.data, role: data.data.role }));
      if (data?.statusCode === 201) {
        toast.success("Registration successful");
        resetForm();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <Formik
          initialValues={initialValues}
          validationSchema={registrationValidationSchema}
          onSubmit={formSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-6">
              <div className="flex justify-between items-center pb-4 mb-6 border-b">
                <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                <p className="text-sm text-gray-600">
                  Have an account?{" "}
                  <Link to="/sign-in" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="space-y-4">
                <FormikInput
                  type="text"
                  name="username"
                  label="Username"
                  required
                  placeholder="Enter your username"
                />
                <FormikInput
                  type="email"
                  name="email"
                  label="Email"
                  required
                  placeholder="your@email.com"
                />
                <FormikInput
                  type="password"
                  name="password"
                  label="Password"
                  required
                  placeholder="••••••••"
                />
                <FormikFile
                  name="avatar"
                  label="Profile Picture"
                  accept="image/*"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 py-2 px-4 rounded-md font-medium transition-colors
                  ${isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"}`}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;