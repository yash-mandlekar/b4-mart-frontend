import React, { useEffect, useState } from "react";
import "../../Css/Home.css";
import Logo from "../common/Logo";
import Notification from "../../assets/notification.svg";
import Logout from "../../assets/logout.svg";
import cartlogo from "../../assets/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { asynclogout } from "../../store/userActions";
import { NavLink, Link } from "react-router-dom";

const Search = () => {
  const Dispatch = useDispatch();
  const [counter, setcounter] = useState(0);
  const { cart, user } = useSelector((state) => state.user);

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
    <nav className="searchBox">
      <div className="top-nav">
        <Logo />
        <div className="nav-items">
          <button onClick={handleLogout} className="logout">
            <img className="top-nav-img" src={Logout} alt="" />
          </button>
          <NavLink
            to="/home/orders"
            className="top-nav-item"
            activeclassname="active"
          >
            <img className="top-nav-img" src={Notification} alt="" />
          </NavLink>
          <NavLink
            to="cart"
            id="cartOption"
            className="top-nav-item"
            activeclassname="active"
          >
            {counter > 0 && <div className="circ">{counter}</div>}
            <img className="top-nav-img" src={cartlogo} alt="" />
          </NavLink>
          <Link to="/home/profile" className="top-nav-profile-cnt">
            <img className="top-nav-profile" src={user?.profilepic} alt="" />
          </Link>
        </div>
      </div>

      <div className="search-div">
        <input
          className="search"
          type="search"
          placeholder="Search any items.."
        />
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <path
              d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="32"
            ></path>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M338.29 338.29L448 448"
            ></path>
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Search;
