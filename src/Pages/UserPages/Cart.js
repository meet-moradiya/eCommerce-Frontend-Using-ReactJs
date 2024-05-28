import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LatestProducts from "../../Components/UserComponents/LatestProducts";
import { useSelector, useDispatch } from "react-redux";
import { server } from "../../Redux/Store";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  loadCartFromLocalStorage,
  removeFromCart,
  removeItemFromLocalStorage,
} from "../../Redux/Reducer/cartReducer";
import toast from "react-hot-toast";
import axios from "axios";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Button } from "@mui/material";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const { cartItems, subTotal, shippingCharges, total, discount } = useSelector((state) => state.cartReducer);
  const { userData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // done
  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {
      try {
        axios
          .get(`${server}/api/v1/payment/discount?couponCode=${coupon}`, { cancelToken })
          .then((res) => {
            const discountAmount = res.data.discount;
            if (discountAmount <= subTotal * 0.75) {
              setIsValidCoupon(true);
              dispatch(applyDiscount({ discount: discountAmount, coupon: coupon }));
              dispatch(calculatePrice());
            } else {
              setCouponError("Discount not applicable.");
              setIsValidCoupon(false);
              dispatch(applyDiscount({ discount: 0 }));
              dispatch(calculatePrice());
            }
          })
          .catch((err) => {
            if (err.response) {
              const errorMessage = err.response.data.message;
              switch (errorMessage) {
                case "Invalid Coupon":
                  setIsValidCoupon(false);
                  setCouponError("Invalid Coupon");
                  dispatch(applyDiscount({ discount: 0 }));
                  dispatch(calculatePrice());
                  break;
                case "Coupon Expired":
                  setCouponError("The coupon has expired.");
                  break;
                case "Maximum usage limit reached for this coupon":
                  setCouponError("Maximum usage limit reached for this coupon.");
                  break;
                default:
                  setCouponError("Invalid Coupon");
                  break;
              }
            }
          });
      } catch (error) {
        toast.error("Something went Wrong");
      }
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCoupon(false);
    };
  }, [coupon, dispatch, subTotal]);

  // done
  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  // done
  useEffect(() => {
    dispatch(loadCartFromLocalStorage({ userId: userData?._id }));
  }, [dispatch, userData?._id]);

  // done
  const removeFromCartHandle = (productid) => {
    dispatch(removeFromCart(productid));
    dispatch(removeItemFromLocalStorage({ userId: userData?._id, productid }));
  };

  // done
  const quantityChangeHandler = (product, newQuantity) => {
    if (newQuantity > product.productStock) {
      toast.error("Not enough in stock for that quantity.");
      return;
    }
    dispatch(
      addToCart({
        ...product,
        quantity: newQuantity,
      })
    );
  };

  return (
    <section className="cart">
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
        Cart
      </div>

      <div className="cartHeader">
        <h2>Your Cart</h2>
        <p>
          There are <span style={{ color: "#3bb77e" }}>{cartItems.length}</span> products in your cart
        </p>
      </div>

      <div className="cartItems">
        {cartItems.map((product, index) => (
          <div className="singleItem" key={product.productName + index}>
            <div className="productImg">
              <img src={product.productImage} alt={product.productName} height={200} width={200} />
            </div>
            <div className="productDetails">
              {/* Here Link put link path letter */}
              <div className="productName">
                <Link to={`/product/${product.productId}`} target="_blank">
                  {product.productName}
                </Link>
              </div>
              <div className="productStock">
                {product.productStock > 0 ? <div className="green">Stock: {product.productStock}</div> : <div className="red">Stock Out</div>}
              </div>
              <div className="productDetailWrapper">
                <div className="basicDetails">
                  <div className="productColor">
                    <span>Color:</span> {product.productColor}
                  </div>
                  <div className="productSize">
                    <span>Size:</span> {product.productSize}
                  </div>
                  <div className="productCate">
                    <span>Category:</span> {product.productCategory}
                  </div>
                  <div className="quantity">
                    <span>Qty: </span>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => quantityChangeHandler(product, e.target.value)}
                      onInput={(e) => {
                        e.target.value = Math.abs(e.target.value);
                      }}
                    />
                    <p className="removeItem" title="Remove Item From Cart" onClick={() => removeFromCartHandle(product.productId)}>
                      Delete
                    </p>
                  </div>
                </div>
                <div className="productPrice">
                  <p>Price</p>
                  <span>₹ {product.productPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="checkOutBox">
        <div className="subTotal box">
          <p className="title">Subtotal: </p> <p className="amount">₹{subTotal}</p>
        </div>
        <div className="spgCrg box">
          <p className="title">Shipping Charges: </p> <p className="amount">₹{shippingCharges}</p>
        </div>
        <div className="discount box">
          <p className="title">Discount: </p> <p className="amount">₹{discount}</p>
        </div>
        <div className="total box">
          <p className="title">Total: </p> <p className="amount">₹{total}</p>
        </div>
        <div className="coupon box">
          <input type="text" placeholder="Enter Your Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          {coupon &&
            (isValidCoupon ? (
              <div className="succ green">
                ₹{discount} Off using {coupon} Coupon code
              </div>
            ) : (
              <div className="fail red">{couponError}</div>
            ))}
        </div>
        <Button onClick={() => navigate("/shipping")}>
          Proceed To CheckOut <ShoppingCartCheckoutIcon style={{ fontSize: "3rem" }} />{" "}
        </Button>
      </div>

      <div className="recommend">
        <h2>Recommended deals for you</h2>
        <LatestProducts />
      </div>
    </section>
  );
}

export default Cart;
