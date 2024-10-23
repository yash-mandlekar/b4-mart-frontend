import React, { useEffect, useState } from "react";
import SideNav from "./SideNav";
import "../../Css/ShoppingCart.css";
import CartBox from "./CartBox";
import { useSelector } from "react-redux";
import Axios from "../../Axios";
import { notify } from "../common/Toast";
// import Notify from "../common/Notification"
const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [counter, setcounter] = useState(0);
  const [total, settotal] = useState(0);
  const { cart } = useSelector((state) => state.user);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const [formData, setFormData] = useState({
    fullName: "Yash",
    contactNo: "9826818996",
    pincode: "462022",
    houseDetails: "Flat 901,palash parisar",
    areaDetails: "near sage university",
    landmark: "Highway",
    townCity: "rau,indore",
    defaultAddress: false,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
  
    try {
      // Get order details from the server
      const {data} = await Axios.get('https://b4mart.com//api/create_order');
      console.log(data);
  
      // Initialize Razorpay Payment
      const options = {
        key: 'rzp_test_LQzqvbK2cWMGRg', // Replace with your Razorpay Key ID
        amount: data?.amount * 100, // Convert to paise
        currency: 'INR',
        name: 'B4 Mart',
        description: 'Test Transaction',
        order_id: data?.id,
        // image: "/static/media/B4mart.3c7b651ef058639fabff.png",
        image: "https://b4mart.com/static/media/B4mart.3c7b651ef058639fabff.png",
        handler: function (response) {
          notify(`Payment Successful`);
        },
        prefill: {
          name: formData.fullName,
          contact: formData.contactNo,
          email: 'test@example.com', // Optional
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      // Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open(); // Open without arguments
  
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
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
            {/* <p>Delivery Charge : 0</p> */}
            {/* <p>Handling Charge : ₹2</p> */}
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
                        {/* Full Name */}
                        <label className="address-form__label">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="address-form__input"
                          required
                        />

                        {/* Contact No */}
                        <label className="address-form__label">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          name="contactNo"
                          value={formData.contactNo}
                          onChange={handleChange}
                          className="address-form__input"
                          pattern="[0-9]{10}"
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

                        {/* House Details */}
                        <label className="address-form__label">
                          Flat, House no., Building, Company, Apartment
                        </label>
                        <input
                          type="text"
                          name="houseDetails"
                          value={formData.houseDetails}
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
                          name="areaDetails"
                          value={formData.areaDetails}
                          onChange={handleChange}
                          className="address-form__input"
                          required
                        />

                        {/* Landmark */}
                        <label className="address-form__label">Landmark</label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="address-form__input"
                        />

                        {/* Town/City */}
                        <label className="address-form__label">Town/City</label>
                        <input
                          type="text"
                          name="townCity"
                          value={formData.townCity}
                          onChange={handleChange}
                          className="address-form__input"
                          required
                        />

                        {/* Checkbox for Default Address */}
                        <div className="address-form__checkbox">
                          <input
                            type="checkbox"
                            name="defaultAddress"
                            checked={formData.defaultAddress}
                            onChange={handleChange}
                          />
                          <label>Make this my default address</label>
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
