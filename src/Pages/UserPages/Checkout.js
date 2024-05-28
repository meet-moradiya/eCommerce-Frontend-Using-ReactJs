import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../../Redux/API/orderAPI";
import { clearCartFromLocalStorage, resetCart } from "../../Redux/Reducer/cartReducer";

// images importing
import paymentImages from "../../Assets/images/PaymentPlateforms.png";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useUpdateTotalUseMutation } from "../../Redux/API/couponAPI";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo, total, subTotal, tax, discount, discountCode, shippingCharges } = useSelector((state) => state.cartReducer);
  const { userData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (total === 0) {
      return navigate("/");
    }
  }, [total, navigate]);

  const [newOrder] = useNewOrderMutation();
  const [updateTotalUse] = useUpdateTotalUseMutation();

  const paymentSubmitHandler = async (e) => {
    e.preventDefault();

    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      subtotal: subTotal,
      tax,
      discount,
      discountCode,
      shippingCharges,
      total,
      user: userData?._id,
    };

    try {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      dispatch(clearCartFromLocalStorage({ userId: userData?._id }));
      if ("data" in res) {
        localStorage.setItem(`${userData?._id}`, JSON.stringify(shippingInfo));
        await updateTotalUse(discountCode);
        toast.success(res.data.message);
        toast.success("You can see your order details on the account page.");
        navigate("/");
      } else {
        const error = res.error;
        const errMsg = error.messages || "Internal Server Error!";
        toast.error(errMsg);
        navigate("/cart");
      }
    } catch (error) {
      console.log("Error:", error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }

      navigate("/cart");
    }
  };

  return (
    <section className="checkOutSection">
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
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/shipping")}>
          Shipping
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        Checkout
      </div>

      <h2>Payment</h2>
      <form onSubmit={paymentSubmitHandler} className="paymentForm">
        <div className="paymentImages">
          <img src={paymentImages} alt="payment-platforms" />
        </div>

        <div className="paymentAmount">
          <strong>Payment amount</strong>
          <p>₹{total}</p>
        </div>
        <div className="paymentInput">
          <p>Name on card</p>
          <input type="text" />
        </div>
        <div className="paymentInput">
          <p>Card number</p>
          <input type="text" maxlength="16" />
        </div>
        <div className="expireWrapper">
          <div className="paymentInput pBox1">
            <p>Expiry date</p>
            <input type="text" maxlength="5" />
          </div>
          <div className="paymentInput pBox2">
            <p>Security code</p>
            <input type="text" maxlength="3" />
          </div>
        </div>
        <div className="paymentInput">
          <p>ZIP/Postal code</p>
          <input type="text" maxlength="8" />
        </div>

        <Button type="submit">Pay ₹{total}</Button>
      </form>
    </section>
  );
}

export default Checkout;

// ##############################################################

// import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import toast from "react-hot-toast";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useNewOrderMutation } from "../../Redux/API/orderAPI";
// import { resetCart } from "../../Redux/Reducer/cartReducer";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

// const CheckOutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { userData } = useSelector((state) => state.userReducer);

//   const { shippingInfo, cartItems, subTotal, tax, discount, shippingCharges, total } = useSelector((state) => state.cartReducer);

//   const [isProcessing, setIsProcessing] = useState(false);

//   const [newOrder] = useNewOrderMutation();

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;
//     setIsProcessing(true);

//     const orderData = {
//       shippingInfo,
//       orderItems: cartItems,
//       subtotal: subTotal,
//       tax,
//       discount,
//       shippingCharges,
//       total,
//       user: userData?._id,
//     };

//     const { paymentIntent, error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: { return_url: window.location.origin },
//       redirect: "if_required",
//       description: "Purchase from mdmart.com",
//     });

//     if (error) {
//       setIsProcessing(false);
//       return toast.error(error.message || "Something went Wrong!");
//     }

//     if (paymentIntent.status === "succeeded") {
//       const res = await newOrder(orderData);
//       dispatch(resetCart());

//       if ("data" in res) {
//         toast.success(res.data.message);
//         toast.success("Your can see your order detais on account page.");
//         navigate("/account");
//       } else {
//         const error = res.error;
//         const errMsg = error.data.messages;
//         toast.error(errMsg);
//       }
//     }
//     setIsProcessing(false);
//   };

//   return (
//     <div className="checkOutContainer">
//       <form onSubmit={submitHandler}>
//         <PaymentElement />
//         <Button type="submit" disabled={isProcessing}>
//           {isProcessing ? "Processing..." : "Pay"}
//         </Button>
//       </form>
//     </div>
//   );
// };

// function Checkout() {
//   const location = useLocation();
//   const clientSecret = location.state;

//   if (!clientSecret) return <Navigate to={"/shipping"} />;

//   return (
//     <Elements
//       options={{
//         clientSecret,
//       }}
//       stripe={stripePromise}
//     >
//       <CheckOutForm />
//     </Elements>
//   );
// }
// export default Checkout;
