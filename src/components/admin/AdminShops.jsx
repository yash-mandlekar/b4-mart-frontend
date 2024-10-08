import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../../Css/AdminShops.css";
import { asynallshops, asyncloaduser } from "../../store/userActions";
import { useDispatch, useSelector } from "react-redux";
const AdminShops = () => {
  const Dispatch = useDispatch();
  const { shops } = useSelector((state) => state.user);
  const [newShop, setNewShop] = useState({
    name: "",
    contact: "",
    password: "",
    products: 0,
    dp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShop({ ...newShop, [name]: value });
  };
  const addShop = () => {
    if (newShop.name && newShop.contact) {
      setNewShop({ name: "", contact: "", products: 0, dp: "" });
    }
  };
  useEffect(() => {
    Dispatch(asynallshops());
  }, []);

  return (
    <div style={{ width: "100vw", display: "flex" }}>
      <Sidebar />
      <div style={{ paddingLeft: "20%" }}>
        <div className="shop-table-container">
          <h1>Shop Management</h1>

          {/* Add Shop Form */}
          <div className="add-shop-form">
            <input
              type="text"
              name="name"
              value={newShop.name}
              onChange={handleInputChange}
              placeholder="Shop Name"
            />
            <input
              type="text"
              name="contact"
              value={newShop.contact}
              onChange={handleInputChange}
              placeholder="Contact Number"
            />
            <input
              type="text"
              name="password"
              value={newShop.password}
              onChange={handleInputChange}
              placeholder="Contact Number"
            />
            <input
              type="number"
              name="products"
              value={newShop.products}
              onChange={handleInputChange}
              placeholder="Quantity of Products"
            />
            <button onClick={addShop}>Add Shop</button>
          </div>

          {/* Shop Table */}
          <table className="shop-table">
            <thead>
              <tr>
                <th>DP</th>
                <th>Name</th>
                <th>Contact Number</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop, index) => (
                <tr key={shop._id}>
                  <td>
                    <img
                      src="https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFpcnl8ZW58MHx8MHx8fDA%3D"
                      alt="Shop DP"
                      className="shop-dp"
                    />
                  </td>
                  <td>{shop.username}</td>
                  <td>{shop.contact}</td>
                  <td>{shop.products.length}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminShops;
