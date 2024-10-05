import React from "react";
import "../../Css/Home.css";
import { NavLink } from "react-router-dom";
const Logo = () => {
  return (
    <NavLink to="/" activeclassname="active">
      <div className="logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgPzxtp5uy5Fiw8PUeXlVCh3Pr9T2k__8KA&s"
          alt=""
        />
      </div>
    </NavLink>
  );
};

export default Logo;
