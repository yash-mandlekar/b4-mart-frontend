import React from 'react';
import "../../Css/Users.css"

const Users = () => {
  const users = [
    { serial: 1, username: 'JohnDoe', contact: '123-456-7890', orders: 5 },
    { serial: 2, username: 'JaneDoe', contact: '098-765-4321', orders: 3 },
    { serial: 3, username: 'AliceSmith', contact: '456-123-7890', orders: 8 },
    { serial: 4, username: 'BobJohnson', contact: '789-123-4567', orders: 2 },
    // Add more users as needed
  ];
  return (
    <div className="user-table-container">
    <h1>All Users</h1>
    <table className="user-table">
      <thead>
        <tr>
          <th>Serial No.</th>
          <th>Username</th>
          <th>Contact No.</th>
          <th>Orders</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.serial}>
            <td>{user.serial}</td>
            <td>{user.username}</td>
            <td>{user.contact}</td>
            <td>{user.orders}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default Users;
