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
  console.log(data);
  return data;
});

export const addToCart = createAsyncThunk(
  "cart/add-to-cart",
  async (productId, product) => {
    const { data } = await AxiosInstance.post(
      `/cart/add-to-cart/${productId}`,
      { product },
      { withCredentials: true }
    );
    return data;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (cartId, productId) => {
    const { data } = await AxiosInstance.post(
      `/cart/delete-from-cart/${cartId}/product/${productId}`,
      {},
      { withCredentials: true }
    );
    return data;
  }
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.message = action.payload.message;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export default cartSlice.reducer;
