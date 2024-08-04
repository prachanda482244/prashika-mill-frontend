import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartData } from "../store/slices/cartSlice";
const MostPopular = ({ title, sliceStartIndex, sliceEndIndex }) => {
  const message = useSelector((state) => state.cart.message);
  const { isLoggedIn } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosInstance.get("/product/get-all-products");
      setProducts(data?.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Issued occured !!! Products not found");
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product._id));
    toast.success("Product added to cart");
  };
  useEffect(() => {
    getAllProducts();
    if (isLoggedIn) {
      dispatch(fetchCartData());
    }
  }, [isLoggedIn, dispatch]);
  if (isLoading) return <Loader />;
  return (
    <div className="flex justify-center py-10 items-center bg-[#d7d7cb] flex-col ">
      <h1 className="text-4xl uppercase tracking-widest font-light  py-10">
        {title}
      </h1>
      <div className="grid  sm:grid-cols-3 w-full px-40 gap-7 ">
        {products.slice(sliceStartIndex, sliceEndIndex)?.map((product) => (
          <div className="mt-10" key={product._id}>
            <NavLink
              className="flex flex-col gap-5 "
              to={`/product/${product._id}`}
            >
              <div className="bg-white rounded-sm flex items-center justify-center px-20 py-40">
                <img
                  src={product.images[0]?.url}
                  height={200}
                  width={200}
                  alt="product"
                  className="h-52 w-40 object-cover"
                />
              </div>

              <div className="flex font-normal capitalize flex-col gap-2">
                <p className="tracking-wider">{product.title}</p>
                <span>Rs:{product.price}.00</span>
                <Button
                  onClick={() => handleAddToCart(product)}
                  name="Add to Cart"
                  bg="red"
                />
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopular;
