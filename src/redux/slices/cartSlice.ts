import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Define the type for a Course
interface Course {
  _id: string;
  title: string;
  price: number;
}

// Define the initial state interface for the cart
interface CartState {
  cart: Course[];
  total: number;
  totalItems: number;
}

// Function to get initial state from localStorage
const getInitialState = (): CartState => {
  if (typeof window === "undefined") {
    return {
      cart: [],
      total: 0,
      totalItems: 0,
    };
  }

  return {
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    total: JSON.parse(localStorage.getItem("total") || "0"),
    totalItems: JSON.parse(localStorage.getItem("totalItems") || "0"),
  };
};

const initialState: CartState = getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error("Course already in cart. 🛒");
        return;
      }

      state.cart.push(course);
      state.totalItems++;
      state.total += course.price;

      // Persist updated cart, total, and totalItems to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      }

      toast.success("Course added to cart successfully. 🛒");
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);

        // Persist updated cart, total, and totalItems to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.cart));
          localStorage.setItem("total", JSON.stringify(state.total));
          localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        }

        toast.success("Course removed from cart. 🛒");
      }
    },

    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Remove all cart data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
        localStorage.removeItem("total");
        localStorage.removeItem("totalItems");
      }

      toast.success("Cart reset successfully. 🛒");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
