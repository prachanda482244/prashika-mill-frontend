import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartData } from "../store/slices/cartSlice";
const Home = () => {
  const message = useSelector((state) => state.cart.message);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([
    // {
    //   _id: 1,
    //   title: "product1",
    //   price: 200,
    //   quantity: 2,
    //   images: [
    //     {
    //       url: "",
    //     },
    //   ],
    // },
    // {
    //   _id: 1,
    //   title: "product1",
    //   price: 200,
    //   quantity: 2,
    //   images: [
    //     {
    //       url: "",
    //     },
    //   ],
    // },
    // {
    //   _id: 2,
    //   title: "product1",
    //   price: 200,
    //   quantity: 2,
    //   images: [
    //     {
    //       url: "",
    //     },
    //   ],
    // },
    // {
    //   _id: 3,
    //   title: "product1",
    //   price: 200,
    //   quantity: 2,
    //   images: [
    //     {
    //       url: "",
    //     },
    //   ],
    // },
  ]);
  console.log(message)
  const [isLoading, setIsLoading] = useState(false);
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosInstance.get("/product/get-all-products");
      setProducts(data?.data);
      setIsLoading(false);
    } catch (error) {
      // console.log(error?.response?.data);
      toast.error("Issued occured !!! Products not found");
    }
  };

  const handleAddToCart = (product) => {
    console.log(product)
    dispatch(addToCart(product._id));
    toast.success(message);
  };
console.log(products)
  useEffect(() => {
    // getAllProducts();
    if (isLoggedIn) {
      dispatch(fetchCartData());
    }
  }, [isLoggedIn, dispatch]);
  // if (isLoading) return <Loader />;

  return (
    <div></div>
    // <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 p-2 sm:p-10 items-center border-2  ">
    //   {products?.map((product) => (
    //     <div
    //       key={product._id}
    //       className="flex flex-col border-[1px] border-slate-600 rounded-md cursor-pointer  gap-2"
    //     >
    //       <NavLink to={`/product/${product._id}`}>
    //         <div className=" h-52 flex items-center justify-center">
    //           <img
    //             src={product.images[0]?.url}
    //             height={200}
    //             width={200}
    //             alt="product"
    //             className="h-52 w-40 p-2 rounded-lg object-cover"
    //           />
    //         </div>
    //       </NavLink>

    //       <p className="text-slate-500 text-center text-lg">{product.title}</p>
    //       <div className="flex  text-sm text-orange-400 justify-between px-4 items-center">
    //         <p className=" ">
    //           <span>Rs: </span>
    //           {product.price}
    //         </p>
    //         <p>
    //           <span>Quantity: </span>
    //           {product.quantity}
    //         </p>
    //       </div>
    //       <div className="flex items-center justify-between p-5">
    //         <button className="border-[1px] border-blue-500 font-semibold text-slate-500 py-2 px-6 rounded-md">
    //           order now
    //         </button>
    //         <button
    //           className="bg-blue-500 text-slate-200 px-6 py-2 rounded-md"
    //           onClick={() => handleAddToCart(product)}
    //         >
    //           add to cart
    //         </button>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Home;
