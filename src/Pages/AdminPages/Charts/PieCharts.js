import WcIcon from "@mui/icons-material/Wc";
import React from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/AdminComponents/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../Components/AdminComponents/Charts";
import Loading from "../../../Components/Loading/Loading";
import { usePieQuery } from "../../../Redux/API/dashboardAPI";
import { Navigate } from "react-router-dom";

function PieCharts() {
  const { userData } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = usePieQuery(userData?._id);

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  const charts = data?.pieCharts;
  const revenueDiatribution = charts?.revenueDiatribution;
  const ageGroups = charts?.ageGroups;

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
        <h1>Pie & Dougnut Charts</h1>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section>
              <div>
                <PieChart
                  titles={["Processing", "Shipped", "Delivered"]}
                  chartData={[charts.fullfillmentRatio.Processing, charts.fullfillmentRatio.Shipped, charts.fullfillmentRatio.Delivered]}
                  bgColor={["#FF3131", "#0FFF50", "#1F51FF"]}
                  offset={[0, 0, 40]}
                />
                <h4>Order fulfillment ratio</h4>
              </div>
            </section>

            <section>
              <div>
                <DoughnutChart
                  titles={charts.categoryData.map((title) => Object.keys(title)[0])}
                  chartData={charts.categoryData.map((title) => Object.values(title)[0])}
                  offset={[25, 30, 40, 30, 35, 40, 30, 35, 25, 30]}
                  displayLegend={false}
                />

                <h4>product categories ratio</h4>
              </div>
            </section>

            <section>
              <div>
                <DoughnutChart
                  titles={["In Stock", "Out of Stock"]}
                  chartData={[charts.stockAvibility.inStock, charts.stockAvibility.stockOut]}
                  bgColor={["#7ae582", "#004e64"]}
                  offset={[20]}
                  cutout={"70%"}
                />
                <h4>Stock availability</h4>
              </div>
            </section>

            <section>
              <div>
                <DoughnutChart
                  titles={["Production Cost", "Discounts", "Total Tax", "Shipping Charges", "Advertising Cost", "Profit"]}
                  chartData={[
                    revenueDiatribution.productionCost,
                    revenueDiatribution.totalDiscount,
                    revenueDiatribution.totalTax,
                    revenueDiatribution.totalShippingCharge,
                    revenueDiatribution.advertisingCost,
                    revenueDiatribution.totalProfit,
                  ]}
                  bgColor={["#1f77b4", "#2ca02c", "#fd9e02", "#2ec4b6", "#d62728", "#a06cd5"]}
                  cutout={"60%"}
                  offset={[0, 0, 0, 0, 0, 30]}
                  displayLegend={false}
                />
                <h4>revenue distribution</h4>
              </div>
            </section>

            <section>
              <div>
                <PieChart
                  titles={["0-18", "19-30", "31-45", "46-60", "61+"]}
                  chartData={[ageGroups.kid, ageGroups.young, ageGroups.adult, ageGroups.middleAged, ageGroups.senior]}
                  bgColor={["#a9d6e5", "#468faf", "#014f86", "#013a63", "#012a4a"]}
                />
                <h4>users age group</h4>
              </div>
            </section>

            <section>
              <div className="doughnutChartComponent">
                <DoughnutChart
                  titles={["Male", "Female"]}
                  chartData={[charts.genderCount.male, charts.genderCount.female]}
                  displayLegend={true}
                  cutout={"60%"}
                />
                <p>
                  <WcIcon
                    style={{
                      color: "#343a40",
                      fontSize: "3rem",
                    }}
                  />
                </p>
              </div>
              <h4>Gender Ratio</h4>
            </section>

            <section>
              <div>
                <DoughnutChart
                  titles={["Admin", "Customers"]}
                  chartData={[charts.userAuth.admins, charts.userAuth.users]}
                  bgColor={["#1b4332", "#4c9f64"]}
                  offset={[30]}
                  cutout={"60%"}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default PieCharts;
