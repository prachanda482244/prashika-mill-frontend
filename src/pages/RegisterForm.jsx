import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../formik/FormikInput";
import { registrationValidationSchema } from "../constants/constants";
import { NavLink, useNavigate } from "react-router-dom";
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
      {({isSubmitting}) => (
        <Form autoComplete="off">
          <h1 className="text-center flex items-center justify-between sm:text-lg text-sm md:w-2/3 sm:mx-auto py-1 md:p-4 font-light border-2 w-full shadow-sm">
            Create your mel account! Register{" "}
            <span className="sm:text-base">
              Already a member?{" "}
              <NavLink to="/sign-in" className="text-blue-500">
                login here
              </NavLink>
            </span>
          </h1>

          <div className="flex flex-col md:flex-row flex-wrap justify-between md:w-2/3 mx-auto md:mt-5 md:p-4 rounded-md shadow-xl">
            <div className="flex flex-col md:w-1/2">
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

            <div className="flex flex-col md:w-1/2 w-full justify-between pb-2">
              <FormikFile
                name="avatar"
                label="Upload your image"
                required={true}
                setImagePreview={true} // Enable image preview
              />
              <button
              disabled={isSubmitting}
                type="submit"
                className="disabled:bg-red-400 bg-blue-400 px-2 mx-4 rounded-lg text-white font-semibold shadow-md py-2"
              >
                {isSubmitting?"Submitting": "Submit"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
