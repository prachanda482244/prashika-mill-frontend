import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCartData } from "../store/slices/cartSlice";

const Cart = () => {
  const { status, cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  const handleClearCart = () => {
    const result = confirm("Are you sure you want to clear the cart..?");
    if (!result) return;
    // dispatch(clearCart());
    toast.success("Cart cleared");
  };
  const handleRemove = () => {
    alert("handle");
  };
  return (
    <div className="flex gap-5 pt-10 w-[70%] mx-auto p-3 flex-col">
      <h1 className="text-3xl font-semibold">Shopping Cart</h1>
      {cartItems?.products.map((product) => (
        <div
          key={product._id}
          className="flex border-t-[1px] py-3 justify-between px-5"
        >
          <div>
            <div className="flex gap-2 w-72">
              <div className="bg-slate-100 p-1">
                <img
                  src={product.images[0].url}
                  alt="Cart item"
                  className="h-20 w-20 object-cover rounded-sm"
                />
              </div>
              <div className="flex py-2 flex-col justify-between text-sm font-light">
                <p className="font-semibold">{product.title}</p>
                <p>instock</p>
              </div>
            </div>
          </div>
          <div className=" flex  flex-col gap-2">
            <p>Quantity:</p>
            <select className="border-[1px] w-16 outline-none text-gray-500 cursor-pointer ">
              <option value="0">{product.cartProductQuantity}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="text-gray-800 flex flex-col justify-between w-32">
            <p>Rs:{product.price}</p>
            <button
              className="text-purple-700 border-[1px] rounded-sm py-2 px-4 text-sm"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="bg-gray-100 flex flex-col gap-5 w-[60%] mx-auto p-10">
        <div className="flex justify-between border-b-[2px]">
          <p>Total</p>
          <p>1100</p>
        </div>
        <div className="flex justify-between border-b-[2px]">
          <p>Total order</p>
          <p>5</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
