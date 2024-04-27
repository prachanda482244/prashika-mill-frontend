import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "../formik/FormikInput";
import { registrationValidationSchema } from "../constants/constants";
import { NavLink } from "react-router-dom";
const RegisterForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    avatar: "",
  };

  const formSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form autoComplete="nope">
            <h1 className="text-center flex items-center justify-between text-2xl w-2/3 mx-auto p-4  font-light shadow-sm">
              Create your mel account ! Register{" "}
              <span className="text-base">
                Already member ?{" "}
                <NavLink to={"/sign-in"} className="text-blue-500">
                  login{" "}
                </NavLink>
                here
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
              </div>

              <div className="flex flex-col justify-between pb-2">
                <FormikInput
                  type="file"
                  label="avatar"
                  required={true}
                  name="avatar"
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
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
