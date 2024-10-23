import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import "../../Css/ShoppingCart.css";
import CartBox from "./CartBox";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import { notify } from "../common/Toast";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setcounter] = useState(0);
  const [total, settotal] = useState(0);
  const { cart } = useSelector((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState("UPI"); // Add a state for payment method

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [formData, setFormData] = useState({
    pincode: "462022",
    house_no: "Flat 901,palash parisar",
    area: "near sage university",
    landmark: "Highway",
    city: "rau,indore",
    defaultAddress: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "COD") {
      try {
        await Axios.post("/create_order", {
          ...formData,
          paymentMethod: "COD",
        });
        notify("Order placed successfully. Cash on delivery.");
      } catch (error) {
        console.error("Error placing COD order:", error);
        alert("Order placement failed. Please try again.");
      }
    } else {
      try {
        const { data } = await Axios.get("/payment_gateway");
        const options = {
          key: "rzp_test_LQzqvbK2cWMGRg", // Replace with your Razorpay Key ID
          amount: data?.amount * 100, // Convert to paise
          currency: "INR",
          name: "B4 Mart",
          description: "Test Transaction",
          order_id: data?.id,
          image:
            "https://b4mart.com/static/media/B4mart.3c7b651ef058639fabff.png",
          handler: async function (response) {
            notify(`Payment Successful`);
            await Axios.post("/create_order", {
              ...formData,
              paymentMethod: "UPI",
            });
          },
          prefill: {
            email: "test@example.com", // Optional
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    var count = 0;
    cart.map((e) => {
      count += e.count;
    });
    var tot = 0;
    cart.map((e) => {
      tot += e.count * e.product.price;
    });
    settotal(tot);
    setcounter(count);
  }, [cart]);

  return (
    <div>
      <div className="shoppingCart">
        <div className="longBox">
          <h1>Cart List</h1>

          {cart.map((e, i) => (
            <CartBox data={e} key={i} />
          ))}
          <div className="billContainer">
            <h1>Bill Details</h1>
            <p>Total Items : {counter}</p>
            <div className="payrap">
              <h2>
                Grand total(1 item) : <span>₹ {total}</span>
              </h2>
              <button className="button" onClick={toggleModal}>
                Procced to pay
              </button>
              {isOpen && (
                <div className="popup-modal__overlay">
                  <div className="popup-modal__content">
                    <button
                      className="popup-modal__close-btn"
                      onClick={toggleModal}
                    >
                      &times;
                    </button>
                    <h2>Enter Your Address</h2>
                    <div className="address-form-container">
                      <h2 className="address-form__title">Add New Address</h2>
                      <form className="address-form" onSubmit={handleSubmit}>
                        {/* House Details */}
                        <label className="address-form__label">
                          Flat, House no., Building, Company, Apartment
                        </label>
                        <input
                          type="text"
                          name="house_no"
                          value={formData.house_no}
                          onChange={handleChange}
                          className="address-form__input"
                          required
                        />

                        {/* Area Details */}
                        <label className="address-form__label">
                          Area, Street, Sector, Village
                        </label>
                        <input
                          type="text"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          className="address-form__input"
                          required
                        />

                        {/* Landmark */}
                        <label className="address-form__label">Landmark</label>
                        <input
                          type="text"
                          name="landmark"
                          className="address-form__input"
                          value={formData.landmark}
                          onChange={handleChange}
                        />

                        {/* Town/City */}
                        <label className="address-form__label">Town/City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="address-form__input"
                          required
                        />

                        {/* Pincode */}
                        <label className="address-form__label">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="address-form__input"
                          pattern="[0-9]{6}"
                          required
                        />

                        {/* Payment Method Selection */}
                        <div className="payment-method">
                          <label>
                            <input
                              type="radio"
                              value="UPI"
                              checked={paymentMethod === "UPI"}
                              onChange={handlePaymentMethodChange}
                            />
                            UPI
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="COD"
                              checked={paymentMethod === "COD"}
                              onChange={handlePaymentMethodChange}
                            />
                            Cash on Delivery
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="address-form__submit-btn"
                        >
                          Checkout
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SideNav />
    </div>
  );
};

export default Cart;
