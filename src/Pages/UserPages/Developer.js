import React, { useEffect } from "react";
import myphoto from "../../Assets/images/developerNewImage.png";

function Developer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="contactManager">
      <p>Contact developer for further Information.</p>
      <div className="twoPartDeveloper">
        <div className="managerInfo">
          <div className="managerName commonManagerBox">
            <p>Developed & Managed By:</p>
            <strong>Meet Moradiya</strong>
          </div>
          <div className="managerContact commonManagerBox">
            <p>Contact:</p> <strong>+91 9875111723</strong>
          </div>
          <div className="managerEmail commonManagerBox">
            <p>Email:</p> <strong>mdmoradiya2705@gmail.com</strong>
          </div>
          <div className="LinkedIn commonManagerBox">
            <p>LinkedIn Profile:</p>
            <strong>
              <a href="https://www.linkedin.com/in/meet-moradiya/" rel="noreferrer" target="_blank">
                www.linkedin.com/in/meet-moradiya
              </a>
            </strong>
          </div>
          <div className="Instagram commonManagerBox">
            <p>Instagram Profile:</p>
            <strong>
              <a href="https://www.instagram.com/mdmoradiya_04/" rel="noreferrer" target="_blank">
                www.instagram.com/mdmoradiya_04
              </a>
            </strong>
          </div>
        </div>
        <div className="developerImage">
          <img src={myphoto} alt="developer" width={275} />
        </div>
      </div>
    </section>
  );
}

export default Developer;
