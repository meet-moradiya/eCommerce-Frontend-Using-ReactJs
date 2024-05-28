import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddReviewMutation } from "../../Redux/API/reviewAPI";
import LatestProducts from "../../Components/UserComponents/LatestProducts";

// other styling importing
import { Button } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useSelector } from "react-redux";

function Review() {
  const navigate = useNavigate();
  const params = useParams();
  const [myError, setMyError] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { userData } = useSelector((state) => state.userReducer);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // handle form submit
  const [addReview] = useAddReviewMutation();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (rating === 0 || review.trim() === "") {
      toast.error("Please provide both rating and review.");
    } else {
      const reviewObj = {
        productId: params.id,
        user: userData?._id,
        productRating: rating,
        productReview: review,
      };

      try {
        const res = await addReview(reviewObj);
        if ("data" in res) {
          toast.success(res.data.message);
          navigate(`/product/${params.id}`);
        } else {
          const error = res.error.data;
          const errMsg = error.message || "Internal Server Error!";
          toast.error(errMsg);
          setMyError(
            <span>
              Refer to our{" "}
              <strong style={{ cursor: "pointer" }} onClick={() => navigate("/privacy-policy")}>
                Privacy & Policy
              </strong>{" "}
              for guidelines on submitting reviews.
            </span>
          );
        }
      } catch (error) {
        console.log("Error:", error);

        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
  };

  return (
    <>
      <div className="pageNavigation">
        <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${params.id}`)}>
          Product
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        Review
      </div>

      <div className="reviewFormDiv">
        <form onSubmit={handleFormSubmit} className="reviewForm">
          <h2>Product Review & Rating</h2>
          <div className="starRatingInput">
            <Rate className="antRate" value={rating} onChange={(value) => setRating(value)} />
          </div>
          <div className="productReviewInput">
            <textarea
              rows="10"
              placeholder="Share your experience and thoughts about the product here."
              value={review}
              onChange={(event) => setReview(event.target.value)}
            ></textarea>
          </div>
          {myError && <p style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: "500", color: "#ff0000" }}>{myError}</p>}
          <div className="reviewSubmitButton">
            <Button onClick={() => navigate(`/product/${params.id}`)}>Back</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>

      <div className="productLatestProduct">
        <h2>New Arrival</h2>
        <LatestProducts />
      </div>
    </>
  );
}

export default Review;
