import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import FormikInput from "../formik/FormikInput";
import { orderValidationSchema } from "../constants/constants";
import FormikTextarea from "../formik/FormikTextArea";
import { useDispatch, useSelector } from "react-redux";

import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { userData } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: userData.username,
    email: userData.email,
    phone: "",
    street: "",
    city: "",
    paymentMethod: "cash_on_delivery",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { name, email, phone, street, city, notes, paymentMethod } = values;
    const products = cartItems.products;
    const orders = {
      name,
      email,
      phone,
      street,
      city,
      notes,
      paymentMethod,
      products: [...products],
    };

    try {
      const { data } = await AxiosInstance.post("/order/create-order", orders);
      if (data.statusCode !== 201) return;
      toast.success(data?.message);
      resetForm();
      const { data: cart } = await AxiosInstance.delete("/cart/clear-cart");
      if (cart.statusCode === 200) {
        navigate("/cart");
      }
    } catch (error) {
      toast.error("Failed to place your order");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={orderValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({}) => (
        <Form>
          <div className="flex items-center gap-2 justify-between py-2 px-4">
            <div className="w-full text-gray-400 ">
              <FormikInput
                label="name"
                type="text"
                name="name"
                required={true}
              />
            </div>
            <div className="w-full text-gray-400 ">
              <FormikInput
                label="email"
                type="email"
                name="email"
                required={true}
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2 px-4">
            <div className="w-full text-gray-400 ">
              <FormikInput
                label="phone"
                type="text"
                name="phone"
                required={true}
              />
            </div>
            <div className="w-full text-gray-400 ">
              <FormikInput
                label="street"
                type="text"
                name="street"
                required={true}
              />
            </div>
            <div className="w-full text-gray-400 ">
              <FormikInput
                label="city"
                type="text"
                name="city"
                required={true}
              />
            </div>
          </div>
          <div className="flex items-center px-4 py-2">
            <div className="w-10/12">
              <FormikTextarea
                label="Notes"
                name="notes"
                required={false}
                rows={3}
              />
            </div>

            <div className="flex flex-col  items-center gap-2">
              <label
                htmlFor="cashondelivery"
                className="font-bold  w-full text-gray-500 capitalize tracking-wider"
              >
                Payment method
              </label>

              <select
                name="cashondelivery"
                className=" py-3 px-4 cursor-pointer bg-black text-gray-400"
                id="cashondelivery"
              >
                <option value="cashondelivery" className="text-xl bg-white">
                  Cash On Delivery
                </option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <button
              type="submit"
              className="bg-slate-950 py-2 px-10 w-1/3 rounded shadow text-white hover:bg-slate-500 duration-200"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Order;
