import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "../formik/FormikInput";
import { orderValidationSchema } from "../constants/constants";
import FormikTextarea from "../formik/FormikTextArea";
import { useDispatch, useSelector } from "react-redux";
import { addShippingDetails, createOrder } from "../store/slices/orderSlice";

const Order = () => {
  const { userData } = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  console.log(order);
  const initialValues = {
    name: userData.username,
    email: userData.email,
    phone: "",
    street: "",
    city: "",
    paymentMethod: "cash_on_delivery",
  };

  const handleSubmit = async (values) => {
    const { name, email, phone, street, city, notes, paymentMethod } = values;
    const products = order.products;
    dispatch(addShippingDetails(values));
    dispatch(
      createOrder({
        products,
        name,
        email,
        phone,
        street,
        city,
        notes,
        paymentMethod,
      })
    );
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
          <FormikInput label="name" type="text" name="name" required={true} />

          <FormikInput
            label="email"
            type="email"
            name="email"
            required={true}
          />

          <FormikInput label="phone" type="text" name="phone" required={true} />

          <FormikInput
            label="street"
            type="text"
            name="street"
            required={true}
          />
          <FormikInput label="city" type="text" name="city" required={true} />
          <FormikTextarea
            label="Notes"
            name="notes"
            required={false}
            rows={3}
          />
          <label htmlFor="cashondelivery">Payment Option</label>

          <select name="cashondelivery" id="cashondelivery">
            <option value="cashondelivery">Cash On Delivery</option>
          </select>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Order;
