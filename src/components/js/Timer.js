import React, { useState, useEffect } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTime } from "../../contexts/TimeContext";

const Timer = () => {
  const { elapsedTime, timeDisplay } = useTime();
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
    <div
      style={{
        height: "300px",
        width: "300px",
      }}
    >
      <CircularProgressbar
        value={dayPercent}
        text={timeDisplay}
        styles={buildStyles({ textSize: "12px" })}
      />
    </div>
  );
};

export default Timer;
