import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import { useAllCouponsQuery, useDeleteCouponMutation, useNewCouponMutation } from "../../Redux/API/couponAPI";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";

function Coupon() {
  const [prefix, setPrefix] = useState("");
  const [size, setSize] = useState(8);
  const [numberInclude, setNumberInclude] = useState(false);
  const [charInclude, setCharInclude] = useState(false);
  const [symbolInclude, setSymbolInclude] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [generateClicked, setGenerateClicked] = useState(false);
  const [maxUsage, setMaxUsage] = useState(null);
  const [expiryDate, setExpiryDate] = useState("");

  const { userData } = useSelector((state) => state.userReducer);

  const generateCoupon = (e) => {
    e.preventDefault();
    setGenerateClicked(true);

    if (!numberInclude && !charInclude && !symbolInclude) return alert("Please Select One At Least From (Numbers, Character, Symbol) ");

    let newCoupon = "";
    let str = "";
    if (numberInclude) str += "0123456789";
    if (charInclude) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (symbolInclude) str += "!@#$&_";

    const loopLength = size - prefix.length;

    for (let i = 0; i < loopLength; i++) {
      let char = Math.floor(Math.random() * str.length);
      newCoupon += str.charAt(char);
    }
    setCoupon(prefix + newCoupon);
  };

  const copyText = (coupon) => {
    window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  useEffect(() => {
    setIsCopied(false);
    setGenerateClicked(false);
  }, [generateClicked]);

  // get all coupon through api
  const { data, isLoading, isError } = useAllCouponsQuery(userData?._id);

  // create new coupon code
  const [finalCouponCode, setFinalCouponCode] = useState();
  const [couponAmount, setCouponAmount] = useState();
  const [newCoupon] = useNewCouponMutation();

  const createNewCoupon = async () => {
    // create object for create new coupon
    if (!finalCouponCode || !couponAmount || !maxUsage || !expiryDate) {
      // Check for maxUsage and expiryDate
      return toast.error("Please fill all fields for create new Coupon.");
    }

    const couponDetail = {
      couponCode: finalCouponCode,
      couponAmount: couponAmount,
      maxUsage: maxUsage,
      expireDate: expiryDate,
    };

    try {
      const res = await newCoupon({ userId: userData?._id, couponDetails: couponDetail });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const err = res.data.error;
        const errmsg = err.message;
        toast.error(errmsg);
      }
    } catch (error) {
      toast.error("Some Internal Error Occur!");
    }
  };

  // delete coupon
  const [deleteCoupon] = useDeleteCouponMutation();
  const deleteCouponHandler = async (couponId) => {
    const res = await deleteCoupon({ userId: userData?._id, couponId: couponId });

    if ("data" in res) {
      toast.success(res.data.message);
    } else {
      const err = res.data.error;
      const errmsg = err.message;
      toast.error(errmsg);
    }
  };

  if (isError) return <Navigate to={"/admin/dashboard"} />;

  return (
    <div className="adminContainer">
      <div className="sideNavBar">
        <AdminSidebar />
      </div>
      <main className="couponContainer">
        <div id="mainlogo" style={{ display: "none", textAlign: "center", fontSize: "3rem", fontWeight: "700" }}>
          MD MART
        </div>
        <h1>Generate Coupon</h1>
        <section className="couponSection">
          <form onSubmit={generateCoupon} className="couponForm">
            <p style={{ fontSize: "1.4rem", marginBottom: "1.6rem" }}>
              You can generate coupon codes here, which can be used to create actual coupons with specific amounts whenever needed.
            </p>
            <div className="couponInput">
              <input
                type="text"
                placeholder="Text to include"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                maxLength={size}
                title="Write Prefix for your coupon."
              />
              <input
                type="number"
                placeholder="Coupon length"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min={8}
                max={49}
                onInput={(e) => {
                  e.target.value = Math.abs(e.target.value);
                }}
                title="Select the size of the coupon."
              />
            </div>
            <fieldset>
              <legend>Include</legend>
              <div>
                <input type="checkbox" checked={numberInclude} onChange={() => setNumberInclude((prev) => !prev)} /> <span>Numbers</span>
              </div>
              <div>
                <input type="checkbox" checked={charInclude} onChange={() => setCharInclude((prev) => !prev)} /> <span>Characters</span>
              </div>
              <div>
                <input type="checkbox" checked={symbolInclude} onChange={() => setSymbolInclude((prev) => !prev)} /> <span>Symbols</span>
              </div>
            </fieldset>
            <button type="submit">Generate</button>
          </form>
          {coupon && (
            <code>
              {coupon}{" "}
              <p onClick={() => copyText(coupon)}>
                {" "}
                <span> {isCopied ? "Copied" : "Copy"} </span>
              </p>
            </code>
          )}
        </section>

        <section className="generateCouponSection">
          <h2>Create New Coupon</h2>
          <div className="generateNewCoupon">
            <input type="text" placeholder="Coupon Code" onChange={(e) => setFinalCouponCode(e.target.value)} />
            <input type="number" placeholder="Coupon Amount" onChange={(e) => setCouponAmount(e.target.value)} />
            <input type="number" placeholder="Max Usage" onChange={(e) => setMaxUsage(e.target.value)} /> {/* New input for max usage */}
            <input type="date" placeholder="Expiry Date" onChange={(e) => setExpiryDate(e.target.value)} /> {/* New input for expiry date */}
            <Button onClick={createNewCoupon}>Create Coupon</Button>
          </div>
        </section>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section className="allCouponSection">
              <h2>All Active Coupons</h2>
              <div className="allCouponDiv">
                <table className="couponTable">
                  <thead>
                    <tr>
                      <th>Coupon Code</th>
                      <th>Discount Amount</th>
                      <th>Max Uses</th>
                      <th>Total Uses</th>
                      <th>Expiry Date</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.allCoupons?.map((oneCoupon, index) => (
                      <tr key={index}>
                        <td>{oneCoupon.couponCode}</td>
                        <td>{oneCoupon.couponAmount}</td>
                        <td>{oneCoupon.maxUsage}</td>
                        <td>{oneCoupon.usedCount}</td>
                        <td>{format(new Date(oneCoupon.expireDate), "dd-MM-yyyy")}</td>
                        <td>
                          <span style={{ cursor: "pointer" }} className="red" onClick={() => deleteCouponHandler(oneCoupon._id)}>
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Coupon;
