import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([
    {
      _id: 1,
      images: [
        {
          url: "something",
        },
      ],
      price: 200,
      quantity: 4,
    },
    {
      _id: 2,
      images: [
        {
          url: "something",
        },
      ],
      price: 200,
      quantity: 4,
    },
    {
      _id: 2,
      images: [
        {
          url: "something",
        },
      ],
      price: 200,
      quantity: 4,
    },
    {
      _id: 2,
      images: [
        {
          url: "something",
        },
      ],
      price: 200,
      quantity: 4,
    },
    {
      _id: 2,
      images: [
        {
          url: "something",
        },
      ],
      price: 200,
      quantity: 4,
    },
    {
      _id: 2,
      images: [
        {
          url: "something",
        },
      ],
      price: 200,
      quantity: 4,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      // const { data } = await AxiosInstance.get("/product/get-all-products");
      // console.log(data.data);
      // setProducts(data?.data);
      setIsLoading(false);
    } catch (error) {
      // console.log(error?.response?.data);
      toast.error("Error while fetching the data");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  if (isLoading) return <Loader />;
  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 p-10 items-center border-2 border-red-500  ">
      {products?.map((product) => (
        <NavLink
          to={`/product/${product._id}`}
          className="flex flex-col border-[1px] border-slate-600 rounded-md cursor-pointer  gap-2"
          key={product._id}
        >
          <div className=" h-52 flex items-center justify-center">
            <img
              src={product.images[0]?.url}
              height={200}
              width={200}
              alt="product"
              className="h-52 w-40 p-2 rounded-lg object-cover"
            />
          </div>
          <p className="text-slate-500 text-center text-lg">{product.title}</p>
          <div className="flex  text-sm text-orange-400 justify-between px-4 items-center">
            <p className=" ">
              <span>Rs: </span>
              {product.price}
            </p>
            <p>
              <span>Quantity: </span>
              {product.quantity}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Home;
