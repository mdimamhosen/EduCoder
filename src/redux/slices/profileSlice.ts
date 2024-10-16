import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType?: string;
}

interface ProfileState {
  user: SignUpDetails | null;
  loading: boolean;
  isNavOpen: boolean;
  userPhoto: boolean;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  isNavOpen: false,
  userPhoto: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SignUpDetails | null>) {
      state.user = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setNavOpen(state, action: PayloadAction<boolean>) {
      state.isNavOpen = action.payload;
    },
    setUserPhoto(state, action: PayloadAction<string>) {
      state.userPhoto = action.payload;
    },
  },
});

export const { setUser, setLoading, setNavOpen, setUserPhoto } =
  profileSlice.actions;
export default profileSlice.reducer;
