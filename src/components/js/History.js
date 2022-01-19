import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useAuth } from "../../contexts/AuthContext";
import { useTime } from "../../contexts/TimeContext";
import "../css/History.css";

const History = () => {
  const { dataObj } = useAuth();
  const { resetHistory } = useTime();

  const displayTime = (sec) => {
    let seconds = Number(Math.floor(sec / 1000));

    var d = Math.floor(seconds / (3600 * 24));
    // var h = Math.floor((seconds % (3600 * 24)) / 3600);
    // var m = Math.floor((seconds % 3600) / 60);
    // var s = Math.floor(seconds % 60);

    var finalStr = d + " days";

    return finalStr;
  };

  useEffect(() => {
    if (dataObj.pastHistory.length === 0) {
      document.getElementById("resetHistory").disabled = true;
    } else {
      document.getElementById("resetHistory").disabled = false;
    }
  });

  const submit = () => {
    if (dataObj.pastHistory.length !== 0) {
      confirmAlert({
        title: "Confirm to reset history.",
        message: "Are you sure to do this? This cannot be undone.",
        buttons: [
          {
            label: "Yes",
            onClick: () => resetHistory(),
          },
          {
            label: "No",
            onClick: () => {
              return true;
            },
          },
        ],
      });
    }
  };

  return (
    <div className="historyDiv">
      <div className="historyContainer">
        <button
          className={"resetBtn " + (dataObj.pastHistory.length === 0 ? "disabledErase" : "")}
          id="resetHistory"
          style={{ marginTop: "20px" }}
          onClick={submit}
        >
          <i className="fas fa-trash"></i>
        </button>
        {dataObj.pastHistory.length === 0 && (
          <h1 className="noHistory">
            There is nothing in your history. When you reset your timer, your
            past history will be listed here.
          </h1>
        )}
        {dataObj.pastHistory.map((item, index) => {
          return (
            <div key={index} className={"historyItem " + (!dataObj.pastHistory[++index] ? "lastHistory" : "")}>
              <h1 className="timeSober">{displayTime(item.milliseconds)}</h1>
              <div className="horizontalLine"></div>
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
