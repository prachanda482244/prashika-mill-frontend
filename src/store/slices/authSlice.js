import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: null,
  role: "customer",
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      (state.isLoggedIn = true),
        (state.token = action.payload.token),
        (state.userData = action.payload.userData);
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      (state.token = null), (state.userData = null);
    },
  },
});
export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
