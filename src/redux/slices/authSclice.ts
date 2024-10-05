import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  signupData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Handle user signup data
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    // Handle loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

// Export actions and reducer
export const { setSignupData, setLoading } = authSlice.actions;
export default authSlice.reducer;
