import React from "react";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import { BarChart } from "../../Components/AdminComponents/Charts";
import DashboardTable from "../../Components/AdminComponents/DashboardTable";
import Loading from "../../Components/Loading/Loading";
import { useStatsQuery } from "../../Redux/API/dashboardAPI";
import { useMakeAdminMutation } from "../../Redux/API/userAPI";
import { getLastMonths } from "../../Utils/Features";

// ############################################################################################
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // random color generator function
  function randomBrightAndDarkColor() {
    var hue = Math.floor(Math.random() * 361);
    var saturation = Math.floor(Math.random() * 51) + 50;
    var brightness = Math.floor(Math.random() * 51) + 20;
    var hslColor = "hsl(" + hue + ", " + saturation + "%, " + brightness + "%";

    return hslColor;
  }
  const colors = ["#ef476f", "#1b9aaa", "#06d6a0", "#ffc43d"];

  // get last six months:
  const { lastSevenMonths } = getLastMonths();

  const { userData } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useStatsQuery(userData?._id);
  const [makeAdmin] = useMakeAdminMutation();

  const makeAdminHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const res = await makeAdmin({ userId: userData?._id, email });

    // check for error
    if ("data" in res) {
      toast.success(res.data.message);
    } else {
      const error = res.error;
      const errorMessage = error.data.message;
      toast.error(errorMessage);
    }
  };

  const stats = data?.stats;

  let headersAndValues = [];
  if (!isLoading) {
    headersAndValues = Object.entries(stats.count).map(([header, value], index) => ({
      header,
      value,
      change: stats.changePercent[header],
      color: colors[index % colors.length],
    }));
  }

  if (isError) return <Navigate to={"/"} />;

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

        <div className="bar">
          <ManageSearchRoundedIcon
            style={{
              color: "#343a40",
              fontSize: "3rem",
            }}
          />
          <input type="text" placeholder="Search" />
          <NotificationsNoneRoundedIcon
            style={{
              color: "#343a40",
              fontSize: "2.8rem",
              cursor: "pointer",
            }}
          />
          <PersonRoundedIcon
            onClick={() => navigate("/account")}
            style={{
              color: "#343a40",
              fontSize: "2.6rem",
              border: "2px solid #343a40",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section className="widgetContainer">
              {headersAndValues.map((item) => (
                <article className="widget" key={item.header}>
                  <div className="widgetInfo">
                    <p>{item.header}</p>
                    {item.value ? <h4>{item.header === "revenue" ? `₹${item.value}` : item.value}</h4> : <h4>{item.value}</h4>}
                    {item.change > 0 ? (
                      <span>
                        <TrendingUpRoundedIcon
                          style={{
                            color: "#06d6a0",
                            fontSize: "2rem",
                          }}
                        />{" "}
                        +{item.change}%
                      </span>
                    ) : (
                      <span>
                        <TrendingDownRoundedIcon
                          style={{
                            color: "#ef476f",
                            fontSize: "2rem",
                          }}
                        />{" "}
                        -{item.change}%
                      </span>
                    )}
                  </div>
                  <div
                    className="widgetCircle"
                    style={{
                      background: `
                  conic-gradient(${item.color} ${(Math.abs(item.change) / 100) * 360}deg, rgb(255,255,255) 0)
                  `,
                    }}
                  >
                    <span color={item.color}>{item.change}%</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="graphContainer">
              <div className="revenueChart">
                <h4>Monthly Total Orders & Users </h4>
                <BarChart
                  data_1={stats.chart.order}
                  data_2={stats.chart.user}
                  title_1="Orders"
                  title_2="Users"
                  bgColor_1="#48cae4"
                  bgColor_2="#0077b6"
                  labels={lastSevenMonths}
                />
              </div>
            </section>

            <section className="makeAdminContainer">
              <h4>Make New Admin</h4>
              <form onSubmit={makeAdminHandler}>
                <div className="makeAdmin">
                  <input id="email" type="email" placeholder="Email for make Admin..." name="email" required />
                  <Button type="submit">Make Admin</Button>
                </div>
              </form>
            </section>

            <section className="categoriesChart">
              <h4>Categories</h4>
              <div className="flexForCategoryChart">
                {stats.categoryData.map((item) => {
                  const [cate] = Object.entries(item);
                  return (
                    <div className="categoryItems" key={cate[0]}>
                      <h4>{cate[0]}</h4>
                      <div className="bgDiv">
                        <div
                          style={{
                            backgroundColor: randomBrightAndDarkColor(),
                            width: `${cate[1]}%`,
                          }}
                        ></div>
                      </div>
                      <span>{`${cate[1]}%`}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="transactionContainer">
              <div className="transactionChart">
                <DashboardTable data={stats.newOrders} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
