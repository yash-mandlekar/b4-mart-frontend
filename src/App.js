import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncloaduser } from "./store/userActions";
import { toast } from "react-toastify";
import Home from "./components/user/Home";
import ShopProduct from "./components/user/ShopProduct";
import SingleProduct from "./components/user/SingleProduct";
import MainContent from "./components/user/MainContent";
import LogIn from "./components/user/LogIn";
import SignUp from "./components/user/SignUp";
import Cart from "./components/user/Cart";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import Loader from "./components/common/Loader";
import AdminShops from "./components/admin/AdminShops";

const App = () => {
  const notify = (msg) => toast(msg ?? "Something went wrong");
  const { isLoggedIn, loading, error } = useSelector((state) => state.user);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(asyncloaduser());
  }, []);

  useEffect(() => {
    if (error) notify(error);
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />}>
        <Route index element={<MainContent />} />
        <Route path="shopProducts" element={<ShopProduct />} />
        <Route path="singleProduct" element={<SingleProduct />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/adminShops" element={<AdminShops />} />
    </Routes>
  );
};

export default App;
