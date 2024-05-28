import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Icon1 from "../../Assets/images/icon-1.svg";
import Icon2 from "../../Assets/images/icon-2.svg";
import Icon3 from "../../Assets/images/icon-3.svg";
import Icon4 from "../../Assets/images/icon-4.svg";
import Icon5 from "../../Assets/images/icon-5.svg";
import Icon6 from "../../Assets/images/icon-6.svg";
import newsLetter from "../../Assets/images/newsletter.png";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <section className="footerNewsletter">
        <div className="position-relative newsletter-inner inherited-css">
          <div className="newsletter-content">
            <h2 className="mb-20">
              Stay home &amp; get your daily <br />
              needs from our shop
            </h2>
            <p className="mb-45">
              Start Your Daily Shopping with <span className="text-brand">MD Mart</span>
            </p>
            <form className="form-subscriber d-flex">
              <input type="email" placeholder="Your email address" />
              <button className="btn" type="submit">
                Subscribe
              </button>
            </form>
          </div>
          <img src={newsLetter} alt="newsletter" />
        </div>
      </section>

      <section className="featured section-padding inherited-css">
        <div className="container">
          <div className="row">
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 mb-md-4 mb-xl-0">
              <div className="banner-left-icon d-flex align-items-center">
                <div className="banner-icon">
                  <img src={Icon1} alt={`${Icon1}img`} />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Best offers</h3>
                  <p>Orders $50 or more</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <div className="banner-left-icon d-flex align-items-center">
                <div className="banner-icon">
                  <img src={Icon2} alt={`${Icon2}img`} />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Free delivery</h3>
                  <p>24/7 amazing services</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <div className="banner-left-icon d-flex align-items-center">
                <div className="banner-icon">
                  <img src={Icon3} alt={`${Icon3}img`} />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Great daily deal</h3>
                  <p>When you sign up</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <div className="banner-left-icon d-flex align-items-center">
                <div className="banner-icon">
                  <img src={Icon4} alt={`${Icon4}img`} />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Wide assortment</h3>
                  <p>Mega Discounts</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6">
              <div className="banner-left-icon d-flex align-items-center">
                <div className="banner-icon">
                  <img src={Icon5} alt={`${Icon5}img`} />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Easy returns</h3>
                  <p>Within 30 days</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1-5 col-md-4 col-12 col-sm-6 d-xl-none">
              <div className="banner-left-icon d-flex align-items-center">
                <div className="banner-icon">
                  <img src={Icon6} alt={`${Icon6}img`} />
                </div>
                <div className="banner-text">
                  <h3 className="icon-box-title">Safe delivery</h3>
                  <p>Within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mainFooterSec">
        <div className="col inherited-css">
          <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0 wow animate__ animate__fadeInUp animated" data-wow-delay="0">
            <div className="logo" onClick={() => navigate("/")}>
              <div className="logoText">
                MD
                <span
                  style={{
                    fontSize: "1.7rem",
                    fontFamily: "revert",
                    color: "#343a40",
                  }}
                >
                  MART
                </span>{" "}
              </div>
            </div>
            <ul className="contact-infor">
              <li>
                <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-location.svg" alt="" />
                <strong>Address: </strong> <span>5171 W Campbell Ave undefined road, surat, gujarat, india</span>
              </li>
              <li>
                <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-contact.svg" alt="" />
                <strong>Call Us:</strong>
                <span>(+91) - 540-025-124553</span>
              </li>
              <li>
                <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-email-2.svg" alt="" />
                <strong>Email:</strong>
                <span>sale@mdmart.com</span>
              </li>
              <li>
                <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-clock.svg" alt="" />
                <strong>Hours:</strong>
                <span>10:00 - 18:00, Mon - Sat</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-link-widget col wow animate__ animate__fadeInUp animated inherited-css" data-wow-delay=".2s">
          <h4 className="widget-title">Company</h4>
          <ul className="footer-list mb-sm-5 mb-md-0">
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/developer">Delivery Information</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/contact">Support Center</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy & Policy</Link>
            </li>
            <li>
              <Link to="/follow">Follow Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-link-widget col wow animate__ animate__fadeInUp animated inherited-css" data-wow-delay=".2s">
          <h4 className="widget-title">Account</h4>
          <ul className="footer-list mb-sm-5 mb-md-0">
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/cart">View Cart</Link>
            </li>
            <li>
              <Link to="/account">Track My Order</Link>
            </li>
            <li>
              <Link to="/contact">Help Ticket</Link>
            </li>
            <li>
              <Link to="/developer">Shipping Details</Link>
            </li>
          </ul>
        </div>
        <div className="footer-link-widget col wow animate__ animate__fadeInUp animated inherited-css" data-wow-delay=".2s">
          <h4 className="widget-title">Corporate</h4>
          <ul className="footer-list mb-sm-5 mb-md-0">
            <li>
              <Link to="/developer">Become a Vendor</Link>
            </li>
            <li>
              <Link to="/developer">Affiliate Program</Link>
            </li>
            <li>
              <Link to="/developer">Farm Business Farm Careers</Link>
            </li>
            <li>
              <Link to="/developer">Our Suppliers Accessibility</Link>
            </li>
            <li>
              <Link to="/developer">Promotions</Link>
            </li>
          </ul>
        </div>
        <div className="footer-link-widget col wow animate__ animate__fadeInUp animated inherited-css" data-wow-delay=".2s">
          <h4 className="widget-title">Popular</h4>
          <ul className="footer-list mb-sm-5 mb-md-0">
            <li>
              <Link to="/search?search=electronic">Electronics</Link>
            </li>
            <li>
              <Link to="/search?search=fashion">Fashion</Link>
            </li>
            <li>
              <Link to="/search?search=sport">Sports & Fitness</Link>
            </li>
            <li>
              <Link to="/search?search=home">Home & Kitchen</Link>
            </li>
            <li>
              <Link to="/search?search=toys">Toys & Games</Link>
            </li>
            <li>
              <Link to="/search?search=garden">Garden & Outdoors</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="footerCopy">
        <div className="container pb-30 wow animate__ animate__fadeInUp animated inherited-css" data-wow-delay="0">
          <div className="row align-items-center">
            <div className="col-12 mb-30">
              <div className="footer-bottom"></div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <p className="font-sm mb-0">
                © 2024, <strong className="text-brand">MD MART </strong>
                All rights reserved
              </p>
            </div>
            <div className="col-xl-4 col-lg-6 text-center d-none d-xl-block">
              <div className="hotline d-lg-inline-flex mr-30">
                <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/phone-call.svg" alt="hotline" />
                <p>
                  1900 - 6666<span>Working 8:00 - 22:00</span>
                </p>
              </div>
              <div className="hotline d-lg-inline-flex">
                <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/phone-call.svg" alt="hotline" />
                <p>
                  1900 - 8888<span>24/7 Support Center</span>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 text-end d-none d-md-block">
              <div className="mobile-social-icon">
                <h6>Follow Us</h6>
                <Link to="https://www.facebook.com/">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-facebook-white.svg" alt="" />
                </Link>
                <Link to="https://twitter.com/">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-twitter-white.svg" alt="" />
                </Link>
                <Link to="https://www.instagram.com/mdmoradiya_04/">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-instagram-white.svg" alt="" />
                </Link>
                <Link to="https://www.youtube.com/">
                  <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-youtube-white.svg" alt="" />
                </Link>
              </div>
              <p className="font-sm">Up to 15% discount on your first subscribe</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
