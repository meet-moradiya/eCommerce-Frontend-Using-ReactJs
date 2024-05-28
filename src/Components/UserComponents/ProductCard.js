import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Reducer/cartReducer";

function ProductCard({
  productId,
  productImage,
  productName,
  productStock,
  productColor,
  productSize,
  productCategory,
  productBrand,
  productPrice,
  productMrp,
  uniqueClass,
  index,
}) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);

  const tag = ["Hot", "Sale", "New", "Limited", "", "", "", "", "", ""];
  const color = ["#F74B81", "#67BCEE", "#3bb77e", "#F59758"];

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * color.length);
    return color[randomIndex];
  };

  const generateRandomTag = () => {
    const randomIndex = Math.floor(Math.random() * tag.length);
    return tag[randomIndex];
  };

  const addToCartHandler = () => {
    if (productStock > 0) {
      dispatch(
        addToCart({
          productId,
          productImage,
          productName,
          productStock,
          productColor,
          productSize,
          productCategory,
          productBrand,
          productPrice,
          quantity: 1,
          userId: userData?._id,
        })
      );
      toast.success("Product added to cart!");
    } else {
      toast.error("Product is out of stock!");
    }
  };

  return (
    <div className={`productCard ${uniqueClass}`}>
      <div className="productImage" onClick={() => window.open(`/product/${productId}`, "_blank", "noopener noreferrer")}>
        <img src={productImage} alt={productName} />
      </div>
      <div className="productText">
        <p className="productCate">{productCategory} </p>
        <h4 className="productTitle" onClick={() => window.open(`/product/${productId}`, "_blank", "noopener noreferrer")}>
          {productName}
        </h4>
        <p className="company">
          <span style={{ color: "#343a40" }}>By,</span> {productBrand}
        </p>
        <div className="priceBox">
          <div className="price">
            <span style={{ marginRight: "0.7rem" }}>₹{productPrice}</span>{" "}
            <span style={{ marginLeft: "0.7rem", fontSize: "14px", textDecoration: "line-through", color: "#8e9aaf" }}>₹{productMrp}</span>
          </div>
          <button onClick={addToCartHandler}>
            <i>
              <AddShoppingCartRoundedIcon
                style={{
                  fontSize: "2.2rem",
                }}
              />
            </i>
            Add
          </button>
        </div>
      </div>
      <p
        className="productTag"
        style={{
          backgroundColor: generateRandomColor(),
        }}
      >
        {generateRandomTag()} {(((productMrp - productPrice) / productMrp) * 100).toFixed(0)}% Off
      </p>
    </div>
  );
}

export default ProductCard;
