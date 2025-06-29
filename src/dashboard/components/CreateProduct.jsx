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
    stock: 0,
    image: null,
    description: "",
    pricePerKg: 0,
    stockInKg: 0,
    kgPerUnit: 50
  };

  const formSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", parseInt(values.price));
    formData.append("stock", parseInt(values.stock));
    formData.append("pricePerKg", parseInt(values.pricePerKg));
    formData.append("stockInKg", parseInt(values.stockInKg));
    formData.append("kgPerUnit", parseInt(values.kgPerUnit));
    formData.append("image", values.image);

    try {
      const { data } = await AxiosInstance.post(
        "/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.statusCode === 201) {
        resetForm();
        setImagePreview(null);
        toast.success(data?.message);
      }
    } catch (error) {
      toast.error("Failed to create product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <Formik
        initialValues={initialValues}
        validationSchema={productValidationSchema}
        onSubmit={formSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className="space-y-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Create New Product</h1>
              <p className="text-sm sm:text-base text-gray-500 mt-1">Fill in the details below to add a new product</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <FormikInput
                  type="text"
                  label="Product Title"
                  required={true}
                  name="title"
                  placeholder="Enter product name"
                />

                <FormikTextarea
                  label="Product Description"
                  required={true}
                  name="description"
                  rows={4}
                  placeholder="Describe the product features"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormikInput
                    type="number"
                    label="Price (Rs)"
                    required={true}
                    name="price"
                    placeholder="0.00"
                  />

                  <FormikInput
                    type="number"
                    label="Stock"
                    required={true}
                    name="stock"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormikInput
                    type="number"
                    label="Price per kg (Rs)"
                    required={true}
                    name="pricePerKg"
                    placeholder="0.00"
                  />

                  <FormikInput
                    type="number"
                    label="Stock In Kg"
                    name="stockInKg"
                    placeholder="0"
                  />
                  <FormikInput
                    type="number"
                    label="Kg per unit"
                    name="kgPerUnit"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="flex flex-col">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-full min-h-[200px] sm:min-h-[250px]">
                  <FormikFile
                    name="image"
                    label="Product Image"
                    setImagePreview={setImagePreview}
                  />
                  {imagePreview && (
                    <div className="mt-4 w-full flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-40 rounded-md object-contain"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Recommended size: 800x800px, JPG/PNG format
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center sm:justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-md text-white font-medium ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors shadow-sm`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : "Create Product"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;