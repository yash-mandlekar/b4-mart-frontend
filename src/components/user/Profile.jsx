import React, { useState, useEffect } from 'react';
import "../../Css/UserProfile.css";
import { useSelector } from 'react-redux';
import Axios from '../../Axios';
import {Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector(state => state.user);
  console.log(user);

  // Use state for form inputs, initialized with existing user data
  const [username, setUsername] = useState(user?.username || "");
  const [house_no, setHouse_no] = useState(user?.house_no || "");
  const [area, setArea] = useState(user?.area || "");
  const [city, setCity] = useState(user?.city || "");
  const [pincode, setPincode] = useState(user?.pincode || "");

  // Update state when user changes
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setHouse_no(user.house_no);
      setArea(user.area);
      setCity(user.city);
      setPincode(user.pincode);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userSchema = { 
        username: username, 
        house_no: house_no, 
        area: area, 
        city: city,
        pincode: pincode,
    };

    // Send POST request to the server
    Axios.put('/profileupdate', userSchema)
        .then(response => {
            console.log(response.data); 
        })
        .catch(error => {
            console.error("There was an error updating the profile!", error);
        });
};
  
  return (
    <div className='userprofile'>
      <div className="profile-edit-container">
        {/* Left Sidebar */}
        <div className="profile-edit-sidebar">
          <div className="profile-edit-details">
            <img
              src="https://imgs.search.brave.com/D1Qf4rHF1g9nW99i8wwb75woKfvdg5LMRwv2fual0t8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGVh/ZHBvb2wtbW92aWUt/bG9va2luZy1iZWhp/bmQteWpkM2pseWo2/MzA1cTlycy5qcGc"
              alt="User"
              className="profile-edit-image"
            />
            <h3 className="profile-edit-username">{username}</h3>
            <p className="profile-edit-email">{user?.contact}</p>
          </div>
          <div className="profile-edit-menu">
          <Link to={"/home/orders"} >
          <button className="profile-edit-menu-button" >Your Orders</button>
          </Link>
          <Link to={"/home/cart"} >
          <button className="profile-edit-menu-button">Your Cart</button>          
          </Link>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="profile-edit-form">
          <h2>Profile Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className="profile-edit-form-group">
              <label>First Name</label>
              <input type="text" placeholder="First Name" defaultValue={username}
              onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="profile-edit-form-group">
              <label>House No.</label>
              <input type="text" placeholder="House No." defaultValue={house_no} 
                onChange={(e) => setHouse_no(e.target.value)}
              />
            </div>
            <div className="profile-edit-form-group">
              <label>Area</label>
              <input type="text" placeholder="Area" defaultValue={area} 
              onChange={(e) => setArea(e.target.value)} />
            </div>
            <div className="profile-edit-form-group">
              <label>City/Town</label>
              <input type="text" placeholder="State/Region" defaultValue={city}
              onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="profile-edit-form-group">
              <label>Pincode</label>
              <input type="text" placeholder="Pincode" defaultValue={pincode} 
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
            <div className="profile-edit-form-group">
              <button type="submit" className="profile-edit-save-button">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
