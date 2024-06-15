import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import FormikInput from "../../formik/FormikInput";
import { blogValidationSchema, productValidationSchema } from "../../constants/constants";
import AxiosInstance from "../../config/AxiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import FormikTextarea from "../../formik/FormikTextArea";

const EditBlogAndProduct = ({isProduct=false}) => {
      const {id} = useParams()
      const [product,setProduct] = useState({})
      const blogUrl = `/blog/get-single-blog/${id}`
      const productUrl = `/product/get-single-product/${id}`

      const blogUpdateUrl = `/blog/update-blog/${id}`
      const productUpdateUrl = `/dashboard/product/update-product-details/${id}`
      const fetchSingleProduct = async()=>{
           try {
             const {data} = await AxiosInstance.get(isProduct?productUrl:blogUrl)
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
    const productInitialValues = {
      title:product.title,
      price:product.price,

      quantity:product.quantity,
      description:product.description
}
const blogInitialValues={
      title:product.title,
      description:product.description
}

  const formSubmit = async (values) => {
      console.log(values)
      const {data} = await AxiosInstance.patch(isProduct?productUpdateUrl:blogUpdateUrl,values)
            if(data.statusCode==200){
               toast.success(data.message)
            }
  };

  return (
    <Formik
      initialValues={isProduct?productInitialValues:blogInitialValues}
      validationSchema={isProduct? productValidationSchema:blogValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {() => (
        <Form autoComplete="nope">
            <h1 className="text-center tracking-wider font-medium  text-2xl">
                  {isProduct? "Edit Product": "Edit Blog"} 
                  </h1>
            <div className="flex justify-between px-10   gap-2">
<div className="flex flex-col w-full">

            <FormikInput
                type="text"
                label= {isProduct? "Product Title":"Blog Title"}
                required={true}
                name="title"
              />
             
             <FormikTextarea
                type="text"
                label= {isProduct? "Product Description":"Blog Description"}
                rows={5}
                required={true}
                name="description"
              />

{
      isProduct && (
            <>
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
       </>

      )
}
          

</div>


      <div>
              {/* <FormikFile
                name="image"
                label="Upload Product"
                /> */}
                <div className="flex items-center justify-center h-60 border rounded-full overflow-hidden w-60 mx-auto">
                  <img className="h-60 w-60 object-cover" src={
                        isProduct && product.title ?product.images[0]?.url:product.blogImage } alt="Product" />
                </div>
      </div>
      </div>

<div className=" flex items-center">

              <button
                type="submit"
                className="bg-blue-500 tracking-wide w10/12 mx-auto rounded-lg text-white hover:bg-blue-700 font-semibold px-10 shadow-md py-3"
              >
                Edit {isProduct?"Product": "blog"}
              </button>
</div>

        </Form>
      )}
    </Formik>
  );
};

export default EditBlogAndProduct;
