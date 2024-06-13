import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../../formik/FormikInput";
import FormikFile from "../../formik/FormikFile";
import { productValidationSchema } from "../../constants/constants";
import AxiosInstance from "../../config/AxiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditProduct = () => {
      const [product,setProduct] = useState({})
const {productId} = useParams()
      const fetchSingleProduct = async()=>{
           try {
             const {data} = await AxiosInstance.get(`/product/get-single-product/${productId}`)
             if(data.statusCode===200){
                   setProduct(data.data)
             }
           } catch (error) {
            console.log(error)
           }
      }

      useEffect(()=>{
            fetchSingleProduct()
      },[])
      console.log(product)
  const initialValues = {
      title:product.title,
      price:product.price,
      quantity:product.quantity,
      description:product.description
}

  const formSubmit = async (values, { resetForm }) => {
      console.log(values)
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", parseInt(values.price));
      formData.append("quantity", parseInt(values.quantity));

      console.log(formData,"formdata");
      const {data} = await AxiosInstance.patch(`/dashboard/product/update-product-details/${productId}`,formData,{
            headers: {
                  "Content-Type": "multipart/form-data",
                },
      })
            if(data.statusCode==200){
                  toast.success(data.message)
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
            <h1 className="text-center tracking-wider font-medium  text-2xl">Edit Product</h1>
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
              {/* <FormikFile
                name="image"
                label="Upload Product"
                /> */}
                <div className="flex items-center justify-center h-60 border rounded-full overflow-hidden w-60 mx-auto">
                  <img className="h-60 w-60 object-cover" src={
                         product.title? 
                        product.images[0]?.url:'' } alt="Product" />
                </div>
      </div>
      </div>

<div className=" flex items-center">

              <button
                type="submit"
                className="bg-blue-500 tracking-wide w10/12 mx-auto rounded-lg text-white hover:bg-blue-700 font-semibold px-10 shadow-md py-3"
              >
                Edit product
              </button>
</div>

        </Form>
      )}
    </Formik>
  );
};

export default EditProduct;
