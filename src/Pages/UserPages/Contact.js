import React, { useEffect } from "react";
import { Button } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="pageNavigation">
        <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Home
        </span>
        <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
        Contact
      </div>

      <div className="mainContactForm">
        <div className="contain">
          <div className="wrapper">
            <div className="form">
              <h4 className="getInTouch">GET IN TOUCH</h4>
              <h2 className="uline">Send us a message</h2>
              <form id="submit-form" action="">
                <p>
                  <input id="name" className="form-input" type="text" placeholder="Your Name*" />
                  <small className="name-error"></small>
                </p>
                <p>
                  <input id="email" className="form-input" type="email" placeholder="Your Email*" />
                  <small className="name-error"></small>
                </p>
                <p className="full-width">
                  <input id="company-name" className="form-input" type="text" placeholder="Title*" required />
                  <small></small>
                </p>
                <p className="full-width">
                  <textarea minLength="20" id="message" cols="30" rows="7" placeholder="Your Message*" required></textarea>
                  <small></small>
                </p>
                <p className="byClick">
                  By clicking submit button, you are agree to receive communications by call / email about Company's services.
                </p>
                <div className="contactBtns">
                  <Button type="submit">Submit</Button>
                  <Button type="reset">Reset</Button>
                </div>
              </form>
            </div>

            <div className="contacts contact-wrapper">
              <ul>
                <li>
                  We're here to assist you! If you have any questions or need assistance, please feel free to reach out to us.
                  <br />
                  <br />
                  You can also email us.
                </li>
                <span className="hightlight-contact-info">
                  <li className="email-info">
                    <EmailRoundedIcon
                      style={{
                        fontSize: "2.2rem",
                      }}
                    />{" "}
                    contact@mdmart.com
                  </li>
                  <li className="contact-info">
                    <LocalPhoneRoundedIcon
                      style={{
                        fontSize: "2.2rem",
                      }}
                    />{" "}
                    <span className="highlight-text">+91 99 9999 9999</span>
                  </li>
                </span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
