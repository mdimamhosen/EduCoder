import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token") || "{}")
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    removeToken(state) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
      state.token = null;
    },
  },
});
export const { setSignupData, setLoading, removeToken } = authSlice.actions;
export default authSlice.reducer;
