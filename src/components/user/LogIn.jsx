import React, { useEffect, useState } from "react";
import "../../Css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import { notify } from "../common/Toast";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import { asyncloaduser } from "../../store/userActions";

const LogIn = () => {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state) => state.user);
  const [page, setpage] = useState(0);
  const [formdata, setFormdata] = useState({
    username: "",
    contact: "",
    otp: "",
  });
  const { username, contact, otp } = formdata;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username.length < 3) return notify("Enter a vaild username");
      if (contact.length != 10) return notify("Enter a vaild number");
      window.alert("line 27");
      const { data } = await Axios.post("/login", { username, contact });
      window.alert("line 29");
      if (data.message == "OTP send succesfully") {
        window.alert("line 31");
        notify(data.user.otp);
        setpage(1);
      }
    } catch (err) {
      alert(err)
      console.log(err);
    }
  };
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (otp.length != 4) return notify("Enter a vaild OTP");
    const { data } = await Axios.post("/otp", { contact, otp });
    Dispatch(asyncloaduser());

    if (data.success) {
      navigate("/home");
    } else {
      notify(data.message);
    }
  };
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const hack = async () => {
    const { data } = await Axios.post("/login", {
      username: "yash",
      contact: "1234567890",
    });
    if (data.message == "OTP send succesfully") {
      setFormdata({
        username: "yash",
        contact: "1234567890",
        otp: data.user.otp,
      });
      setpage(1);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="base">
        <div className="text">
          <h1>Welcome Back.!</h1>
          <div>
            <div onClick={hack} className="skip">
              Skip the lag?
            </div>
          </div>
        </div>
        <div className="loginForm">
          <div className="box"></div>
          <div className="box2"></div>
          <div className="loginBox">
            <p className="title">Login</p>
            {/* <p className="title toto">Enter Your Phone Number</p> */}
            <p className="sp-text">
              We will send you 4 digit verification code
            </p>
            {page == 0 ? (
              <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="password">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={username}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="username">Mobile</label>
                  <input
                    type="number"
                    name="contact"
                    id="number"
                    placeholder="Mobile No.  "
                    onChange={handleChange}
                    value={contact}
                  />
                </div>

                <button className="sign">Generate OTP</button>
              </form>
            ) : (
              <form className="form" onSubmit={handleOTPSubmit}>
                <div className="input-group">
                  <label htmlFor="password">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Enter your OTP"
                    onChange={handleChange}
                    value={otp}
                  />
                </div>
                <button className="sign">Login</button>
              </form>
            )}
            <div className="social-message">
              <div className="line"></div>
              <p className="message">OR</p>
              <div className="line"></div>
            </div>
            <div className="signUp">
              <p className="sign-up-label">
                Don't have an account? &nbsp;
                <Link to="/signup">
                  <span className="sign-up-link"> Sign up</span>
                </Link>
              </p>
            </div>

            <div className="link">
              <Link>Customer care</Link>
              <Link>Terms & Conditions</Link>
              <Link>Support</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
