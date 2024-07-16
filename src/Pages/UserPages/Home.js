import React, { useEffect } from "react";
import Slider from "../../Components/UserComponents/Slider";
import Category from "../../Components/UserComponents/Category";
import LatestProducts from "../../Components/UserComponents/LatestProducts";
import DealOfDay from "../../Components/UserComponents/DealOfDay";
import ScrollToTopButton from "../../Components/UserComponents/ScrollToTopButton";

// Slider Images
import samsungImage from "../../Assets/images/GalaxyS24Ultra.jpeg";
import headphoneImage from "../../Assets/images/BoseHeadphone.jpeg";
import handwatchImage from "../../Assets/images/FireboltSmartWatchNew.jpeg";

// Deal of the day Images
import LaptopDeal from "../../Assets/images/LaptopDeal.jpeg";
import TabletDeal from "../../Assets/images/TabletDeal.jpeg";
import TVDeal from "../../Assets/images/TVDeal.jpeg";
import SmartWatchDeal from "../../Assets/images/SmartWatchDeal.jpeg";

function Home() {
  const Deals = [
    {
      id: 1,
      search: "laptop",
      name: "New Laptop Deals For You",
      image: LaptopDeal,
      targetDate: new Date("2025-07-31T23:59:59"),
      price: 49999,
      oldPrice: 59999,
    },
    {
      id: 1,
      search: "tablet",
      name: "Get New Deals On Tablets",
      image: TabletDeal,
      targetDate: new Date("2025-06-31T23:59:59"),
      price: 9999,
      oldPrice: 14999,
    },
    {
      id: 1,
      search: "smart watch",
      name: "Amazing Sale On Smart Watches",
      image: SmartWatchDeal,
      targetDate: new Date("2025-09-31T23:59:59"),
      price: 1999,
      oldPrice: 5999,
    },
    {
      id: 1,
      search: "TV",
      name: "Get Spatial Offers On TV Sets ",
      image: TVDeal,
      targetDate: new Date("2025-11-31T23:59:59"),
      price: 29999,
      oldPrice: 49999,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <section className="sliderSection">
        <Slider
          images={[samsungImage, headphoneImage, handwatchImage]}
          titles={["Galaxy S24 Ultra", "Bose QuietComfort Ultra"]}
          subtitles={["With new AI features", "Headphones"]}
        />
      </section>
      <section className="categoryContainer">
        <h2>Featured Categories</h2>
        <Category />
      </section>
      <section className="homeLatestProducts">
        <h2>New Arrivals</h2>
        <LatestProducts />
      </section>
      <section className="DealOfDay">
        <DealOfDay products={Deals} sectionTitle={"New Deals"} />
      </section>
      <ScrollToTopButton />
    </div>
  );
}

export default Home;
