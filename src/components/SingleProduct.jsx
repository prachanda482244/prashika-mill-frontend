import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const getSingleProduct = async () => {
    const { data } = await AxiosInstance.get(
      `/product/get-single-product/${id}`
    );
    if (data.statusCode !== 200) return;
    setSingleProduct(data?.data);
    console.log(data);
  };
  useEffect(() => {
    getSingleProduct();
  }, [id]);
  return (
    <div className="flex justify-between p-10 border-2">
      <div className="flex flex-col border-[1px] border-slate-600 rounded-md cursor-pointer  gap-2">
        <div className=" flex items-center justify-center">
          <img
            src={singleProduct && singleProduct?.images[0]?.url}
            height={200}
            width={200}
            alt="singleProduct"
            className="h-52 w-40 p-2 rounded-lg object-cover"
          />
        </div>
        <p className="text-slate-500 text-center text-lg">
          {singleProduct.title}
        </p>
        <div className="flex  text-sm text-orange-400 justify-between px-4 items-center">
          <p className=" ">
            <span>Rs: </span>
            {singleProduct.price}
          </p>
          <p>
            <span>Quantity: </span>
            {singleProduct.quantity}
          </p>
        </div>
      </div>
      <div>details</div>
    </div>
  );
};

export default SingleProduct;
