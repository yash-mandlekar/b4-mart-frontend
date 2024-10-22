import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../Css/item.css";
import Axios from "../../Axios";
import { asyncaddcart, asyncremovecart } from "../../store/userActions";
import { useDispatch, useSelector } from "react-redux";
const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.user);
  const [singleProduct, setSingleProduct] = useState();
  const [count, setCount] = useState(0);

  const increaseQuantity = (id) => {
    dispatch(asyncaddcart(id));
    setCount((prev) => prev + 1);
  };

  const decreaseQuantity = (id) => {
    dispatch(asyncremovecart(id));
    setCount((prev) => (prev > 1 ? prev - 1 : 0));
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, []);

  const getProduct = async (id) => {
    try {
      const { data } = await Axios.get(`/singleproduct/${id}`);
      setSingleProduct(data.data);
      console.log(cart);
      var a = cart?.filter((e) => {
        return e.product._id == data.data._id;
      });
      if (a[0]) {
        setCount(a[0]?.count);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="item">
        <div className="itemContainer">
          <div className="itemPhoto">
            <img src={singleProduct?.productpic} alt="" />
          </div>
          <div className="itemInfo">
            <h1>{singleProduct?.product_name}</h1>
            <p>
              {singleProduct?.quantity}
              {singleProduct?.quantity_type}
            </p>
            <div className="priceOverlap">
              <p>
                MRP <b>₹{singleProduct?.price}</b>
              </p>
              <button type="button" className="button">
                {count === 0 ? (
                  <span
                    className="button__text"
                    onClick={() => increaseQuantity(singleProduct?._id)}
                  >
                    Add Item
                  </span>
                ) : (
                  <div className="button__content">
                    <span
                      className="button__icon"
                      onClick={() => decreaseQuantity(singleProduct?._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        stroke="currentColor"
                        height="24"
                        fill="none"
                        className="svg"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                    <span className="button__text">{count}</span>
                    <span
                      className="button__icon"
                      onClick={() => increaseQuantity(singleProduct?._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        stroke="currentColor"
                        height="24"
                        fill="none"
                        className="svg"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </div>
                )}
              </button>
            </div>

            <h4>Description:</h4>
            <p className="specification">{singleProduct?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
