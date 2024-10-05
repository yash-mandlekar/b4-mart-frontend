import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  products: null,
  isLoggedIn: false,
  error: null,
  loading: true,
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setloading: (state, action) => {
      state.loading = true;
    },
    setloadingfalse: (state, action) => {
      state.loading = false;
    },
    loaduser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    errors: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setloading, loaduser, errors, setloadingfalse, logout } =
  userSlice.actions;

export default userSlice.reducer;
