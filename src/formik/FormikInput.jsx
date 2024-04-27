import { Field } from "formik";
import React from "react";

const FormikInput = ({ name, label, required, type, ...props }) => {
  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
          return (
            <div>
              <div className="flex flex-col p-4 ">
                <label
                  className="capitalize font-light flex gap-2 text-gray-500"
                  htmlFor={name}
                >
                  {label}
                  <span className="text-red-900 text-xl">
                    {required ? "*" : ""}
                  </span>
                </label>
                <input
                  className="border-[1px] rounded-sm px-4 py-1"
                  type={type}
                  {...field}
                  {...props}
                  id={name}
                  value={meta.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
                <div className="h-2">
                  {meta.touched && meta.error ? (
                    <div className="text-red-500  text-sm italic">
                      {meta.error}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default FormikInput;
