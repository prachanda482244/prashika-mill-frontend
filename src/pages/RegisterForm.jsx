import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../formik/FormikInput";
import { registrationValidationSchema } from "../constants/constants";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../config/AxiosInstance";
import FormikFile from "../formik/FormikFile";

const RegisterForm = () => {
  const [file, setFile] = useState();
  console.log(file.name);
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

      console.log(formData);

      const { data } = await AxiosInstance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", data?.data);
      if (data?.data.statusCode !== 201) return;
      toast.success("Registration successful");
      Navigate("/sign-in");
    } catch (error) {
      toast.error(error.response.data);
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
      {() => (
        <Form autoComplete="nope">
          <h1 className="text-center flex items-center justify-between text-2xl w-2/3 mx-auto p-4 font-light shadow-sm">
            Create your mel account! Register{" "}
            <span className="text-base">
              Already a member?{" "}
              <NavLink to={"/sign-in"} className="text-blue-500">
                login here
              </NavLink>
            </span>
          </h1>

          <div className="flex flex-wrap justify-between w-2/3 mx-auto mt-5 p-4 rounded-md shadow-xl">
            <div className="flex flex-col w-1/2">
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

            <div className="flex flex-col justify-between pb-2">
              <FormikFile
                name="avatar"
                label="Upload your image"
                required={true}
              />
              <button
                type="submit"
                className="bg-blue-400 px-2 rounded-lg text-white font-semibold shadow-md py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
