// store/orderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../config/AxiosInstance";

const initialState = {
  orders: [],
  status: "idle",
  userId: null,
  products: [],
  shippingDetails: {
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    paymentMethod: "cash_on_delivery",
  },
  message: "",
};

// Fetch user orders
export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const { data } = await AxiosInstance.get("/order", {
    withCredentials: true,
  });
  console.log(data);
  return data;
});

// Create a new order
export const createOrder = createAsyncThunk(
  "order/create-order",
  async ({
    products,
    name,
    email,
    phone,
    street,
    city,
    notes,
    paymentMethod,
  }) => {
    const { data } = await AxiosInstance.post(
      "/order/create-order",
      { products, name, email, phone, street, city, notes, paymentMethod },
      {
        withCredentials: true,
      }
    );
    return data;
  }
);

// Fetch order by ID
// export const fetchOrderById = createAsyncThunk(
//   "order/fetchOrderById",
//   async (orderId) => {
//     const { data } = await AxiosInstance.get(`/orders/${orderId}`, {
//       withCredentials: true,
//     });
//     return data.data;
//   }
// );

// Update an existing order
// export const updateOrder = createAsyncThunk(
//   "order/updateOrder",
//   async ({ orderId, updateDetails }) => {
//     const { data } = await AxiosInstance.put(
//       `/orders/${orderId}`,
//       updateDetails,
//       { withCredentials: true }
//     );
//     return data.data;
//   }
// );

// Delete an order
// export const deleteOrder = createAsyncThunk(
//   "order/deleteOrder",
//   async (orderId) => {
//     const { data } = await AxiosInstance.delete(`/orders/${orderId}`, {
//       withCredentials: true,
//     });
//     return data.message;
//   }
// );

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const { userId, products } = action.payload;
      state.userId = userId;
      state.products = products;
    },
    addShippingDetails: (state, action) => {
      state.shippingDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
        state.message = "Orders fetched successfully";
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create order
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Fetch order by ID
    // .addCase(fetchOrderById.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(fetchOrderById.fulfilled, (state, action) => {
    //   state.status = "idle";
    //   state.currentOrder = action.payload;
    //   state.message = "Order fetched successfully";
    // })
    // .addCase(fetchOrderById.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // })

    // Update order
    // .addCase(updateOrder.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(updateOrder.fulfilled, (state, action) => {
    //   state.status = "idle";
    //   const index = state.orders.findIndex(
    //     (order) => order._id === action.payload._id
    //   );
    //   if (index >= 0) {
    //     state.orders[index] = action.payload;
    //   }
    //   state.message = "Order updated successfully";
    // })
    // .addCase(updateOrder.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // })

    // Delete order
    // .addCase(deleteOrder.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(deleteOrder.fulfilled, (state, action) => {
    //   state.status = "idle";
    //   state.orders = state.orders.filter(
    //     (order) => order._id !== action.meta.arg
    //   );
    //   state.message = "Order deleted successfully";
    // })
    // .addCase(deleteOrder.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // });
  },
});
export const { addProducts, addShippingDetails } = orderSlice.actions;
export default orderSlice.reducer;
