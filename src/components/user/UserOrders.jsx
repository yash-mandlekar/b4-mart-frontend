import React from 'react'
import "../../Css/UserOrder.css"
const UserOrders = () => {
    const orders = [
        {
          id: 1,
          productName: "Wireless Bluetooth Headphones",
          price: "$150",
          status: "In Transit",
          deliveryDate: "October 25, 2024",
          imageUrl: "https://imgs.search.brave.com/Xo3fxq3e5QT57_yAp_a7AWU-ghIl-VKKMT0E-_7bPKA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFKQUNXVC13V0wu/anBn"
        },
        {
          id: 2,
          productName: "Smartphone Case",
          price: "$25",
          status: "Delivered",
          deliveryDate: "October 15, 2024",
          imageUrl: "https://imgs.search.brave.com/nwJbnPrWDL3wWe7WwkbH7grU5ilfVnQGRTaib5XStSM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFHYURGN1BwMUwu/anBn"
        }
      ];
  return (
    <div className="order-page">
    <h1>Your Orders</h1>
    <div className="orders-list">
      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <img src={order.imageUrl} alt={order.productName} className="order-image" />
          <div className="order-details">
            <h2>{order.productName}</h2>
            <p>Price: {order.price}</p>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Estimated Delivery: {order.deliveryDate}</p>
            <button className="track-button">Cancel Order</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default UserOrders;