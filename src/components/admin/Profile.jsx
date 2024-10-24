import React from 'react';
import "../../Css/AdminProfile.css"
const Profile = () => {
  const admin = {
    id: 'ADM123',
    name: 'John Doe',
    email: 'admin@example.com',
    phone: '123-456-7890',
    role: 'Super Admin',
    address: '123 Admin Lane, Admin City, Admin Country',
    joinedDate: 'January 10, 2022',
    profilePicture: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  }; 
  return (
    <div className="admin-profile-container">
    <div className="admin-header">
      <img src={admin.profilePicture} alt="Admin Profile" className="admin-avatar" />
      <h1>{admin.name}</h1>
      <p className="admin-role">{admin.role}</p>
    </div>

    <div className="admin-details">
      <h2>Profile Information</h2>
      <div className="info-box">
        <p><strong>ID:</strong> {admin.id}</p>
        <p><strong>Email:</strong> {admin.email}</p>
        <p><strong>Phone:</strong> {admin.phone}</p>
        <p><strong>Address:</strong> {admin.address}</p>
        <p><strong>Date Joined:</strong> {admin.joinedDate}</p>
      </div>
    </div>
  </div>
  );
}

export default Profile;
