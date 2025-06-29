import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../config/AxiosInstance";

const initialState = {
  error: null,
  cartItems: [],
  status: "idle",
  message: null,
};
export const fetchCartData = createAsyncThunk("cart/item", async () => {
  const { data } = await AxiosInstance.get("/cart", { withCredentials: true });
  return data.data;
});

export const addToCart = createAsyncThunk(
  "cart/add-to-cart",
  async ({ productId, product, quantity, quantityInKg }) => {
    const { data } = await AxiosInstance.post(
      `/cart/p/${productId}`,
      { product, quantity: quantity, quantityInKg: quantityInKg || 0 },
      { withCredentials: true }
    );
    return data.data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const { data } = await AxiosInstance.delete(
      `/cart/delete-cart/${productId}`,
      {},
      { withCredentials: true }
    );
    return data.data;
  }
);
export const updateCart = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }) => {
    const { data } = await AxiosInstance.put(
      `/cart/update-cart/${productId}`,
      { quantity: parseInt(quantity) },
      { withCredentials: true }
    );
    return data.data;
  }
);
export const clearCart = createAsyncThunk("cart/clear", async () => {
  const { data } = await AxiosInstance.delete("/clear-cart", {
    withCredentials: true,
  });
  return data.data.message;
});

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.status = "idle";
        state.cartItems = [];
      });
  },
});

export default cartSlice.reducer;
