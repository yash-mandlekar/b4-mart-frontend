// src/components/Sidebar.js
import React, { useState } from 'react';
import '../../Css/Sidebar.css';
import { MdOutlineDashboard } from "react-icons/md";
import { RiRedPacketLine } from "react-icons/ri";

import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { TbUsersGroup } from "react-icons/tb";

import { GoHome } from "react-icons/go";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div>
      <div className="sidebar-header">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbXvNqkhcYqj4uBAqTha7Asn8b-93L0dBwQ&s" alt="B4Mart Logo" className="logo" />
          <h2>B4Mart</h2>
        </div>

        <ul className="sidebar-menu">
          <li>
            <a href="/adminDashboard">
            <MdOutlineDashboard />
            Dashboard
            </a>
          </li>
          <li>
            <a href="/adminShops">
            <GoHome /> Shops
            </a>
          </li>
          <li>
            <a href="#">
            <RiRedPacketLine /> Orders
            </a>
          </li>
          <li className='bottomBor'>
            <a href="#">
            <TbUsersGroup />

            Users
            </a>
          </li>
        </ul>
      </div>

        <div className="sidebar-footer">
          <a href="#">
          <FaRegUser />Profile
          </a>
          <a href="#">
          <IoIosLogOut /> Logout
          </a>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="toggle-button" onClick={toggleSidebar}>
        <i className="icon">☰</i>
      </div>
    </>
  );
}
