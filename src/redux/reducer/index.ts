import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import authReducer from "../slices/authSclice";
import courseReducer from "../slices/courseSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    cart: cartReducer,
    auth: authReducer,
    course: courseReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
