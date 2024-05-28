// admin routes importing
import {
  BarCharts,
  Coupon,
  Customers,
  Dashboard,
  LineCharts,
  ManageProduct,
  ManageTransaction,
  NewProduct,
  PieCharts,
  Products,
  Transactions,
} from "./Pages/AdminPages/index";

// ####################################################################

import { Suspense, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Components/Loading/Loading";
import ProtectedRoute from "./Components/ProtectedRoute";
import Footer from "./Components/UserComponents/Footer";
import Header from "./Components/UserComponents/Header";
import Checkout from "./Pages/UserPages/Checkout";
import { Account, Cart, Home, Login, Search, Shipping, SignUp } from "./Pages/UserPages/index";
import { userExist } from "./Redux/Reducer/userReducer";
import SingleProduct from "./Pages/UserPages/SingleProduct";
import SingleOrder from "./Pages/UserPages/SingleOrder";
import Contact from "./Pages/UserPages/Contact";
import About from "./Pages/UserPages/About";
import PrivacyPolicy from "./Pages/UserPages/PrivacyPolicy";
import Deals from "./Pages/UserPages/Deals";
import Developer from "./Pages/UserPages/Developer";
import Review from "./Pages/UserPages/Review";
import Follow from "./Pages/UserPages/Follow";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  // for authenticate the user
  let { userData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // Check if user data exists in local storage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch(userExist(userData));
    }
    setLoading(false);
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      {/* Header  */}
      <Header />

      {/* here suspense is use for while page is loading then show loading component. */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/order/:id" element={<SingleOrder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/latest" element={<Deals />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/follow" element={<Follow />} />

          {/* Not Logged In Route */}
          <Route element={<ProtectedRoute isAuthenticated={userData ? false : true} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Login Required */}
          <Route element={<ProtectedRoute isAuthenticated={userData ? true : false} redirect="/login" />}>
            <Route path="/account" element={<Account />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/pay" element={<Checkout />} />
            <Route path="product/:id/review" element={<Review />} />
          </Route>

          {/* #################################################################### */}

          {/* Admin Dashboard Routes */}
          {/* main */}
          <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={userData?.role === "admin" ? true : false} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/transactions" element={<Transactions />} />

            {/* charts */}
            <Route path="/admin/charts/bar" element={<BarCharts />} />
            <Route path="/admin/charts/pie" element={<PieCharts />} />
            <Route path="/admin/charts/line" element={<LineCharts />} />

            {/* apps */}
            <Route path="/admin/apps/coupon-generator" element={<Coupon />} />

            {/* manage */}
            <Route path="/admin/products/add-product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ManageProduct />} />
            <Route path="/admin/transactions/:id" element={<ManageTransaction />} />
          </Route>
        </Routes>
      </Suspense>

      {/* footer */}
      <Footer />

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;

// ################################################################
