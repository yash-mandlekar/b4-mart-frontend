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
import AdminShops from "./components/admin/AdminShops";
import Dashboard from "./components/admin/Dashboard";
import Loader from "./components/common/Loader";

const App = () => {
  const notify = (msg) => toast(msg ?? "Something went wrong");
  const { role, page_loading, error } = useSelector((state) => state.user);
  console.log(page_loading);

  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(asyncloaduser());
  }, []);

  useEffect(() => {
    if (error) notify(error);
  }, [error]);

  if (page_loading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="shops" element={<AdminShops />} />
          <Route path="orders" element={<></>} />
          <Route path="users" element={<></>} />
          <Route path="profile" element={<></>} />
        </Route>

        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<MainContent />} />
          <Route path="shopProducts" element={<ShopProduct />} />
          <Route path="singleProduct" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* <Route path="/admin/*" element={<>Not Authorized</>} /> */}
      </Routes>
    </>
  );
};

export default App;
