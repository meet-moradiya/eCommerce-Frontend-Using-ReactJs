import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../../Components/UserComponents/ProductCard";
import { useAllSearchProductsQuery } from "../../Redux/API/productAPI";
import LatestProducts from "../../Components/UserComponents/LatestProducts";
import DealOfDay from "../../Components/UserComponents/DealOfDay";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import notFoundImg from "../../Assets/images/Search-rafiki.png";

// Deal of the day
import MouseDeal from "../../Assets/images/MouseDeal.jpeg";
import HeadphoneDeal from "../../Assets/images/HeadPhoneDeal.jpeg";
import SpeakerDeal from "../../Assets/images/SpeakerDeal.jpeg";
import CameraDeal from "../../Assets/images/CameraDeal.jpeg";

function Search() {
  const Deals = [
    {
      id: 1,
      search: "mouse",
      name: "New Smart Mouse For You",
      image: MouseDeal,
      targetDate: new Date("2024-07-31T23:59:59"),
      price: 799,
      oldPrice: 1999,
    },
    {
      id: 1,
      search: "headphone",
      name: "Get New Deals On headphones",
      image: HeadphoneDeal,
      targetDate: new Date("2024-06-31T23:59:59"),
      price: 2499,
      oldPrice: 3999,
    },
    {
      id: 1,
      search: "speaker",
      name: "Amazing Sale On Speaker",
      image: SpeakerDeal,
      targetDate: new Date("2024-09-31T23:59:59"),
      price: 2499,
      oldPrice: 4999,
    },
    {
      id: 1,
      search: "camera",
      name: "Get Spatial Offers On Camera",
      image: CameraDeal,
      targetDate: new Date("2024-11-31T23:59:59"),
      price: 3999,
      oldPrice: 6999,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999999);
  const [size, setSize] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(location.search);
    setSearch(params.get("search"));
  }, [location.search]);

  const { data } = useAllSearchProductsQuery({
    sort,
    color,
    material,
    minPrice,
    maxPrice,
    size,
    search,
    page,
  });

  // filtering unique colours and materials
  let allColors = new Set();
  let allMaterials = new Set();

  data?.products.forEach((i) => {
    if (i.color) {
      allColors.add(i.color);
    }
    if (i.material) {
      allMaterials.add(i.material);
    }
  });

  let uniqueColors = [...allColors];
  let uniqueMaterials = [...allMaterials];

  const isNextPage = page < data?.totalPages;
  const isPrevPage = page > 1;

  const onBtnClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="pageNavigation">
        <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        Search
      </div>

      <section className="searchSection">
        <aside className="searchFilter">
          <h2>Filter</h2>
          <p>Scroll for more Filters...</p>
          <div className="filters">
            <div className="sort">
              <h3>Sort</h3>
              <div className="centerBox">
                <input type="radio" id="all" name="sort" className="sortRadio" onClick={() => setSort("asc")} />
                <label className="radio-label" htmlFor="all">
                  <span className="radio-btn">All</span>
                </label>
              </div>
              <div className="centerBox">
                <input type="radio" id="dsc" name="sort" className="sortRadio" onClick={() => setSort("dsc")} />
                <label className="radio-label" htmlFor="dsc">
                  <span className="radio-btn">Price High To Low</span>
                </label>
              </div>
              <div className="centerBox">
                <input type="radio" id="asc" name="sort" className="sortRadio" onClick={() => setSort("asc")} />
                <label className="radio-label" htmlFor="asc">
                  <span className="radio-btn">Price Low To High</span>
                </label>
              </div>
            </div>

            <div className="price">
              <h3>Price</h3>
              <div className="centerBox">
                <input
                  type="radio"
                  id="allPrice"
                  name="price"
                  className="priceRadio"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(999999999);
                  }}
                />
                <label className="radio-label" htmlFor="allPrice">
                  <span className="radio-btn">All</span>
                </label>
              </div>
              <div className="centerBox">
                <input
                  type="radio"
                  id="2k"
                  name="price"
                  className="priceRadio"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(2000);
                  }}
                />
                <label className="radio-label" htmlFor="2k">
                  <span className="radio-btn">Under ₹2,000</span>
                </label>
              </div>
              <div className="centerBox">
                <input
                  type="radio"
                  id="5k"
                  name="price"
                  className="priceRadio"
                  onClick={() => {
                    setMinPrice(2000);
                    setMaxPrice(5000);
                  }}
                />
                <label className="radio-label" htmlFor="5k">
                  <span className="radio-btn">₹2,000 - ₹5,000</span>
                </label>
              </div>
              <div className="centerBox">
                <input
                  type="radio"
                  id="10k"
                  name="price"
                  className="priceRadio"
                  onClick={() => {
                    setMinPrice(5000);
                    setMaxPrice(10000);
                  }}
                />
                <label className="radio-label" htmlFor="10k">
                  <span className="radio-btn">₹5,000 - ₹10,000</span>
                </label>
              </div>
              <div className="centerBox">
                <input
                  type="radio"
                  id="20k"
                  name="price"
                  className="priceRadio"
                  onClick={() => {
                    setMinPrice(10000);
                    setMaxPrice(20000);
                  }}
                />
                <label className="radio-label" htmlFor="20k">
                  <span className="radio-btn">₹10,000 - ₹20,000</span>
                </label>
              </div>
              <div className="centerBox">
                <input
                  type="radio"
                  id="morehigh"
                  name="price"
                  className="priceRadio"
                  onClick={() => {
                    setMinPrice(20000);
                    setMaxPrice(999999999);
                  }}
                />
                <label className="radio-label" htmlFor="morehigh">
                  <span className="radio-btn">Over ₹20,000</span>
                </label>
              </div>
            </div>

            <div className="color">
              <h3>Color</h3>
              <div className="centerBox">
                <input type="radio" id="allColor" name="color" className="colorRadio" onClick={() => setColor("")} />
                <label className="radio-label" htmlFor="allColor">
                  <span className="radio-btn">All</span>
                </label>
              </div>
              {uniqueColors.map((color, index) => (
                <div className="centerBox" key={color + index}>
                  <input type="radio" id={color} name="color" className="colorRadio" onClick={() => setColor(color)} />
                  <label className="radio-label" htmlFor={color}>
                    <span className="radio-btn">{color}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="material">
              <h3>Material</h3>
              <div className="centerBox">
                <input type="radio" id="allMate" name="material" className="colorRadio" onClick={() => setMaterial("")} />
                <label className="radio-label" htmlFor="allMate">
                  <span className="radio-btn">All</span>
                </label>
              </div>
              {uniqueMaterials.map((material, index) => (
                <div className="centerBox" key={material + index}>
                  <input type="radio" id={material} name="material" className="materialRadio" onClick={() => setMaterial(material)} />
                  <label className="radio-label" htmlFor={material}>
                    <span className="radio-btn">{material}</span>
                  </label>
                </div>
              ))}
            </div>

            <div className="size">
              <h3>Size</h3>
              <div className="centerBox">
                <input type="radio" id="sizeAll" name="size" className="sizeRadio" onClick={() => setSize()} />
                <label className="radio-label" htmlFor="sizeAll">
                  <span className="radio-btn">All</span>
                </label>
              </div>
              <div className="centerBox">
                <input type="radio" id="large" name="size" className="sizeRadio" onClick={() => setSize("large")} />
                <label className="radio-label" htmlFor="large">
                  <span className="radio-btn">Large</span>
                </label>
              </div>
              <div className="centerBox">
                <input type="radio" id="medium" name="size" className="sizeRadio" onClick={() => setSize("medium")} />
                <label className="radio-label" htmlFor="medium">
                  <span className="radio-btn">Medium</span>
                </label>
              </div>
              <div className="centerBox">
                <input type="radio" id="small" name="size" className="sizeRadio" onClick={() => setSize("small")} />
                <label className="radio-label" htmlFor="small">
                  <span className="radio-btn">Small</span>
                </label>
              </div>
            </div>
          </div>
        </aside>
        <div className="searchItems">
          {data?.products.length === 0 ? (
            <div className="notFound">
              <img src={notFoundImg} alt="product not found" />
              <p>Product Not Found</p>
            </div>
          ) : (
            data?.products.map((product, index) => (
              <div className="productWrap" key={product._id + index}>
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
              </div>
            ))
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <article>
              <button
                onClick={() => {
                  setPage((prev) => prev - 1);
                  onBtnClick();
                }}
                disabled={!isPrevPage}
              >
                Prev
              </button>
              <span>
                {page} of {data?.totalPages}
              </span>
              <button
                onClick={() => {
                  setPage((prev) => prev + 1);
                  onBtnClick();
                }}
                disabled={!isNextPage}
              >
                Next
              </button>
            </article>
          )}
        </div>
      </section>

      <section className="searchLatest">
        <h2>You Might Like</h2>
        <LatestProducts />
      </section>

      <section className="DealOfDay">
        <DealOfDay products={Deals} sectionTitle={"Deal of the Day"} />
      </section>
    </>
  );
}

export default Search;
