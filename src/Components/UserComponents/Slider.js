import React, { useState, useEffect, useCallback, useRef } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Slider = ({ images, titles, subtitles }) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [count, setCount] = useState(1);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevSlide = () => {
    const slideList = sliderRef.current.querySelector("#slideWrap");
    const items = images.length;

    if (count > 1) {
      slideList.style.left = `-${(count - 2) * sliderWidth}px`;
      setCount(count - 1);
    } else if (count === 1) {
      slideList.style.left = `-${(items - 1) * sliderWidth}px`;
      setCount(items);
    }
  };

  const nextSlide = useCallback(() => {
    const slideList = sliderRef.current.querySelector("#slideWrap");
    const items = images.length;

    if (count < items) {
      slideList.style.left = `-${count * sliderWidth}px`;
      setCount(count + 1);
    } else if (count === items) {
      slideList.style.left = "0px";
      setCount(1);
    }
  }, [count, images, sliderWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [count, nextSlide]);

  return (
    <div id="slider" ref={sliderRef}>
      <ul id="slideWrap" style={{ display: "flex", listStyle: "none", padding: 0 }}>
        {images.map((image, index) => (
          <li
            key={index}
            className={`image${index + 1}`}
            style={{
              backgroundImage: `url(${image})`,
              width: `${sliderWidth}px`,
            }}
          >
            <h3>{titles[index]}</h3>
            <p>{subtitles[index]}</p>
          </li>
        ))}
      </ul>
      <button id="prev" onClick={prevSlide}>
        <ArrowBackIosNewRoundedIcon style={{ fontSize: "2.2rem" }} />
      </button>
      <button id="next" onClick={nextSlide}>
        <ArrowForwardIosRoundedIcon style={{ fontSize: "2.2rem" }} />
      </button>
    </div>
  );
};

export default Slider;
