import { useField } from "formik";
import React, { useState } from "react";

const FormikFile = ({ name, label, setImagePreview = true, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file);
    if (file && setImagePreview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 sm:p-5 bg-gray-50 rounded-lg">
      <label
        className="text-sm sm:text-base font-medium text-gray-700 capitalize"
        htmlFor={props.id || props.name}
      >
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <input
            className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer"
            type="file"
            name={name}
            id={props.id || props.name}
            onChange={handleChange}
            onBlur={field.onBlur}
            {...props}
          />
        </div>

        {preview && (
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            <img
              src={preview}
              alt="Preview"
              className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md border-2 border-gray-200 shadow-sm"
            />
          </div>
        )}
      </div>

      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs sm:text-sm mt-1">{meta.error}</div>
      ) : null}

      {!meta.error && (
        <p className="text-xs text-gray-500 mt-1">
          Supported formats: JPG, PNG. Max size: 5MB
        </p>
      )}
    </div>
  );
};

export default FormikFile;