import React, { useEffect } from "react";
import DealOfDay from "../../Components/UserComponents/DealOfDay";
import Slider from "../../Components/UserComponents/Slider";
import LatestProducts from "../../Components/UserComponents/LatestProducts";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

// slider images
import boatDeal1 from "../../Assets/images/boatDeal1.jpeg";
import boatDeal2 from "../../Assets/images/boatDeal2.jpeg";
import boatDeal3 from "../../Assets/images/boatDeal3.jpeg";
import boatDeal4 from "../../Assets/images/boatDeal4.jpeg";
import boatDeal5 from "../../Assets/images/boatDeal5.jpeg";

// deal of the day images
import MouseDeal from "../../Assets/images/MouseDeal.jpeg";
import HeadphoneDeal from "../../Assets/images/HeadPhoneDeal.jpeg";
import SpeakerDeal from "../../Assets/images/SpeakerDeal.jpeg";
import CameraDeal from "../../Assets/images/CameraDeal.jpeg";
import LaptopDeal from "../../Assets/images/LaptopDeal.jpeg";
import TabletDeal from "../../Assets/images/TabletDeal.jpeg";
import TVDeal from "../../Assets/images/TVDeal.jpeg";
import SmartWatchDeal from "../../Assets/images/SmartWatchDeal.jpeg";
import ACDeal from "../../Assets/images/ACDeal.jpeg";
import FrezeDeal from "../../Assets/images/FrezeDeal.jpeg";
import DishWasherDeal from "../../Assets/images/DishWasherDeal.jpeg";
import WashingMachineDeal from "../../Assets/images/WashingMachineDeal.jpeg";
import OfficeDecor from "../../Assets/images/officeDecor.jpeg";
import officeLighting from "../../Assets/images/officeLighting.jpeg";
import furnishing from "../../Assets/images/furnishing.jpeg";
import storageOrg from "../../Assets/images/storageOrg.jpeg";
import Desks from "../../Assets/images/Desks.jpeg";
import Chairs from "../../Assets/images/Chairs.jpeg";
import BeanBags from "../../Assets/images/BeanBags.jpeg";
import StorageShalves from "../../Assets/images/StorageShalves.jpeg";
import { useNavigate } from "react-router-dom";

function Deals() {
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
    {
      id: 1,
      search: "mouse",
      name: "New Smart Mouse For You",
      image: MouseDeal,
      targetDate: new Date("2025-08-31T23:59:59"),
      price: 799,
      oldPrice: 1999,
    },
    {
      id: 1,
      search: "headphone",
      name: "Get New Deals On headphones",
      image: HeadphoneDeal,
      targetDate: new Date("2025-11-31T23:59:59"),
      price: 2499,
      oldPrice: 3999,
    },
    {
      id: 1,
      search: "speaker",
      name: "Amazing Sale On Speaker",
      image: SpeakerDeal,
      targetDate: new Date("2025-10-31T23:59:59"),
      price: 2499,
      oldPrice: 4999,
    },
    {
      id: 1,
      search: "camera",
      name: "Get Spatial Offers On Camera",
      image: CameraDeal,
      targetDate: new Date("2025-07-31T23:59:59"),
      price: 3999,
      oldPrice: 6999,
    },
    {
      id: 1,
      search: "ac",
      name: "Get Spatial Offers On Air Conditioner",
      image: ACDeal,
      targetDate: new Date("2025-01-31T23:59:59"),
      price: 24999,
      oldPrice: 34999,
    },
    {
      id: 1,
      search: "refrigerator",
      name: "Get New Deals On Refrigerators",
      image: FrezeDeal,
      targetDate: new Date("2025-01-31T23:59:59"),
      price: 3999,
      oldPrice: 6999,
    },
    {
      id: 1,
      search: "dish washer",
      name: "Amazing Sale On Dish Washers",
      image: DishWasherDeal,
      targetDate: new Date("2025-09-31T23:59:59"),
      price: 9999,
      oldPrice: 15999,
    },
    {
      id: 1,
      search: "washing machine",
      name: "Get Spatial Offers On Washing Machines",
      image: WashingMachineDeal,
      targetDate: new Date("2025-12-31T23:59:59"),
      price: 7999,
      oldPrice: 15999,
    },
    {
      id: 1,
      search: "office decoration",
      name: "New Office Decoration Deals For You",
      image: OfficeDecor,
      targetDate: new Date("2025-07-31T23:59:59"),
      price: 1599,
      oldPrice: 4999,
    },
    {
      id: 1,
      search: "furnishing",
      name: "Get New Deals On Furnishing",
      image: furnishing,
      targetDate: new Date("2025-06-31T23:59:59"),
      price: 9999,
      oldPrice: 14999,
    },
    {
      id: 1,
      search: "lightning",
      name: "Amazing Sale On Office Lightning",
      image: officeLighting,
      targetDate: new Date("2025-09-31T23:59:59"),
      price: 499,
      oldPrice: 1599,
    },
    {
      id: 1,
      search: "storage organization",
      name: "Get Spatial Offers On Storage Organization ",
      image: storageOrg,
      targetDate: new Date("2025-11-31T23:59:59"),
      price: 2299,
      oldPrice: 3499,
    },
    {
      id: 1,
      search: "Desks",
      name: "New Desk Deals For You",
      image: Desks,
      targetDate: new Date("2025-09-31T23:59:59"),
      price: 1599,
      oldPrice: 4999,
    },
    {
      id: 1,
      search: "chair",
      name: "Get New Deals On Chairs",
      image: Chairs,
      targetDate: new Date("2025-01-31T23:59:59"),
      price: 1099,
      oldPrice: 1499,
    },
    {
      id: 1,
      search: "bean bags",
      name: "Amazing Sale On Bean Bags",
      image: BeanBags,
      targetDate: new Date("2025-07-31T23:59:59"),
      price: 1999,
      oldPrice: 2599,
    },
    {
      id: 1,
      search: "storage shelves",
      name: "Get Spatial Offers On Storage Shelves ",
      image: StorageShalves,
      targetDate: new Date("2025-12-31T23:59:59"),
      price: 499,
      oldPrice: 1299,
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div className="pageNavigation">
        <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        Deals
      </div>

      <section className="DealOfDay">
        <DealOfDay products={Deals} />
      </section>

      <section className="sliderSection">
        <Slider images={[boatDeal5, boatDeal1, boatDeal2, boatDeal3, boatDeal4]} titles={[]} subtitles={[]} />
      </section>

      <section className="productLatestProduct dealLatestSection">
        <h2>Get Deals On New Arrival</h2>
        <LatestProducts />
      </section>
    </>
  );
}

export default Deals;
