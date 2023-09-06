import React, { useState, useEffect } from 'react';
import { PiPauseDuotone } from "react-icons/pi"
import { PiPlayDuotone } from "react-icons/pi"
import "./Timer.css"


const Timer = ({isActive, setIsActive, resumeTime, setResumeTime}) => {
  const [time, setTime] = useState(resumeTime || 0);

  useEffect(() => {
    if (resumeTime !== null) {
      setTime(resumeTime);
      setResumeTime(null);
      setIsActive(true);
    }
  }, [resumeTime]);


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

    let workoutMeta = JSON.parse(sessionStorage.getItem("currentWorkoutMETA"));
    workoutMeta.time = timeInSeconds;
    sessionStorage.setItem("currentWorkoutMETA", JSON.stringify(workoutMeta));

    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    
    return hours === '00' ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}`;
  };


  const formattedTime = formatTime(time);
  const width = formattedTime.length > 5 ? '120px' : '80px';

  return (
      <div className="stop-watch">
          <div className="pause-play-container" onClick={toggleTimer}>
              {isActive ? <PiPauseDuotone className='pause-play'/> : <PiPlayDuotone className='pause-play'/>}
          </div>
          <p className='rendered-time' style={{ width: width }}>
              {formattedTime}
          </p>
      </div>
  );
};

export default Timer;