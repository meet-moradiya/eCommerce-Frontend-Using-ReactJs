import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import TableHOC from "../../Components/AdminComponents/TableHOC";
import { useAdminAllProductsQuery } from "../../Redux/API/productAPI";
import { Button } from "@mui/material";

const columns = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Product ID",
    accessor: "productID",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

function Products() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.userReducer);
  const { data, isError } = useAdminAllProductsQuery(userData._id);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data)
      setProducts(
        data.products.map((product) => ({
          photo: <img src={product.mainImage} alt={product.productName} />,
          name: product.productName,
          productID: product._id,
          price: product.price,
          stock: product.stock,
          action: (
            <Button className="ManageBtn" onClick={() => navigate(`/admin/product/${product._id}`)}>
              Manage
            </Button>
          ),
        }))
      );
  }, [data, navigate]);

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  const table = TableHOC(columns, products, "productBox", "Products", true, 25);
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
        <div className="productContainer">
          {table()}
          <Link to={"/admin/products/add-product"} className="addProductBtn" title="Add New Product">
            <ControlPointRoundedIcon
              style={{
                fontSize: "4rem",
                color: "#343a40",
              }}
            />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Products;
