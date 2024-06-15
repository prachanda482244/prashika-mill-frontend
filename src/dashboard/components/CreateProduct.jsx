import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../../formik/FormikInput";
import FormikFile from "../../formik/FormikFile";
import { productValidationSchema } from "../../constants/constants";
import AxiosInstance from "../../config/AxiosInstance";
import FormikTextarea from "../../formik/FormikTextArea";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    title: "",
    price: 0,
    quantity: 0,
    image: null,
    description: ""
  };

  const formSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", parseInt(values.price));
    formData.append("quantity", parseInt(values.quantity));
    formData.append("image", values.image);

    const { data } = await AxiosInstance.post("/dashboard/product/create-new-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data)
    if (data.statusCode === 201) {
      resetForm();
      setImagePreview(null);
      toast.success(data?.message)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <h1 className="text-center tracking-wider font-medium text-2xl mb-6">Create new Product</h1>
          <div className="flex justify-between px-10 gap-2">
            <div className="flex flex-col w-full">
              <FormikInput
                type="text"
                label="Product Title"
                required={true}
                name="title"
              />
              <FormikTextarea
                label="Product Description"
                required={true}
                name="description"
                rows={3} 
              />
              <FormikInput
                type="number"
                label="Product Price"
                required={true}
                name="price"
              />
              <FormikInput
                type="number"
                label="Product Quantity"
                required={true}
                name="quantity"
              />
            </div>

            <div className="flex flex-col items-center">
              <FormikFile
                name="image"
                label="Upload Product Image"
                setImagePreview={setImagePreview}
              />
              
            </div>
          </div>

          <div className="flex items-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 tracking-wide w-10/12 mx-auto rounded-lg text-white hover:bg-blue-700 font-semibold px-10 shadow-md py-3"
            >
               {isSubmitting?"Creating product": "Create product"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
