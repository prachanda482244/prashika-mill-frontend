import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchCartData, removeFromCart, updateCart } from "../store/slices/cartSlice";

const Cart = () => {
  const { cartItems,message } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Create a local state to manage quantities
  const [localQuantities, setLocalQuantities] = useState({});

  useEffect(() => {
    const quantities = cartItems.products.reduce((acc, product) => {
      acc[product.product._id] = product.quantity;
      return acc;
    }, {});
    setLocalQuantities(quantities);

    dispatch(fetchCartData())
  }, []);


  const handleClearCart = () => {
    const result = confirm("Are you sure you want to clear the cart..?");
    if (!result) return;
    // dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrement = (productId) => {
    setLocalQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
    let quantity = localQuantities[productId]+1
    dispatch(updateCart( {productId,quantity}));
    toast.success(message)
  };

  const handleDecrement = (productId) => {
    if (localQuantities[productId] > 1) {
      setLocalQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));

      dispatch(updateCart({ productId, quantity: localQuantities[productId] - 1 }));
    toast.success(message)      
    }
  };

  const totalPrice = cartItems.products?.reduce((total, product) => {
    return total + product.product.price * localQuantities[product.product._id];
  }, 0);

  return (
    <div className="flex gap-5 pt-10 w-[70%] mx-auto p-3 flex-col">
      <h1 className="text-3xl font-semibold">Shopping Cart</h1>
      {cartItems?.products?.map((products) => (
        <div
          key={products.product._id}
          className="flex border-t-[1px] py-3 justify-between px-5"
        >
          <div>
            <div className="flex gap-2 w-72">
              <div className="bg-slate-100 p-1">
                <img
                  src={products.product.images[0]?.url}
                  alt="Cart item"
                  className="h-20 w-20 object-cover rounded-sm"
                />
              </div>
              <div className="flex py-2 flex-col justify-between text-sm font-light">
                <p className="font-semibold">{products.product.title}</p>
                <p>In stock</p>
              </div>
            </div>
          </div>
          <div className=" flex flex-col">
            <p className="text-gray-400 mr-3">Quantity:</p>
            <div className="flex items-center gap-2">
              <div className="flex gap-3 items-center p-1">
                <button
                  className=" px-3 py-[1px] rounded-lg text-slate-500 border-[1px]"
                  onClick={() => handleDecrement(products.product._id)}
                >
                  -
                </button>
                <div>
                  <span className=" text-gray-500 text-lg ">
                    {localQuantities[products.product._id]}
                  </span>
                </div>
                <button
                  className=" px-3 py-[1px] rounded-lg text-slate-500 border-[1px]"
                  onClick={() => handleIncrement(products.product._id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-gray-800 flex flex-col gap-2 w-32">
            <p className="text-gray-400"> Price:</p>
            <p className="text-sm">Rs:{products.product.price}</p>
          </div>
          <div className="flex flex-col justify-between  ">
            <p className="text-gray-400">Total Price</p>
            <p className="text-sm">
              Rs:{localQuantities[products.product._id] * products.product.price}
            </p>
            <button
              className="text-purple-700 mt-10 border-[1px] rounded-sm py-1 px-4 text-sm"
              onClick={() => handleRemove(products.product._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="bg-gray-100 flex flex-col gap-5 w-[60%] mx-auto p-10">
        <div className="flex justify-between border-b-[2px]">
          <p>Total</p>
          <p>{totalPrice}</p>
        </div>
        <div className="flex justify-between border-b-[2px]">
          <p>Total order</p>
          <p>{cartItems.products?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
