import { format } from "date-fns";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useGetSingleOrderQuery } from "../../Redux/API/orderAPI";

function SingleOrder() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleOrderQuery(params.id);
  const singleOrder = data?.singleOrder;

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <section className="userOrderSection">
        {singleOrder.orderItems.map((order) => (
          <div className="orderedItems" key={order._id}>
            <div className="orderedItemImgaes">
              <img src={order.productImage} alt={order._id} width={200} />
            </div>
            <div className="orderedItemDetails">
              <div className="orderProductName" onClick={() => navigate(`/product/${order.productId}`)}>
                {order.productName}
              </div>
              <div className="orderProductBrand">
                By, <strong> {order.productBrand}</strong>
              </div>
              <div className="orderProductSize">
                Size: <strong>{order.productSize}</strong>
              </div>
              <div className="orderProductPrice">
                Price: <strong>{order.productPrice}</strong>
              </div>
              <div className="orderProductQty">
                Quantity: <strong>{order.quantity}</strong>
              </div>
              <div className="orderProductTotalPrice">
                Total Price: <strong>{order.productPrice * order.quantity}</strong>
              </div>
            </div>
          </div>
        ))}

        <div className="checkOutBox">
          <div className="orderDate box">
            <p className="title">Date: </p> <p className="amount">{format(new Date(singleOrder.createdAt), "dd-MM-yyyy")}</p>
          </div>
          <div className="subTotal box">
            <p className="title">Subtotal: </p> <p className="amount">₹{singleOrder.subtotal}</p>
          </div>
          <div className="spgCrg box">
            <p className="title">Shipping Charges: </p> <p className="amount">₹{singleOrder.shippingCharges}</p>
          </div>
          <div className="tax box">
            <p className="title">Tax: </p> <p className="amount">₹{singleOrder.tax}</p>
          </div>
          <div className="discount box">
            <p className="title">Discount: </p> <p className="amount">₹{singleOrder.discount}</p>
          </div>
          <div className="total box">
            <p className="title">total: </p> <p className="amount">₹{singleOrder.total}</p>
          </div>
          <div className="orderStatus box">
            <p className="title">Status: </p>{" "}
            <p className={`amount ${singleOrder.status === "Processing" ? "red" : singleOrder.status === "Shipped" ? "blue" : "green"}`}>
              {singleOrder.status}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default SingleOrder;
