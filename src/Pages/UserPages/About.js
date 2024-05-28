import React, { useEffect } from "react";
import DeveloperImage from "../../Assets/images/developerNewImage.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";
import icon1 from "../../Assets/images/icon-1.svg";
import icon2 from "../../Assets/images/icon-2.svg";
import icon3 from "../../Assets/images/icon-3.svg";
import icon4 from "../../Assets/images/icon-4.svg";
import icon5 from "../../Assets/images/icon-5.svg";
import icon6 from "../../Assets/images/icon-6.svg";
import aboutPerfomance from "../../Assets/images/aboutPerfomance.png";
import marcket from "../../Assets/images/marcket.png";
import headEng from "../../Assets/images/headEng.png";

function About() {
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
        About
      </div>

      <section className="welcomeSection">
        <div className="welcomePera">
          <h1>Welcome to MD MART</h1>
          <p>
            Welcome to MD Mart, where your shopping experience meets excellence. At MD Mart, we're dedicated to bringing you the finest selection of
            products coupled with unparalleled customer service. Our journey began with a simple vision: to create a platform that caters to the
            diverse needs of modern-day consumers, offering everything from essential everyday items to luxurious indulgences, all under one digital
            roof.
            <br /> <br /> As a team, we are committed to curating a seamless shopping journey, ensuring that each visit leaves you inspired and
            satisfied. Discover convenience, quality, and innovation with MD Mart – your trusted destination for all things extraordinary. Join us as
            we redefine the art of online shopping, one delightful experience at a time. Welcome to MD Mart, where your satisfaction is our utmost
            priority.
          </p>
        </div>
        <div className="welcomeImage">
          <img src={DeveloperImage} alt="Meet Moradiya" />
        </div>
      </section>

      <section className="aboutService">
        <section className="text-center mb-50 inherited-css">
          <h2 className="title style-3 mb-40">What We Provide?</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-24">
              <div className="featured-card">
                <img src={icon1} alt="icon1" />
                <h4>Best Prices &amp; Offers</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-24">
              <div className="featured-card">
                <img src={icon2} alt="icon2" />
                <h4>Wide Assortment</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-24">
              <div className="featured-card">
                <img src={icon3} alt="icon3" />
                <h4>Free Delivery</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-24">
              <div className="featured-card">
                <img src={icon4} alt="icon4" />
                <h4>Easy Returns</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-24">
              <div className="featured-card">
                <img src={icon5} alt="icon5" />
                <h4>100% Satisfaction</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-24">
              <div className="featured-card">
                <img src={icon6} alt="icon6" />
                <h4>Great Daily Deal</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="aboutPerfomance">
        <div className="row mb-50 align-items-center inherited-css">
          <div className="col-lg-7 pr-30">
            <img src={aboutPerfomance} alt="aboutPerfomanceImage" className="mb-md-3 mb-lg-0 mb-sm-4" />
          </div>
          <div className="col-lg-5">
            <h4 className="mb-20 text-muted">Our performance</h4>
            <h1 className="heading-1 mb-40">Your Partner for e-commerce solution</h1>
            <p className="mb-30">
              At MD Mart, we're your dedicated partner for e-commerce solutions. With a focus on excellence, we deliver personalized service to meet
              your needs. From product diversity to advanced features, we offer a tailored e-commerce experience.
            </p>
            <p>
              Our expert team optimizes every aspect of your journey. Whether you're a startup or an established brand, we're here to support your
              success in the digital realm. Partner with MD Mart for transformative e-commerce solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutMission">
        <div className="row inherited-css">
          <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
            <h3 className="mb-30">Who we are</h3>
            <p>
              At MD Mart, we're more than an e-commerce platform; we're passionate about revolutionizing online shopping. With expertise and
              innovation, we redefine excellence in the digital marketplace. We're not just a business; we're your committed partner in achieving your
              online retail goals.
            </p>
          </div>
          <div className="col-lg-4 pr-30 mb-md-5 mb-lg-0 mb-sm-5">
            <h3 className="mb-30">Our history</h3>
            <p>
              Our history at MD Mart is a journey of growth and innovation. From our beginnings to becoming a trusted name in e-commerce, every
              milestone reflects our commitment to excellence. With gratitude for our customers and partners, we continue to shape the story of MD
              Mart, driven by passion and dedication.
            </p>
          </div>
          <div className="col-lg-4">
            <h3 className="mb-30">Our mission</h3>
            <p>
              Our mission at MD Mart is clear: to empower success through innovative e-commerce solutions. We're dedicated to providing exceptional
              service and value to our customers, helping them thrive in the digital marketplace.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutTeam">
        <div className="col-xl-10 col-lg-12 m-auto inherited-css">
          <section className="mb-50">
            <h2 className="title style-3 mb-40 text-center">Our Team</h2>
            <div className="row">
              <div className="col-lg-4 mb-lg-0 mb-md-5 mb-sm-5">
                <h6 className="mb-5 text-brand">Our Team</h6>
                <h1 className="mb-30">Meet Our Expert Team</h1>
                <p className="mb-30">
                  Meet our expert team at MD Mart – a dynamic group dedicated to redefining online retail. With diverse expertise and a
                  customer-focused approach, we're here to elevate your e-commerce experience.
                </p>
                <p className="mb-30">
                  At MD Mart, our expert team is the heart of our success. Committed to innovation and excellence, we collaborate tirelessly to ensure
                  your online journey is seamless and rewarding.
                </p>
              </div>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="team-card">
                      <img src={marcket} alt="marcketing manager" />
                      <div className="content text-center">
                        <h4 className="mb-5">H. Merinda</h4>
                        <span>Marketing Manager</span>
                        <div className="social-network mt-20">
                          <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-facebook-brand.svg" alt="" />
                          </a>
                          <a href="https://x.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-twitter-brand.svg" alt="" />
                          </a>
                          <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-instagram-brand.svg" alt="" />
                          </a>
                          <a href="https://youtube.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-youtube-brand.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="team-card">
                      <img src={headEng} alt="head engineer" />
                      <div className="content text-center">
                        <h4 className="mb-5">Dilan Specter</h4>
                        <span>Head Engineer</span>
                        <div className="social-network mt-20">
                          <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-facebook-brand.svg" alt="" />
                          </a>
                          <a href="https://x.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-twitter-brand.svg" alt="" />
                          </a>
                          <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-instagram-brand.svg" alt="" />
                          </a>
                          <a href="https://youtube.com" target="_blank" rel="noreferrer">
                            <img src="https://nest-frontend-v6.netlify.app/assets/imgs/theme/icons/icon-youtube-brand.svg" alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default About;
