import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../css/History.css";

const History = () => {
  const { dataObj } = useAuth();

  const displayTime = (sec) => {
    let seconds = Number(Math.floor(sec / 1000));

    var d = Math.floor(seconds / (3600 * 24));
    // var h = Math.floor((seconds % (3600 * 24)) / 3600);
    // var m = Math.floor((seconds % 3600) / 60);
    // var s = Math.floor(seconds % 60);

    var finalStr = d + " days";

    return finalStr;
  };

  return (
    <div className="historyDiv">
      <div className="historyContainer">
        {dataObj.pastHistory.map((item, index) => {
          return (
            <div key={index} className="historyItem">
              <h1 className="timeSober">{displayTime(item.milliseconds)}</h1>
              <h2 className="timeFrame">
                {item.startTime.toDate().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }) +
                  " " +
                  item.startTime.toDate().toLocaleDateString() +
                  " → " +
                  item.endTime.toDate().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }) +
                  " " +
                  item.endTime.toDate().toLocaleDateString()}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
