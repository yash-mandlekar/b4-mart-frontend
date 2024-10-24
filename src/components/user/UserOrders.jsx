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
        ) :  (
          orders.map((order) => (
            <div className="order-card">
              {order.products.map((product_detail) => (
                <div key={product_detail.product._id} className="order-item">
                  
                  <img
                    src={product_detail.product.productpic[0]}
                    alt={product_detail.product.product_name}
                    className="order-image"
                  />
                  <div className="order-details">
                    <h2>{product_detail.product.product_name}</h2> 
                    <p><b>Price:</b> ₹{product_detail.product.price}</p> 
                    <p><b>Quantity:</b> {product_detail.count}</p> 
                    <p>
                      <b>Status:</b> <strong>{order.orderStatus}</strong>
                    </p>
                    <button className="track-button">Cancel Order</button>
                  </div>
                </div>
              ))}
            </div>
          )))}
       </div>   
    </div>
    )
}

export default UserOrders;
