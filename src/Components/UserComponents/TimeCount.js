import React, { useState, useEffect } from "react";

const ReverseCounter = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div>
      <div className="deals-countdown">
        <span className="countdown-section">
          <span className="countdown-amount hover-up">{addLeadingZero(timeLeft.days)}</span>
          <span className="countdown-period"> days </span>
        </span>
        <span className="countdown-section">
          <span className="countdown-amount hover-up">{addLeadingZero(timeLeft.hours)}</span>
          <span className="countdown-period"> hours </span>
        </span>
        <span className="countdown-section">
          <span className="countdown-amount hover-up">{addLeadingZero(timeLeft.minutes)}</span>
          <span className="countdown-period"> mins </span>
        </span>
        <span className="countdown-section">
          <span className="countdown-amount hover-up">{addLeadingZero(timeLeft.seconds)}</span>
          <span className="countdown-period"> sec </span>
        </span>
      </div>
    </div>
  );
};

export default ReverseCounter;
