import axios from "axios";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";

const Cart = () => {
  const [cartData, setCartData] = useState({});
  const fetchData = async () => {
    try {
      const { data } = await AxiosInstance.get("/cart/");
      if (data?.statusCode !== 200) return;
      setCartData(data?.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl">Cart Details</h1>
      <div>
        <p>Total Amount : {cartData.totalAmount}</p>
        <div>
          Product:{" "}
          {cartData.products?.map((product) => (
            <div key={product._id}>
              Product name:{product.title} <br />
              Product Price: {product.price} <br />
              Quantity: {product.cartProductQuantity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
