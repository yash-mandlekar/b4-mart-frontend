import React, { useEffect, useState } from "react";
import "../../Css/Home.css";
import { Link, NavLink } from "react-router-dom";
import Vector from "../../assets/Vector.svg";
import Profile from "../../assets/profile.svg";
import Notification from "../../assets/notification.svg";
import search from "../../assets/search.svg";
import cartlogo from "../../assets/cart.svg";
import location from "../../assets/location.svg";
import Logout from "../../assets/logout.svg";
import Logo from "../common/Logo";
import { asynclogout } from "../../store/userActions";
import { useDispatch, useSelector } from "react-redux";

const SideNav = () => {
  const Dispatch = useDispatch();
  const [counter, setcounter] = useState(0);
  const { cart } = useSelector((state) => state.user);

  useEffect(() => {
    var count = 0;
    cart.map((e) => {
      count += e.count;
    });
    setcounter(count);
  }, [cart]);
  const handleLogout = async () => {
    if (window.confirm("Are you really want to logout?")) {
      Dispatch(asynclogout());
    }
  };

  return (
    <div className="sideNav">
      <Logo />
      <div className="sideNavBase">
        <div className="navTop">
          <NavLink
            to="/home"
            end
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src={Vector} alt="" />
          </NavLink>
          {/* <NavLink
            to="/home/profile"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img src={Profile} alt="" />
          </NavLink> */}
          <Link>
            <img src={Notification} alt="" />
          </Link>
          <Link>
            <img src={search} alt="" />
          </Link>
          <NavLink
            to="/home/cart"
            id="cartOption"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            {counter > 0 && <div className="circ">{counter}</div>}
            <img src={cartlogo} alt="" />
          </NavLink>
          <Link>
            <img src={location} alt="" />
          </Link>
        </div>

        <div className="navBottom">
          <button onClick={handleLogout} className="logout">
            <img src={Logout} alt="" />
          </button>
          <Link to="/home/profile" className="profile">
            <img
              src="https://images.unsplash.com/photo-1629364964671-053e86d40e63?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
