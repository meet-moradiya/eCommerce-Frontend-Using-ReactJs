import React from "react";
import { BarChart } from "../../../Components/AdminComponents/Charts";
import AdminSidebar from "../../../Components/AdminComponents/AdminSidebar";
import { useSelector } from "react-redux";
import { useBarQuery } from "../../../Redux/API/dashboardAPI";
import Loading from "../../../Components/Loading/Loading";
import { getLastMonths } from "../../../Utils/Features";
import { Navigate } from "react-router-dom";

function BarCharts() {
  const { lastTwelveMonths } = getLastMonths();
  const { userData } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useBarQuery(userData?._id);

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
        <h1>Bar Charts</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section>
              <BarChart
                data_1={data?.barCharts?.chart1?.revenue}
                data_2={data?.barCharts?.chart1?.profit}
                title_1="Revenue"
                title_2="Profit"
                bgColor_1="#7a9e7e"
                bgColor_2="#31493c"
                labels={lastTwelveMonths}
              />
              <h4>Month Wise Revenue & Total Profit</h4>
            </section>
            <section>
              <BarChart
                data_1={data?.barCharts?.chart2?.order}
                data_2={data?.barCharts?.chart2?.user}
                title_1="Orders"
                title_2="Users"
                bgColor_1="#348aa7"
                bgColor_2=""
                labels={lastTwelveMonths}
                horizontal={true}
              />
              <h4>Orders & users throughout the years</h4>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default BarCharts;
