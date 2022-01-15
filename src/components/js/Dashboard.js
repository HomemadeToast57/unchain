import React, { useState } from "react";
import Alert from "./Alert";
import { useTime } from "../../contexts/TimeContext";
import "../css/Dashboard.css";
import Timer from "./Timer";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { saveTime } = useTime();

  function handleAlertClose() {
    setError("");
  }

  const appJSX = (
    <div className="dashboard">
      <div className="timerContainer">
        <Timer />
      </div>
      <div className="profile">
        {/* <h1 style={{ fontWeight: "800", fontSize: "2rem" }}>Dashboard</h1> */}
        {error && (
          <Alert
            color="red"
            errorMessage={error}
            handleAlertClose={handleAlertClose}
          />
        )}
      </div>
      <button
        className="resetBtn"
        style={{ marginTop: "20px" }}
        onClick={() => saveTime()}
      >
        <i className="fas fa-undo-alt"></i>
      </button>
    </div>
  );

  return appJSX;
};

export default Dashboard;
