import React, { useState, useEffect } from 'react';
import { PiPauseDuotone } from "react-icons/pi"
import { PiPlayDuotone } from "react-icons/pi"

const Timer = ({isActive, setIsActive}) => {
  const [time, setTime] = useState(0);
//   const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };


  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <div onClick={toggleTimer}>
        {isActive ? <PiPauseDuotone/> : <PiPlayDuotone/>}
      </div>
      <p>{formatTime(time)}</p>
    </div>
  );
};

export default Timer;