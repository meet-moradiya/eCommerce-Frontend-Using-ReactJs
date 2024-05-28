import React from "react";
import { LineChart } from "../../../Components/AdminComponents/Charts";
import AdminSidebar from "../../../Components/AdminComponents/AdminSidebar";
import { useSelector } from "react-redux";
import { useLineQuery } from "../../../Redux/API/dashboardAPI";
import Loading from "../../../Components/Loading/Loading";
import { getLastMonths } from "../../../Utils/Features";
import { Navigate } from "react-router-dom";

function LineCharts() {
  const { lastTwelveMonths } = getLastMonths();

  const { userData } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useLineQuery(userData?._id);

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className="adminContainer">
      <div className="sideNavBar">
        <AdminSidebar />
      </div>
      <main className="chartContainer">
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
        <h1>Line Charts</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section>
              <LineChart lineData={data.lineChart.activeUser} title="Users" backColor="#573280" labels={lastTwelveMonths} />
              <h4>Active users</h4>
            </section>

            <section>
              <LineChart lineData={data.lineChart.totalProducts} title="Total Products" backColor="#721817" labels={lastTwelveMonths} />
              <h4>total products (SKU)</h4>
            </section>

            <section>
              <LineChart lineData={data.lineChart.totalRevenue} title="Total Revenue" backColor="#0b6e4f" labels={lastTwelveMonths} />
              <h4>total revenue</h4>
            </section>

            <section>
              <LineChart lineData={data.lineChart.totalDiscount} title="Discount Alloted" backColor="#2e1c2b" labels={lastTwelveMonths} />
              <h4>discount alloted</h4>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default LineCharts;
