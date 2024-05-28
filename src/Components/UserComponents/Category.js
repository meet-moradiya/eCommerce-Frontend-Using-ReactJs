import React from "react";
import { useNavigate } from "react-router-dom";
import {
  electronicImage,
  clothingImage,
  homeImage,
  beautyImage,
  sportsImage,
  toysImage,
  booksImage,
  groceryImage,
  moreImage,
  transBeauty,
  transShoes,
} from "../../Assets/images/index";
import transSpeaker from "../../Assets/images/transSpeaker.png";

function Category() {
  const navigate = useNavigate();
  const images = [electronicImage, clothingImage, homeImage, beautyImage, sportsImage, toysImage, booksImage, groceryImage, moreImage];
  const cateTitle = [
    "Electronics",
    "Clothing & Apparel",
    "Home & Kitchen",
    "Health & Beauty",
    "Sports & Outdoors",
    "Toys & Games",
    "Books & Media",
    "Foods & Grocery",
    "More",
  ];

  const searchCate = cateTitle.map((title) => title.split(" ")[0]);

  const handleSearchClick = (cate) => {
    navigate(`/search?search=${cate}`);
  };

  const colors = ["#FFF3FF", "#FFFCEB", "#ECFFEC", "#FEEFEA", "#F2FCE4", "#FFFCEB", "#FEEFEA", "#ECFFEC"];
  return (
    <>
      <div className="cate-wrapper">
        {images.map((image, index) => (
          <div
            className={`cate cate${index + 1}`}
            key={index}
            onClick={() => handleSearchClick(`${searchCate[index] === "More" ? "" : searchCate[index]}`)}
            style={{
              backgroundColor: colors[index],
            }}
          >
            <div className="cateimg">
              <img src={image} alt={`${image}img`} />
            </div>
            <h6>{cateTitle[index]}</h6>
          </div>
        ))}
      </div>
      <div className="offerSection">
        <div className="offer offer2">
          <h5>
            <span>Turn any</span>
            <br /> space, any time into a party zone.⚡
          </h5>
          <img src={transSpeaker} alt="speakerOffer" />
        </div>
        <div className="offer offer1">
          <h5>Transform your routine, transform your beauty. 🌟</h5>
          <img src={transBeauty} alt="beautyOffer" />
        </div>
        <div className="offer offer3">
          <h5>
            Elevate your look with our quality footwear.
            <br />
            <strong
              style={{
                fontSize: "5rem",
                lineHeight: "0",
              }}
            >
              👟
            </strong>
          </h5>
          <img src={transShoes} alt="shoesOffer" />
        </div>
      </div>
    </>
  );
}

export default Category;
