import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { Button } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteOrderMutation, useGetSingleOrderQuery, useUpdateOrderMutation } from "../../../Redux/API/orderAPI";

const defaultData = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
  user: {
    name: "",
    email: "",
    phone: 9999999999,
    _id: "",
  },
  status: "Processing",
  subTotal: 0,
  discount: 0,
  diliveryCharge: 0,
  tax: 0,
  totalAmount: 0,
  orderItems: [],
  _id: "",
  createdAt: "1999-12-31T12:05:58.014Z",
};

function ManageTransaction() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const params = useParams();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.userReducer);

  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();

  const { data } = useGetSingleOrderQuery(params.id);
  const {
    shippingInfo: { address, city, state, country, zipCode },
    orderItems,
    user: { name },
    status,
    subtotal,
    total,
    tax,
    discount,
    shippingCharges,
    createdAt,
    _id,
  } = data?.singleOrder || defaultData;

  const updateStatusHandler = async () => {
    const res = await updateOrder({ userId: userData?._id, orderId: params.id });
    if ("data" in res) {
      toast.success(res.data.message);
      navigate("/admin/transactions");
    } else {
      const error = res.error;
      const errMsg = error.data.message;
      toast.error(errMsg);
    }
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleDeleteProduct = () => {
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const finalDelete = async () => {
    const res = await deleteOrder({ userId: userData?._id, orderId: params.id });
    if ("data" in res) {
      toast.success(res.data.message);
      navigate("/admin/transactions");
    } else {
      const error = res.error;
      const errorMessage = error.data.message;
      toast.error(errorMessage);
    }
  };

  return (
    <section className="transactionPageSection">
      <h1 className="mainlogo">MD MART</h1>
      <h4>Manage Order</h4>
      <div
        className="mainOrderBox"
        style={{
          position: "relative",
        }}
      >
        <div title="Back" onClick={() => navigate("/admin/transactions")}>
          <ChevronLeftRoundedIcon
            style={{
              fontSize: "5rem",
              color: "#343a40",
              position: "absolute",
              right: "1rem",
              cursor: "pointer",
            }}
          />
        </div>
        <h4>Order Items</h4>
        <div className="orderItemCard">
          {orderItems.map((product) => (
            <div className="orderCard" key={product._id}>
              <img src={product.productImage} alt="productImg" height={140} />
              <div className="tempOrderDetail">
                <div className="tempNameBox" onClick={() => window.open(`/product/${product.productId}`, "_blank")} style={{ cursor: "pointer" }}>
                  {product.productName}
                </div>
                <p>Category: {product.productCategory}</p>
                <p>Size: {product.productSize}</p>
                <p>Product Id: {product._id}</p>
              </div>
              <span>
                ₹{product.productPrice} X {product.quantity} = ₹{product.productPrice * product.quantity}{" "}
              </span>
            </div>
          ))}
        </div>
        <h4>order detail</h4>
        <div className="orderDetail">
          <div className="orderDate">
            <h5>Order date</h5>
            <p>{format(new Date(createdAt), "dd-MM-yyyy")}</p>
            <button
              style={{
                marginLeft: 0,
              }}
              onClick={handleDeleteProduct}
            >
              Cancel Order
            </button>
          </div>
          <div className="customerDetail">
            <h5>Order details</h5>
            <p>
              <span>Buyer name: </span>
              {name}
            </p>
            <p>
              <span>Order Id: </span>
              {_id}
            </p>
            <p className="addressClass">
              <span>Address: </span>
              {`${address}, ${city}, ${state}, ${country}`}
            </p>
            <p>
              <span>Pin Code: </span>
              {zipCode}
            </p>
          </div>
          <div className="amountInfo">
            <h5>Amount Info</h5>
            <p>
              <span>Subtotal: ₹</span>
              {subtotal}{" "}
            </p>
            <p>
              <span>Shipping CHarges: ₹</span>
              {shippingCharges}{" "}
            </p>
            <p>
              <span>Tax: ₹</span>
              {tax}{" "}
            </p>
            <p>
              <span>Discount: ₹</span>
              {discount}{" "}
            </p>
            <p>
              <span>Total: ₹</span>
              {total}{" "}
            </p>
          </div>
          <div className="statusInfo">
            <h5>Order Status</h5>

            <p>
              <span>Status: </span>
              <strong className={status === "Delivered" ? "blue orderStatus" : status === "Shipped" ? "green orderStatus" : "red orderStatus"}>
                {status}
              </strong>
            </p>
            <button onClick={updateStatusHandler} disabled={status === "Delivered"}>
              Update Status
            </button>
            <br />
            <button>Print Label</button>
          </div>
        </div>
      </div>
      <div className={`deletePopup ${showDeletePopup ? "show" : ""}`}>
        <p className="pNameP">
          <strong>Product Id: </strong>
          {_id}
        </p>
        <p className="msgP">
          Are you sure?
          <br /> Order will be cancel and after you will not able to ship?
        </p>
        <div className="deleteP">
          <Button className="cancelP" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button className="deleteBP" onClick={finalDelete}>
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}
export default ManageTransaction;
