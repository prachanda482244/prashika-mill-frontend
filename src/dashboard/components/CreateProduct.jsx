import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../../formik/FormikInput";
import FormikFile from "../../formik/FormikFile";
import { productValidationSchema } from "../../constants/constants";
import AxiosInstance from "../../config/AxiosInstance";

const CreateProduct = () => {
  const initialValues = {
      title:"",
      price:0,
      quantity:0,
      image:null,
      description:''
}

  const formSubmit = async (values, { resetForm }) => {
      console.log(values)
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", parseInt(values.price));
      formData.append("quantity", parseInt(values.quantity));
      formData.append("image", values.image);

      console.log(formData);
      const {data} = await AxiosInstance.post("/dashboard/product/create-new-product",formData,{
            headers: {
                  "Content-Type": "multipart/form-data",
                },
      })
            if(data.status===200){
                  resetForm()
            }
            console.log(data)
  console.log(values)
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {() => (
        <Form autoComplete="nope">
            <h1 className="text-center tracking-wider font-medium  text-2xl">Create new Product</h1>
            <div className="flex justify-between px-10   gap-2">
<div className="flex flex-col w-full">

            <FormikInput
                type="text"
                label="Product Title"
                required={true}
                name="title"
              />
             
             <FormikInput
                type="text"
                label="Product Description"
                required={true}
                name="description"
              />

             <FormikInput
                type="number"
                label="Product Price"
                required={true}
                name="price"
              />
             
             <FormikInput
                type="number"
                label="Product quantity"
                required={true}
                name="quantity"
              />
</div>


      <div>
              <FormikFile
                name="image"
                label="Upload Product"
                required={true}
                />
                <div className="flex items-center justify-center h-60 border rounded-full w-60 mx-auto">
                  Image preview
                </div>
      </div>
      </div>

<div className=" flex items-center">

              <button
                type="submit"
                className="bg-blue-500 tracking-wide w10/12 mx-auto rounded-lg text-white hover:bg-blue-700 font-semibold px-10 shadow-md py-3"
              >
                Create product
              </button>
</div>

        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
