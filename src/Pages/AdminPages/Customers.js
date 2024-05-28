import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import TableHOC from "../../Components/AdminComponents/TableHOC";
import { useSelector } from "react-redux";
import { useGetAllUserQuery } from "../../Redux/API/userAPI";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";

const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Full Name",
    accessor: "full_name",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "DOB",
    accessor: "dob",
  },
];

function Customers() {
  const { userData } = useSelector((state) => state.userReducer);
  const { data, isError } = useGetAllUserQuery(userData?._id);

  const [newUserData, setNewUserData] = useState([]);

  useEffect(() => {
    if (data?.message) {
      toast.success(data?.message);
    }
    if (data) {
      setNewUserData(
        data?.map((user) => ({
          avatar: <img src={user.avatar} alt="custImg" />,
          full_name: user.name,
          role: user.role,
          gender: user.gender ? user.gender : "unset",
          email: user.email,
          phone: user.phone ? user.phone : "unset",
          dob: user.dob ? format(new Date(user.dob), "dd-MM-yyyy") : "00-00-0000",
        }))
      );
    }
  }, [data]);

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  const table = TableHOC(columns, newUserData, "customerBox", "Customers", true, 25);

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
        <div className="customerContainer">{table()}</div>
      </main>
    </div>
  );
}

export default Customers;
