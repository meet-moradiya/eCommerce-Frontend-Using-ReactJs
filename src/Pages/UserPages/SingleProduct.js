// css files for slider and image zoom
import "custom-react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// file and module import
import InnerImageZoom from "custom-react-inner-image-zoom";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useGetSingleProductQuery } from "../../Redux/API/productAPI";
import { useAllReviewQuery, useDeleteReviewMutation } from "../../Redux/API/reviewAPI";
import Slider from "react-slick";
import LatestProduct from "../../Components/UserComponents/LatestProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Reducer/cartReducer";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Rate } from "antd";

// icon and image input
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Button } from "@mui/material";

function SingleProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [zoomImg, setZoomImg] = useState();

  const { userData } = useSelector((state) => state.userReducer);

  // zoom image setting
  const { data, isLoading } = useGetSingleProductQuery(params.id);
  const productImgs = [];

  useEffect(() => {
    setZoomImg(data?.singleProduct?.mainImage);
  }, [data?.singleProduct?.mainImage]);

  if (data) {
    productImgs.push(data.singleProduct.mainImage);
    data.singleProduct.otherImages.map((sinImg) => productImgs.push(sinImg));
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  // add to cart
  const [qty, setQty] = useState(1);

  const quantityChangeHandler = (newQty) => {
    if (newQty > data.singleProduct.stock) {
      toast.error("Not enough in stock for that quantity.");
      return;
    }
    setQty(newQty);
  };

  // done
  // logic for adding cart items to cart reducer as well as local storage
  const addToCartHandler = () => {
    const cartProductDetails = {
      productId: data.singleProduct._id,
      productImage: data.singleProduct.mainImage,
      productName: data.singleProduct.productName,
      productStock: data.singleProduct.stock,
      productColor: data.singleProduct.color,
      productSize: data.singleProduct.size,
      productCategory: data.singleProduct.categories,
      productBrand: data.singleProduct.brandName,
      productPrice: data.singleProduct.price,
      quantity: qty,
      userId: userData?._id,
    };
    if (data.singleProduct.stock > 0) {
      dispatch(addToCart(cartProductDetails));
      toast.success("Product added to cart!");
    } else {
      toast.error("Product is out of stock!");
    }
  };

  // review
  const reviewsRef = useRef(null);
  const deletePopupRef = useRef(null);
  const [page, setPage] = useState(1);
  const { data: productReviewData, isLoading: isReviewLoading } = useAllReviewQuery({ productId: params.id, page });

  const navigateToReviews = () => {
    reviewsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // pagination
  const isNextPage = page < productReviewData?.totalPages;
  const isPrevPage = page > 1;

  // Handle pagination
  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    reviewsRef.current.scrollIntoView();
  };

  // delete review
  const [showDeletePopups, setShowDeletePopups] = useState({});

  const toggleDeletePopup = (reviewId) => {
    setShowDeletePopups((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const cancelDeleteReview = (reviewId) => {
    toggleDeletePopup(reviewId);
  };

  const [deleteReview] = useDeleteReviewMutation();

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await deleteReview({ reviewId, userId: userData?._id });
      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error;
        const errorMessage = error.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurs while deleting Review");
    }
  };

  const handleClickOutside = (event) => {
    if (deletePopupRef.current && !deletePopupRef.current.contains(event.target)) {
      setShowDeletePopups({});
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="pageNavigation">
        <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate(`/search?search=${data.singleProduct.categories}`)}>
          Product
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        {data.singleProduct.categories}
      </div>

      <section className="productPage">
        <div className="imageSide">
          <div className="showImage">
            <InnerImageZoom src={zoomImg} alt={data.singleProduct.sku} zoomScale={1.2} zoomType="hover" />
          </div>
          <div className="slideImage">
            <Slider {...settings} className="zoomSlider">
              {productImgs.map((oneImage, index) => (
                <div className="item">
                  <img src={oneImage} alt={`img${index}`} onClick={() => setZoomImg(oneImage)} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="detailSide">
          <div className="saleBox">
            <p>{(((data.singleProduct.mrp - data.singleProduct.price) / data.singleProduct.mrp) * 100).toFixed(0)}% Off</p>
          </div>
          <div className="productName">
            <p>{data.singleProduct.productName}</p>
            <div className="productCate">
              <p onClick={() => navigate(`/search?search=${data.singleProduct.categories}`)}>{data.singleProduct.categories}</p>
            </div>
          </div>
          {!isReviewLoading ? (
            <div className="productReview">
              {productReviewData.totalReviews === 0 ? (
                <p style={{ margin: 0, color: "#fdc040", fontSize: "1.8rem", fontWeight: "600" }}>{productReviewData.message}</p>
              ) : (
                <div className="reviews" onClick={navigateToReviews}>
                  <Rate style={{ color: "#FDB600" }} defaultValue={productReviewData.averageRating} allowHalf disabled />
                  <p>({`${productReviewData.totalReviews} reviews`})</p>
                </div>
              )}
            </div>
          ) : null}
          <div className="productPrice">
            <h2>
              ₹{data.singleProduct.price}
              <sub>₹{data.singleProduct.mrp}</sub>
            </h2>
            <strong style={{ fontSize: "1.6rem", marginTop: "0.5rem" }}>Inclusive of all taxes</strong>
          </div>
          <div className="productBulletPoints">
            <p>{data.singleProduct.bulletPoints}</p>
          </div>
          <div className="sizestock">
            <p>
              Color: <strong>{data.singleProduct.color}</strong>
            </p>
            <p>
              Size: <strong>{data.singleProduct.size}</strong>
            </p>
            <p>
              Stock:{" "}
              <strong className={data.singleProduct.stock > 0 ? "green" : "red"}>
                {data.singleProduct.stock > 0 ? `${data.singleProduct.stock} left` : "Stock Out"}
              </strong>
            </p>
          </div>
          <div className="cartSection">
            <div className="qtyInput">
              <input
                type="number"
                placeholder="Qty: 1"
                onInput={(e) => {
                  e.target.value = Math.abs(e.target.value);
                }}
                onChange={(e) => quantityChangeHandler(e.target.value)}
              />
            </div>
            <div className="productCartButton">
              <Button onClick={addToCartHandler} disabled={data.singleProduct.stock <= 0 ? true : false}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="productDetails">
        <div className="productDescription">
          <h2>Description</h2>
          <p>{data.singleProduct.description}</p>
        </div>
        <div className="moreProductInfo">
          <h2>Product Details</h2>
          <table>
            <tr>
              <td>Brand Name</td>
              <td>{data.singleProduct.brandName}</td>
            </tr>
            <tr>
              <td>Product Full Name</td>
              <td>{data.singleProduct.productName}</td>
            </tr>
            <tr>
              <td>SKU</td>
              <td>{data.singleProduct.sku}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{data.singleProduct.categories}</td>
            </tr>
            <tr>
              <td>Model No</td>
              <td>{data.singleProduct.modelNo}</td>
            </tr>
            <tr>
              <td>Size</td>
              <td>{data.singleProduct.size}</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>{data.singleProduct.material}</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>{data.singleProduct.color}</td>
            </tr>
            <tr>
              <td>Manufacturer</td>
              <td>{data.singleProduct.manufacturer}</td>
            </tr>
            <tr>
              <td>Made In</td>
              <td>{data.singleProduct.madeIn}</td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td>{data.singleProduct.warranty}</td>
            </tr>
          </table>
        </div>
      </section>

      {!isReviewLoading && (
        <>
          <section ref={reviewsRef} className="productReviews">
            <h2>Customer Reviews</h2>
            <div className="ratingComponent">
              <div className="ratingDetails">
                <div className="productRating">{productReviewData.averageRating}</div>
                <Rate className="rating" style={{ color: "#FDB600" }} defaultValue={productReviewData.averageRating} allowHalf disabled />
                <p>{`${productReviewData.totalReviews} reviews`}</p>
              </div>
              <div className="ratingCount">
                {Object.entries(productReviewData.starPercentages)
                  .reverse()
                  .map(([key, value]) => (
                    <div key={key} className="singleRatingData">
                      <h4 key={key}>{key} Star</h4>
                      <div className="bgDiv">
                        <div
                          style={{
                            backgroundColor: "#3bb77e",
                            width: `${value}%`,
                          }}
                        ></div>
                      </div>
                      <span>{`${value}%`}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="writeReviewBtn">
              <Button onClick={() => navigate(`/product/${params.id}/review`)}>WRITE A REVIEW</Button>
            </div>
            {productReviewData.totalReviews > 0 ? (
              <div className="allReating">
                {productReviewData.allProductReview.map((review, index) => (
                  <div className="singleReview" key={index}>
                    <div className="reviewerDetails">
                      <div className="reviewerAvatar">
                        <img src={review.user.avatar} alt={review.user.name} />
                      </div>
                      <div className="reviewerName">
                        <p>{review.user.name}</p>
                        <div className="varify">
                          <CheckCircleRoundedIcon style={{ color: "#3bb77e", fontSize: "2.2rem" }} />
                          <p>Verified Buyer</p>
                        </div>
                      </div>
                    </div>
                    <div className="review">
                      <div className="starRating">
                        <Rate style={{ color: "#FDB600" }} defaultValue={review.productRating} allowHalf disabled />
                        <div className="dateAndDlt">
                          <p>{format(new Date(review.createdAt), "dd-MM-yyyy")}</p>
                          <p
                            className="deleteReviewButton"
                            onClick={() => toggleDeletePopup(review._id)}
                            style={userData?.role === "admin" ? { display: "block", color: "#e71d36", cursor: "pointer" } : { display: "none" }}
                          >
                            Delete
                          </p>
                          {showDeletePopups[review._id] && (
                            <div className="reviewDeletePopup" ref={deletePopupRef}>
                              <div className="deleteReviewDetails">
                                <div className="deleteReviewDetail">
                                  <div className="reviewerAvatar">
                                    <img src={review.user.avatar} alt={review.user.name} />
                                  </div>
                                  <div className="reviewerName">
                                    <p>{review.user.name}</p>
                                    <div className="varify">
                                      <CheckCircleRoundedIcon style={{ color: "#3bb77e", fontSize: "2.2rem" }} />
                                      <p>Verified Buyer</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="deleteReviewStar">
                                  <Rate style={{ color: "#FDB600" }} defaultValue={review.productRating} allowHalf disabled />
                                  <div className="reviewHeading">
                                    {review.productRating === 5
                                      ? "Excellent"
                                      : review.productRating === 4
                                      ? "Good"
                                      : review.productRating === 3
                                      ? "Okay"
                                      : review.productRating === 2
                                      ? "Poor"
                                      : "Useless"}
                                  </div>
                                </div>
                              </div>
                              <p style={{ fontSize: "1.6rem", fontWeight: "500", margin: "1.6rem auto" }}>
                                <strong>Review: </strong>
                                {review.productReview}
                              </p>
                              <p style={{ fontSize: "2rem", fontWeight: "600", width: "max-content" }}>The review will be permanently deleted</p>
                              <div className="deleteP">
                                <Button className="cancelP" onClick={() => cancelDeleteReview(review._id)}>
                                  Cancel
                                </Button>
                                <Button className="deleteBP" onClick={() => handleDeleteReview(review._id)}>
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="reviewHeading">
                        {review.productRating === 5
                          ? "Excellent"
                          : review.productRating === 4
                          ? "Good"
                          : review.productRating === 3
                          ? "Okay"
                          : review.productRating === 2
                          ? "Poor"
                          : "Useless"}
                      </div>
                      <div className="mainReview">{review.productReview}</div>
                    </div>
                  </div>
                ))}
                {/* Pagination */}
                {productReviewData && productReviewData.totalPages > 1 && (
                  <article>
                    <Button onClick={() => handlePagination(page - 1)} disabled={!isPrevPage}>
                      Prev
                    </Button>
                    <span>
                      {page} of {productReviewData.totalPages}
                    </span>
                    <Button onClick={() => handlePagination(page + 1)} disabled={!isNextPage}>
                      Next
                    </Button>
                  </article>
                )}
              </div>
            ) : null}
          </section>
        </>
      )}

      <div className="productLatestProduct">
        <h2>You Might Like</h2>
        <LatestProduct />
      </div>
    </>
  );
}

export default SingleProduct;
