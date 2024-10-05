import React, { useState } from 'react';
import Sidebar from './Sidebar';
import "../../Css/AdminShops.css"
const AdminShops = () => {
  const [shops, setShops] = useState([
    { id: 1, name: 'Shop A', contact: '1234567890', products: 50, dp: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Shop B', contact: '0987654321', products: 20, dp: 'https://via.placeholder.com/50' }
  ]);
  
  const [newShop, setNewShop] = useState({ name: '', contact: '', products: 0, dp: '' });

  // Handle input changes for the new shop form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShop({ ...newShop, [name]: value });
  };

  // Handle adding a new shop
  const addShop = () => {
    if (newShop.name && newShop.contact) {
      setShops([...shops, { ...newShop, id: shops.length + 1, dp: newShop.dp || 'https://via.placeholder.com/50' }]);
      setNewShop({ name: '', contact: '', products: 0, dp: '' });
    }
  };
  return (
    <div style={{width:"100vw",display:"flex"}}>
      <Sidebar/>
      <div style={{paddingLeft:"20%"}}>
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
          type="number"
          name="products"
          value={newShop.products}
          onChange={handleInputChange}
          placeholder="Quantity of Products"
        />
        <input
          type="text"
          name="dp"
          value={newShop.dp}
          onChange={handleInputChange}
          placeholder="Shop DP URL (optional)"
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
            <tr key={shop.id}>
              <td><img src={shop.dp} alt="Shop DP" className="shop-dp" /></td>
              <td>{shop.name}</td>
              <td>{shop.contact}</td>
              <td>{shop.products}</td>
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
  );
}

export default AdminShops;
