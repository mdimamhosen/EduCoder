import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  isNavOpen: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setNavOpen(state, value) {
      state.isNavOpen = value.payload;
    },
  },
});

export const { setUser, setLoading, setNavOpen } = profileSlice.actions;
export default profileSlice.reducer;
