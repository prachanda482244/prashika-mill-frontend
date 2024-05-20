import axios from "axios";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCartData } from "../store/slices/cartSlice";

const Cart = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const [cartData, setCartData] = useState({});
  const { status, cartItems } = useSelector((state) => state.cart);
  console.log(status, cartItems);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    const result = confirm("Are you sure you want to clear the cart..?");
    if (!result) return;
    // dispatch(clearCart());
    toast.success("Cart cleared");
  };
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  return (
    <div>
      <h1 className="text-center text-2xl">Cart Details</h1>
      <div>
        <p>Total Product : {cartItems.data.products.length}</p>
        <div>
          <p>Total quantity: {cartItems.data.cartQuantity}</p>
          <p>Total amount: {cartItems.data.totalAmount}</p>
        </div>
      </div>
      <button onClick={handleClearCart}>Clear cart</button>
    </div>
  );
};

export default Cart;
