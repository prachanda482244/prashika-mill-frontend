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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">Account Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your profile and security settings</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={settingValidationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="divide-y divide-gray-200">
                <div className="px-6 py-5 space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                    <p className="mt-1 text-sm text-gray-500">Update your username and password settings.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <FormikInput
                        type="text"
                        name="username"
                        label="Username"
                        required={true}
                        containerClass="mt-1"
                        inputClass="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        labelClass="block text-sm font-medium text-gray-700"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <FormikInput
                        type="password"
                        name="oldPassword"
                        label="Current Password"
                        required={true}
                        containerClass="mt-1"
                        inputClass="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        labelClass="block text-sm font-medium text-gray-700"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <FormikInput
                        type="password"
                        name="newPassword"
                        label="New Password"
                        required={true}
                        containerClass="mt-1"
                        inputClass="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        labelClass="block text-sm font-medium text-gray-700"
                      />
                    </div>

                    <div className="sm:col-span-6">
                      <FormikInput
                        type="password"
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        required={true}
                        containerClass="mt-1"
                        inputClass="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        labelClass="block text-sm font-medium text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                    className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm ${isSubmitting || !isValid || !dirty
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : 'Update Profile'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;