import React, { useState, useEffect } from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../css/Timer.css";

import { useTime } from "../../contexts/TimeContext";

const Timer = () => {
  const { elapsedTime, timeDisplay, timeObj } = useTime();
  const [dayPercent, setDayPercent] = useState();

  useEffect(() => {
    const getPercent = () => {
      let d = elapsedTime / 86400000;
      //get the percent of the day from d
      var decimal = d - Math.floor(d);

      //get the percent of the day from decimal
      var percent = decimal * 100;
      setDayPercent(percent);
    };

    return getPercent();
  }, [elapsedTime]);

  return (
    <div className="timerContainerDiv"
    >
      <CircularProgressbarWithChildren
        value={dayPercent}
        styles={buildStyles({ textSize: "1rem", strokeLinecap: "butt", })} strokeWidth={4} className="darkmode-ignore"
      >
        <h1 className="days">{timeObj.d !== 1 ? timeObj.d + " days" : timeObj.d + " day"}</h1>
        <h2 className="clock">{timeDisplay}</h2>

      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Timer;
