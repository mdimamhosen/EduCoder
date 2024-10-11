import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for signup details
interface SignUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType?: string;
}

interface AuthState {
  signupData: SignUpDetails | null;
  loading: boolean;
}

const initialState: AuthState = {
  signupData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<SignUpDetails>) {
      state.signupData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setSignupData, setLoading } = authSlice.actions;

export default authSlice.reducer;
