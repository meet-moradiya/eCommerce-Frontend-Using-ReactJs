import React from "react";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ReverceCount from "./TimeCount";
import { Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";

function Product({ product }) {
  const navigate = useNavigate();
  function generateRandomValue() {
    const randomNumber = Math.random();
    const scaledRandomNumber = randomNumber * (5 - 3.5) + 3;
    const roundedValue = Math.round(scaledRandomNumber * 2) / 2;
    return roundedValue;
  }

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="product-cart-wrap style-2 wow animate__ animate__fadeInUp animated" data-wow-delay=".1s">
        <div className="product-img-action-wrap">
          <div className="product-img">
            <Link to={`/search?search=${product.search}`}>
              <img src={product.image} alt={product.name} height={325} />
            </Link>
          </div>
        </div>
        <div className="product-content-wrap">
          <div className="deals-countdown-wrap">
            <ReverceCount targetDate={product.targetDate} />
          </div>
          <div className="deals-content">
            <h2>
              <Link to="/">{product.name}</Link>
            </h2>
            <div className="product-rate-cover">
              <Rate style={{ color: "#FDB600" }} defaultValue={generateRandomValue()} allowHalf disabled />
            </div>
            <div className="product-card-bottom">
              <div className="product-price">
                <span>₹{product.price}</span>
                <span className="old-price">₹{product.oldPrice}</span>
              </div>
              <button onClick={() => navigate(`/search?search=${product.search}`)}>
                <i>
                  <AddShoppingCartRoundedIcon style={{ fontSize: "2.2rem" }} />
                </i>{" "}
                Get Deal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DealOfDay({ products, sectionTitle }) {
  return (
    <section className="deal-of-the-day section-padding pb-5 inherited-css">
      <div className="container">
        <div className="section-title" data-wow-delay="0">
          <h3>{sectionTitle ? sectionTitle : null}</h3>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DealOfDay;
