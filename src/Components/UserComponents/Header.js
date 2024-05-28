import React, { useEffect, useState, useRef } from "react";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import cartImage from "../../Assets/images/icon-cart.svg";
import accountImage from "../../Assets/images/icon-user.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeHam, setActiveHam] = useState(window.innerWidth <= 374);
  const [searchValue, setSearchValue] = useState("");
  const menuRef = useRef(null);

  // get user from redux
  const { userData: user } = useSelector((state) => state.userReducer);

  const resizeHandler = () => {
    setActiveHam(window.innerWidth <= 374);
  };

  // for resize with screen
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  // done
  const handleMenuClick = (path) => {
    navigate(path);
    setShowSidebar(false);

    // uncheck the checkbox
    const togglenavCheckbox = document.getElementById("togglenav");
    if (togglenavCheckbox) {
      togglenavCheckbox.checked = false;
    }
  };

  // done
  useEffect(() => {
    const body = document.body;
    if (showSidebar) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSidebar(false);

        const togglenavCheckbox = document.getElementById("togglenav");
        if (togglenavCheckbox) {
          togglenavCheckbox.checked = false;
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, showSidebar]);

  const handleSearchClick = () => {
    navigate(`/search?search=${searchValue}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleAccountClick = () => {
    navigate("/account");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  // not showing header to the admin
  const isAdminRoute = location.pathname.startsWith("/admin");
  if (isAdminRoute) {
    return null;
  }

  return (
    <header>
      <section>
        <div className="upheader">
          <p onClick={() => navigate("/about")}>About Us</p>
          <p onClick={() => navigate("/contact")}>Contact Us</p>
          <p onClick={() => navigate("/follow")}>Follow Us</p>
        </div>
        <div className="scrolling-text">
          <p>
            Trendy 25 silver jewelry, save up <strong>35% off</strong> today..... <strong>100% Secure</strong> delivery without contacting the
            courier..... Supper Value Deals - <strong>Save more </strong>with coupons.....
          </p>
        </div>
        <div className="upheaderContact">
          <p>
            Need help? Call Us:{" "}
            <span
              style={{
                color: "#3bb77e",
                fontWeight: 600,
              }}
            >
              +1800 900
            </span>
          </p>
        </div>
      </section>

      <nav>
        <div className="logo" onClick={() => navigate("/")}>
          <div className="logoText">
            MD
            <span
              style={{
                fontSize: "1.8rem",
                fontFamily: "revert",
                color: "#343a40",
              }}
            >
              MART
            </span>{" "}
          </div>
        </div>

        {activeHam && (
          <>
            <input
              type="checkbox"
              id="cover"
              style={
                activeHam
                  ? {
                      display: showSidebar ? "block" : "none",
                    }
                  : {}
              }
            />
            <input class="menu-trigger hidden" id="togglenav" type="checkbox" />
            <label class="burger-wrapper" for="togglenav" onClick={toggleSidebar}>
              <div class="hamburger"></div>
            </label>
          </>
        )}

        <div
          className="menu"
          ref={menuRef}
          style={
            activeHam
              ? {
                  left: showSidebar ? "0rem" : "-35rem",
                  transition: "all 0.2s ease-in-out",
                }
              : {}
          }
        >
          <div className="flexMenu">
            <div className="deals" onClick={() => handleMenuClick("/latest")}>
              <LocalFireDepartmentOutlinedIcon
                className="fireIconMenu"
                style={{
                  fontSize: "2.7rem",
                  color: "#3bb77e",
                }}
              />{" "}
              Deals
            </div>
            <div className="home" onClick={() => handleMenuClick("/")}>
              Home
            </div>
            <div className="about" onClick={() => handleMenuClick("/about")}>
              About
            </div>
            <div className="blog" onClick={() => window.open("https://iblog-steel.vercel.app/explore", "_blank", "noopener noreferrer")}>
              Blog
            </div>
            <div className="contact" onClick={() => handleMenuClick("/contact")}>
              Contact
            </div>
          </div>
          <div className="menuUser">
            {user?._id ? (
              <>
                <div className="userPic">
                  <img src={user?.avatar} alt={user?.name} height={50} onClick={() => handleMenuClick("/account")} />
                </div>
                <div className="userInfoMenu">
                  <p onClick={() => handleMenuClick("/account")}>{user?.name.split(" ")[0]}</p>
                </div>
              </>
            ) : (
              <div className="sideBarLogin" onClick={() => handleMenuClick("/login")}>
                Login
              </div>
            )}
          </div>
        </div>

        <div className="search">
          <div className="tempsearch">
            <input
              type="text"
              placeholder="Search for items..."
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            />
            <SearchOutlinedIcon
              style={{
                fontSize: "3rem",
                color: "#253D4E",
                cursor: "pointer",
              }}
              onClick={handleSearchClick}
            />
          </div>
        </div>

        <div className="cart-acc">
          <div className="cart" onClick={handleCartClick}>
            <img src={cartImage} alt="cart" />
            {!activeHam && <span>Cart</span>}
          </div>
          {user?._id ? (
            <div className="account" onClick={handleAccountClick}>
              <img src={accountImage} alt="account" />
              {!activeHam && <span>Account</span>}
            </div>
          ) : (
            <div className="login" onClick={handleLoginClick}>
              <LoginRoundedIcon
                style={{
                  fontSize: "2.8rem",
                  color: "#253D4E",
                  cursor: "pointer",
                  margin: "0.5rem",
                }}
              />
              {!activeHam && <span>Login</span>}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
