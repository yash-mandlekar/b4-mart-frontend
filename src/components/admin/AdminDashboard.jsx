import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const AdminDashboard = () => {
  
  return (
    <div style={{width:"100vw",display:"flex"}}>
    <Sidebar/>
    <Dashboard/>
    </div>
  );
}

export default AdminDashboard;
