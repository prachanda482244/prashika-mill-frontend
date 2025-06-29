import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../../formik/FormikInput";
import { blogValidationSchema, productValidationSchema } from "../../constants/constants";
import AxiosInstance from "../../config/AxiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import FormikTextarea from "../../formik/FormikTextArea";

const EditBlogAndProduct = ({ isProduct = false }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const blogUrl = `/blog/get-single-blog/${id}`;
  const productUrl = `/product/get-single-product/${id}`;

  const blogUpdateUrl = `/blog/update-blog/${id}`;
  const productUpdateUrl = `/dashboard/product/update-product-details/${id}`;

  const fetchSingleProduct = async () => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get(isProduct ? productUrl : blogUrl);
      if (data.statusCode === 200) {
        setProduct(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const productInitialValues = {
    title: product.title || "",
    price: product.price || "",
    quantity: product.quantity || "",
    description: product.description || ""
  };

  const blogInitialValues = {
    title: product.title || "",
    description: product.description || ""
  };

  const formSubmit = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.patch(
        isProduct ? productUpdateUrl : blogUpdateUrl,
        values
      );
      if (data.statusCode === 200) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Failed to update");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <Formik
            initialValues={isProduct ? productInitialValues : blogInitialValues}
            validationSchema={isProduct ? productValidationSchema : blogValidationSchema}
            onSubmit={formSubmit}
            enableReinitialize={true}
          >
            {() => (
              <Form autoComplete="off">
                <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                  {isProduct ? "Edit Product" : "Edit Blog"}
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Column - Form Fields */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <FormikInput
                      type="text"
                      label={isProduct ? "Product Title" : "Blog Title"}
                      required={true}
                      name="title"
                    />

                    <FormikTextarea
                      type="text"
                      label={isProduct ? "Product Description" : "Blog Description"}
                      rows={5}
                      required={true}
                      name="description"
                    />

                    {isProduct && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    )}
                  </div>

                  {/* Right Column - Image Preview */}
                  <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-xs h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center">
                      {product.title ? (
                        <img
                          className="w-full h-full object-cover"
                          src={
                            isProduct
                              ? product.images?.[0]?.url
                              : product.blogImage
                          }
                          alt={isProduct ? "Product" : "Blog"}
                        />
                      ) : (
                        <span className="text-gray-500">
                          {isProduct ? "Product" : "Blog"} Image Preview
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-gray-500 text-center">
                      Current {isProduct ? "product" : "blog"} image
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-8 py-3 rounded-lg text-white font-semibold shadow-md transition-colors duration-200 ${isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                      }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      `Update ${isProduct ? "Product" : "Blog"}`
                    )}
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

export default EditBlogAndProduct;