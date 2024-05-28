import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import LatestProducts from "../../Components/UserComponents/LatestProducts";

function Follow() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <div className="social-media flex flex-wrap justify-center items-center h-[77vh]">
        <Link to="https://twitter.com" rel="noreferrer" target="_blank" title="Follow us on X">
          <i className="fa-brands fa-x-twitter"></i>
        </Link>
        <Link to="https://www.instagram.com/mdmoradiya_04/" rel="noreferrer" target="_blank" title="Follow us on Instagram">
          <i className="fab fa-instagram"></i>
        </Link>
        <Link to="https://www.linkedin.com/in/meet-moradiya/" rel="noreferrer" target="_blank" title="Follow us on LinkedIn">
          <i className="fab fa-linkedin"></i>
        </Link>
        <Link to="https://facebook.com" rel="noreferrer" target="_blank" title="Follow us on Facebook">
          <i className="fab fa-facebook"></i>
        </Link>
      </div>

      <div className="productLatestProduct">
        <h2>New Arrival</h2>
        <LatestProducts />
      </div>
    </>
  );
}

export default Follow;
