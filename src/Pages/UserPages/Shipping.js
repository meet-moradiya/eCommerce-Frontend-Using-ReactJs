import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../Redux/Reducer/cartReducer";
import { Button } from "@mui/material";

function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { userData } = useSelector((state) => state.userReducer);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    zipCode: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cartItems.length <= 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    const addData = JSON.parse(localStorage.getItem(`address_of_${userData?._id}`));
    if (addData) {
      setShippingInfo({
        firstName: addData.firstName,
        lastName: addData.lastName,
        address: addData.address,
        country: addData.country,
        zipCode: addData.zipCode,
        city: addData.city,
        state: addData.state,
      });
    }
  }, [userData?._id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));
    localStorage.setItem(`address_of_${userData?._id}`, JSON.stringify(shippingInfo));
    navigate("/pay");
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="pageNavigation">
        <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate(`/search?search=${""}`)}>
          Shop
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/cart")}>
          Cart
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        Shipping
      </div>

      <section className="shippingContainer">
        <h1>Shipping</h1>
        <p>Please enter your shipping details.</p>
        <hr />
        <form onSubmit={submitHandler} className="form">
          <div className="fields fields--2">
            <label className="field">
              <span className="field__label" htmlFor="firstname">
                First name
              </span>
              <input
                className="field__input"
                type="text"
                id="firstname"
                name="firstName"
                value={shippingInfo.firstName}
                onChange={inputChangeHandler}
              />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="lastname">
                Last name
              </span>
              <input className="field__input" type="text" id="lastname" name="lastName" value={shippingInfo.lastName} onChange={inputChangeHandler} />
            </label>
          </div>
          <label className="field">
            <span className="field__label" htmlFor="address">
              Address
            </span>
            <input className="field__input" type="text" id="address" name="address" value={shippingInfo.address} onChange={inputChangeHandler} />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="country">
              Country
            </span>
            <select className="field__input" id="country" name="country" value={shippingInfo.country} onChange={inputChangeHandler}>
              <option value=""></option>
              <option value="india">India</option> {/* Fixed the value here */}
            </select>
          </label>
          <div className="fields fields--3">
            <label className="field">
              <span className="field__label" htmlFor="zipCode">
                Pin code
              </span>
              <input className="field__input" type="text" id="zipCode" name="zipCode" value={shippingInfo.zipCode} onChange={inputChangeHandler} />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="city">
                City
              </span>
              <input className="field__input" type="text" id="city" name="city" value={shippingInfo.city} onChange={inputChangeHandler} />
            </label>
            <label className="field">
              <span className="field__label" htmlFor="state">
                State
              </span>
              <input className="field__input" type="text" id="state" name="state" value={shippingInfo.state} onChange={inputChangeHandler} />
            </label>
          </div>
          <hr />
          <div className="shippingFormBtns">
            <Button className="button" onClick={() => navigate("/cart")}>
              Back to Cart
            </Button>
            <Button type="submit" className="button">
              Continue
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Shipping;
