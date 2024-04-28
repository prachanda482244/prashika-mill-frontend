import { useState } from "react";
import { Field } from "formik";

const FormikFile = ({ name, label, required, type, ...props }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // Set the file in Formik state
    props.form.setFieldValue(name, selectedFile);
  };

  return (
    <div>
      <Field name={name}>
        {({ field, meta }) => (
          <div>
            <div className="flex relative flex-col p-4">
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
                onChange={handleChange} // Call handleChange when file input changes
                autoComplete="off"
              />
              <div className="h-2">
                {meta.touched && meta.error && (
                  <div className="text-red-500 text-sm italic">
                    {meta.error}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Field>
    </div>
  );
};

export default FormikFile;
