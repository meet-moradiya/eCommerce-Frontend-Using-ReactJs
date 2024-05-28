import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../../Firebase";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useGetSingleUserQuery, useUpdateUserInfoMutation, useDeleteAccountMutation } from "../../Redux/API/userAPI";
import { userNotExist } from "../../Redux/Reducer/userReducer";
import { useMyOrdersQuery } from "../../Redux/API/orderAPI";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Button } from "@mui/material";
import loadingGif from "../../Assets/images/loading.gif";

const CustomComponent = ({ children }) => {
  return <div>{children}</div>;
};

const DashboardContent = () => {
  const navigate = useNavigate();

  // here we have already userdata in our redux
  const { userData } = useSelector((state) => state.userReducer);

  // but here we call userdata through api for more practice
  const { data } = useGetSingleUserQuery(userData._id);

  const handleDashboardClick = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="dashboardContent">
      {data?.role === "admin" ? (
        <>
          <h3>Hello Admin!</h3>
          <p>
            From your account dashboard, you can easily access{" "}
            <strong
              onClick={handleDashboardClick}
              style={{
                fontWeight: 800,
                fontSize: "1.6rem",
                cursor: "pointer",
                color: "#3bb77e",
              }}
            >
              Admin Dashboard
            </strong>{" "}
            where you can check and view your recent orders.
          </p>
          <Button className="goAdminBtn" onClick={handleDashboardClick}>
            Go to Dashboard
          </Button>
        </>
      ) : (
        <>
          <h3>
            Welcome, <strong style={{ color: "#3bb77e" }}>{data?.name}!</strong>
          </h3>
          <p>
            From your account dashboard. you can easily check & view your <strong style={{ color: "#3bb77e" }}>recent orders,</strong> manage your{" "}
            <strong style={{ color: "#3bb77e" }}>shipping and billing addresses</strong> and{" "}
            <strong style={{ color: "#3bb77e" }}>edit your password and account details.</strong>
          </p>
        </>
      )}
    </div>
  );
};

const OrderContent = () => {
  const { userData } = useSelector((state) => state.userReducer);
  const { data, isLoading } = useMyOrdersQuery(userData?._id);
  const navigate = useNavigate();

  return (
    <div className="orderContent">
      <h3>Your Orders</h3>
      {isLoading ? (
        <div className="orderLoading">
          <img src={loadingGif} alt="order" />
        </div>
      ) : data?.orders?.length > 0 ? (
        <>
          <table>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
            {data?.orders.map((order, index) => (
              <tr key={index}>
                <td className="orderId" onClick={() => navigate(`/order/${order._id}`)}>
                  {order._id}
                </td>
                <td>{format(new Date(order.createdAt), "dd-MM-yyyy")}</td>
                <td className={order.status === "Processing" ? "red" : order.status === "Shipped" ? "blue" : "green"}>{order.status}</td>
                <td>{order.total}</td>
              </tr>
            ))}
          </table>
        </>
      ) : (
        <>
          <p>Looks like your order history is as empty as a shopping cart in a ghost town! Ready to fill it up with some awesome goodies?</p>
        </>
      )}
    </div>
  );
};

const AddressContent = () => {
  const { userData } = useSelector((state) => state.userReducer);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    zipCode: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    const addData = JSON.parse(localStorage.getItem(`address_of_${userData?._id}`));
    if (addData) {
      setShippingInfo({
        firstName: addData.firstName,
        lastName: addData.lastName,
        address: addData.address,
        country: addData.country,
        zipCode: addData.zipCode,
        city: addData.city,
        state: addData.state,
      });
    }
  }, [userData?._id]);

  const changeHandler = (e) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateHandler = () => {
    localStorage.setItem(`address_of_${userData?._id}`, JSON.stringify(shippingInfo));
    toast.success("User Info Updated");
  };

  return (
    <div className="addressContent">
      <h3>Address</h3>
      <div className="form">
        <div className="fields fields--2">
          <label className="field">
            <span className="field__label" htmlFor="firstname">
              First name
            </span>
            <input className="field__input" type="text" id="firstname" name="firstName" value={shippingInfo.firstName} onChange={changeHandler} />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="lastname">
              Last name
            </span>
            <input className="field__input" type="text" id="lastname" name="lastName" value={shippingInfo.lastName} onChange={changeHandler} />
          </label>
        </div>
        <label className="field">
          <span className="field__label" htmlFor="address">
            Address
          </span>
          <input className="field__input" type="text" id="address" name="address" value={shippingInfo.address} onChange={changeHandler} />
        </label>
        <label className="field">
          <span className="field__label" htmlFor="country">
            Country
          </span>
          <select className="field__input" id="country" name="country" value={shippingInfo.country} onChange={changeHandler}>
            <option value=""></option>
            <option value="india">India</option> {/* Fixed the value here */}
          </select>
        </label>
        <div className="fields fields--3">
          <label className="field">
            <span className="field__label" htmlFor="zipcode">
              Zip code
            </span>
            <input className="field__input" type="text" id="zipcode" name="zipCode" value={shippingInfo.zipCode} onChange={changeHandler} />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="city">
              City
            </span>
            <input className="field__input" type="text" id="city" name="city" value={shippingInfo.city} onChange={changeHandler} />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="state">
              State
            </span>
            <input className="field__input" type="text" id="state" name="state" value={shippingInfo.state} onChange={changeHandler} />
          </label>
        </div>
      </div>
      <div className="addbtn">
        <Button onClick={updateHandler}>Update</Button>
      </div>
    </div>
  );
};

const UserInfoContent = () => {
  const { userData } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  const [deleteAccount] = useDeleteAccountMutation();

  // done
  const finalDelete = async () => {
    // deleting account from firebase
    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      toast.error("Failed to delete user from Firebase");
    }
    // deleting account from database (mongodb)
    const res = await deleteAccount(userData._id);
    if ("data" in res) {
      toast.success(res.data.message);
      dispatch(userNotExist());

      // Clear user data from local storage
      localStorage.removeItem("userData");
      localStorage.removeItem(`address_of_${userData?._id}`);
      navigate("/");
    } else {
      const error = res.error;
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  const { data } = useGetSingleUserQuery(userData._id);

  const [updateUserInfo] = useUpdateUserInfoMutation();

  // done
  useEffect(() => {
    if (data) {
      const dobDate = new Date(data.dob);
      setUserInfo({
        firstName: data.name.split(" ")[0],
        lastName: data.name.split(" ")[1],
        phone: data.phone,
        gender: data.gender,
        dob: !isNaN(dobDate) ? dobDate.toISOString().split("T")[0] : "",
      });
    }
  }, [data]);

  const changeHandler = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // done
  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();

    let updatedUserInfo = {
      name: userInfo.firstName + " " + userInfo.lastName,
      phone: userInfo.phone,
      gender: userInfo.gender,
      dob: userInfo.dob,
    };

    const res = await updateUserInfo({ id: userData._id, userInfo: updatedUserInfo });

    if ("data" in res) {
      localStorage.setItem("userData", JSON.stringify(res.data.user));
      toast.success(res.data.message);
    } else {
      const error = res.error;
      const errmsg = error.message;
      toast.error(errmsg);
    }
  };

  return (
    <div className="userInfoContent">
      <h3>Account Details</h3>
      <div className="accountEmail">
        <strong>Account: </strong>
        {userData.email}
      </div>
      <form onSubmit={handleUserInfoSubmit} className="form">
        <div className="fields fields--2">
          <label className="field">
            <span className="field__label" htmlFor="firstname">
              First name
            </span>
            <input className="field__input" type="text" id="firstname" name="firstName" value={userInfo.firstName} onChange={changeHandler} />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="lastname">
              Last name
            </span>
            <input className="field__input" type="text" id="lastname" name="lastName" value={userInfo.lastName} onChange={changeHandler} />
          </label>
        </div>
        <div className="fields fields--3">
          <label className="field">
            <span className="field__label" htmlFor="phone">
              Phone
            </span>
            <input className="field__input" type="number" id="phone" name="phone" maxLength={10} value={userInfo.phone} onChange={changeHandler} />
          </label>
          <label className="field">
            <span className="field__label" htmlFor="gender">
              Gender
            </span>
            <select className="field__input" id="gender" name="gender" value={userInfo.gender} onChange={changeHandler}>
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="field">
            <span className="field__label" htmlFor="dob">
              DOB
            </span>
            <input className="field__input" type="date" id="dob" name="dob" value={userInfo.dob} onChange={changeHandler} />
          </label>
        </div>
        <div className="addbtn">
          <Button type="submit">Save Changes</Button>
          <div className="dltAccount">
            <Button onClick={handleDeleteAccount}>
              Delete Account
              <DeleteRoundedIcon
                style={{
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </Button>
          </div>
        </div>
      </form>
      <div className={`deletePopup ${showDeletePopup ? "show" : ""}`}>
        <p className="msgP">
          Are you sure?
          <br /> Your Account <strong style={{ fontWeight: 800, fontSize: "2rem" }}>{userData.email}</strong> will be deleted permanently?
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
    </div>
  );
};

function Account() {
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);

      // Clear user data from local storage
      localStorage.removeItem("userData");
      dispatch(userNotExist());
      toast.success("Sign Out Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  let content;
  switch (selectedOption) {
    case "dashboard":
      content = <DashboardContent />;
      break;
    case "orders":
      content = <OrderContent />;
      break;
    case "address":
      content = <AddressContent />;
      break;
    case "details":
      content = <UserInfoContent />;
      break;
    default:
      content = <DashboardContent />;
  }

  return (
    <>
      <div className="pageNavigation">
        <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        Account
      </div>

      <section className="accountPage">
        <aside>
          <ul>
            <li onClick={() => handleOptionClick("dashboard")} className={selectedOption === "dashboard" ? "active" : ""}>
              <TuneRoundedIcon style={{ fontSize: "2.6rem", marginRight: "1rem", color: "#586f7c" }} /> Dashboard
            </li>
            <li onClick={() => handleOptionClick("orders")} className={selectedOption === "orders" ? "active" : ""}>
              <ShoppingBagOutlinedIcon style={{ fontSize: "2.6rem", marginRight: "1rem", color: "#586f7c" }} /> My Orders
            </li>
            <li onClick={() => handleOptionClick("address")} className={selectedOption === "address" ? "active" : ""}>
              <FmdGoodOutlinedIcon style={{ fontSize: "2.6rem", marginRight: "1rem", color: "#586f7c" }} /> My Address
            </li>
            <li onClick={() => handleOptionClick("details")} className={selectedOption === "details" ? "active" : ""}>
              <PermIdentityRoundedIcon style={{ fontSize: "2.6rem", marginRight: "1rem", color: "#586f7c" }} /> Account Details
            </li>
            <li onClick={() => logoutHandler()}>
              <LogoutIcon style={{ fontSize: "2.6rem", marginRight: "1rem", color: "#586f7c" }} />
              Logout
            </li>
          </ul>
        </aside>

        <div className="accountContent">
          <CustomComponent>{content}</CustomComponent>
        </div>
      </section>
    </>
  );
}

export default Account;
