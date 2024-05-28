// import React from "react";
// import data from "../../Assets/ecommerceByGPT.productsDATA.json";
// import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

// const LatestProducts = () => {
//   const tag = ["Hot", "Sale", "New"];
//   const color = ["#F74B81", "#67BCEE", "#3bb77e", "#F59758"];

//   const generateRandomColor = () => {
//     const randomIndex = Math.floor(Math.random() * color.length);
//     return color[randomIndex];
//   };

//   return (
//     <div className="latestProducts">
//       {data.map((product, index) => (
//         <div className={`productBox productBox${index}`} key={index}>
//           <div className="productImage">
//             <img src={product.mainImage} alt={product.productName} />
//           </div>
//           <div className="productText">
//             <p className="productCate">{product.categories} </p>
//             <h4 className="productTitle">{product.productName}</h4>
//             <p className="company">
//               <span style={{ color: "#343a40" }}>By,</span> {product.brandName}
//             </p>
//             <div className="priceBox">
//               <div className="price">
//                 <span style={{ marginRight: "0.7rem" }}>${product.price}</span>{" "}
//                 <span style={{ marginLeft: "0.7rem", fontSize: "14px", textDecoration: "line-through", color: "#8e9aaf" }}>${product.mrp}</span>
//               </div>
//               <button>
//                 <i>
//                   <AddShoppingCartRoundedIcon
//                     style={{
//                       fontSize: "2.2rem",
//                     }}
//                   />
//                 </i>
//                 Add
//               </button>
//             </div>
//           </div>
//           <p
//             className="productTag"
//             style={{
//               backgroundColor: generateRandomColor(),
//             }}
//           >
//             {tag[index]} {(((product.mrp - product.price) / product.mrp) * 100).toFixed(0)}% Off
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LatestProducts;

// ########################  or you can use dynamic product card ################################

import React from "react";
import { useLatestProductsQuery } from "../../Redux/API/productAPI";
import ProductCard from "./ProductCard";

const LatestProducts = () => {
  const { data } = useLatestProductsQuery();

  return (
    <div className="latestProducts">
      {data?.products.map((product, index) => (
        <ProductCard
          key={index}
          productStock={product.stock}
          productId={product._id}
          productBrand={product.brandName}
          productCategory={product.categories}
          productColor={product.color}
          productSize={product.size}
          productImage={product.mainImage}
          productMrp={product.mrp}
          productPrice={product.price}
          productName={product.productName}
          uniqueClass={`${product._id + index}`}
          index={index}
        />
      ))}
    </div>
  );
};

export default LatestProducts;
