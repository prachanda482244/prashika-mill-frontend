import { useField } from "formik";

const FormikFile = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file);
  };

  return (
    <div className="flex gap-2 flex-col p-4">
      <label
        className="capitalize underline underline-offset-2 font-light flex gap-2 text-gray-500"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className="border-[1px] antialiased cursor-pointer rounded-sm px-4 py-1"
        type="file"
        name={name}
        id={props.id || props.name}
        onChange={handleChange}
        onBlur={field.onBlur}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikFile;
