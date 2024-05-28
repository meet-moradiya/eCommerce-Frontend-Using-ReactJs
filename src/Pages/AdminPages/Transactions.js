import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import TableHOC from "../../Components/AdminComponents/TableHOC";
import { useAllOrdersQuery } from "../../Redux/API/orderAPI";
import { Button } from "@mui/material";

const columns = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Shipping",
    accessor: "shipping",
  },
  {
    Header: "Order Date",
    accessor: "orderDate",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

function Transactions() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.userReducer);
  const { data, isError } = useAllOrdersQuery(userData?._id);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
    if (data) {
      setOrders(
        data?.orders?.map((order) => ({
          user: order.user.name ? order.user.name : "User Deleted",
          shipping:
            order.shippingInfo.city + ", " + order.shippingInfo.state ? order.shippingInfo.city + ", " + order.shippingInfo.state : "User Deleted",
          orderDate: order.createdAt ? format(new Date(order.createdAt), "dd-MM-yyyy") : "01-01-0001",
          amount: order.total,
          discount: order.discount,
          quantity: order.orderItems.length,
          stock: order.stock,
          status: <span className={order.status === "Processing" ? "red" : order.status === "Shipped" ? "green" : "blue"}>{order.status}</span>,
          action: (
            <Button className="ManageBtn" onClick={() => navigate(`/admin/transactions/${order._id}`)}>
              Manage
            </Button>
          ),
        }))
      );
    }
  }, [data, navigate]);

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  const Table = TableHOC(columns, orders, "orderBox", "Orders", true, 6);

  return (
    <div className="adminContainer">
      <div className="sideNavBar">
        <AdminSidebar />
      </div>
      <main className="dashboard">
        <div
          id="mainlogo"
          style={{
            display: "none",
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "700",
          }}
        >
          MD MART
        </div>
        <div className="orderContainer">{Table()}</div>
      </main>
    </div>
  );
}

export default Transactions;
