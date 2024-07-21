import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../formik/FormikInput";
import { registrationValidationSchema } from "../constants/constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../config/AxiosInstance";
import FormikFile from "../formik/FormikFile";

const RegisterForm = () => {
  const navigate = useNavigate();
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
      formData.append("avatar", values.avatar);

      const { data } = await AxiosInstance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.statusCode === 201) {
        toast.success("Registration successful");
        resetForm();
        navigate("/sign-in");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <div className="py-2 border  border-black mx-auto w-full md:w-1/2">
          <Form className="p-2">
            <div className="flex flex-col">
              <h1 className="font-semibold flex justify-between items-center text-3xl px-2 capitalize border-b pb-2">
                Sign Up
                <p className="text-sm flex gap-3 text-gray-500 ">
                  Already have an account ?{" "}
                  <Link
                    to="/sign-in"
                    className="underline text-blue-500 hover:text-blue-300"
                  >
                    Signin
                  </Link>
                </p>
              </h1>
              <div className="md:flex  ">
                <div className="w-full">
                  <FormikInput
                    type="text"
                    label="Username"
                    required={true}
                    name="username"
                  />
                  <FormikInput
                    type="email"
                    label="Email"
                    required={true}
                    name="email"
                  />
                  <FormikInput
                    type="password"
                    label="Password"
                    required={true}
                    name="password"
                  />
                </div>

                <div className=" md:w-1/2 w-full">
                  <FormikFile
                    name="avatar"
                    label="Upload your image"
                    required={true}
                    setImagePreview={true} // Enable image preview
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-between px-4">
              <button
                type="submit"
                className="border-black hover:bg-black hover:text-white border duration-200 w-full  py-1 bg-white text-black rounded-sm"
              >
                {isSubmitting ? "loading" : "Signup"}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
