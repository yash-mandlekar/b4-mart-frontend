import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  page_loading: true,
  loading: true,
  role: null,
  shops: [],
  products: [],
  singleshop_products: [],
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setpageloading: (state, action) => {
      state.page_loading = true;
    },
    setpageloadingfalse: (state, action) => {
      state.page_loading = false;
    },
    setloading: (state, action) => {
      state.loading = true;
    },
    setloadingfalse: (state, action) => {
      state.loading = false;
    },
    loaduser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
      state.role = action.payload.role;
    },
    setshops: (state, action) => {
      state.shops = action.payload;
    },
    createshops: (state, action) => {
      state.shops.push(action.payload);
    },
    removeshops: (state, action) => {
      state.shops = state.shops.filter((shop) => shop._id !== action.payload);
    },
    setproducts: (state, action) => {
      state.products = action.payload;
    },
    createproduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeproducts: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    setsingleshop_products: (state, action) => {
      state.singleshop_products = action.payload;
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
      state.role = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setloading,
  setpageloading,
  setpageloadingfalse,
  loaduser,
  errors,
  setloadingfalse,
  logout,
  setshops,
  createshops,
  removeshops,
  setproducts,
  removeproducts,
  createproduct,
  setsingleshop_products,
} = userSlice.actions;

export default userSlice.reducer;
