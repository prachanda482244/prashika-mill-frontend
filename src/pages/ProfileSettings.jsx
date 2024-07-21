import { Form, Formik } from "formik";
import React from "react";
import { settingValidationSchema } from "../constants/constants";
import FormikInput from "../formik/FormikInput";

const ProfileSettings = () => {
  const initialValues = {
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const handleSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={settingValidationSchema}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="w-10/12 mx-auto">
            <h1 className="text-3xl py-2">Settings</h1>
            <div className="flex md:w-[70%] flex-col gap-2">
              <FormikInput
                type="text"
                name="username"
                label="Username"
                required={true}
              />
              <FormikInput
                type="password"
                name="oldPassword"
                label="Old Password"
                required={true}
              />

              <FormikInput
                type="password"
                name="newPassword"
                label="New Password"
                required={true}
              />

              <FormikInput
                type="password"
                name="confirmNewPassword"
                label="Confirm Password"
                required={true}
              />
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border-slate-950 hover:bg-slate-200 border  py-1 px-3"
                >
                  Update profile
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileSettings;
