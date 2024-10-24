import React, { useEffect } from "react";
import "../../Css/UserOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncupdateorders } from "../../store/userActions";
const UserOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.user);
  console.log(orders);

  useEffect(() => {
    dispatch(asyncupdateorders());
  }, []);
  return (
    <div className="order-page">
      <h1>Your Orders</h1>
      <div className="orders-list">
        {loading ? (
          <div className="card">
            <div className="card__skeleton card__title"></div>
            <div className="card__skeleton card__description"> </div>
            <div className="card__skeleton card__description"> </div>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <img
                src={order.imageUrl}
                alt={order.productName}
                className="order-image"
              />
              <div className="order-details">
                <h2>{order.productName}</h2>
                <p>Price: {order.price}</p>
                <p>
                  Status: <strong>{order.status}</strong>
                </p>
                <button className="track-button">Cancel Order</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserOrders;
