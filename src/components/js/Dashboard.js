import React, { useState } from "react";
import Alert from "./Alert";
import { useTime } from "../../contexts/TimeContext";
import { Link } from "react-router-dom";
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
        <Link to="/update-profile">
          {/* <button
            className="logInSubmit"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Update Profile
          </button> */}
        </Link>
      </div>
      {/* <button className="logInSubmit" onClick={handleLogout}>
        Log Out
      </button> */}
      <button
        className="resetBtn"
        style={{ marginTop: "20px" }}
        onClick={() => saveTime()}
      >
        <i className="fas fa-undo-alt"></i>
      </button>

      <div className="bottomButtons">
        <div className="ranks bottomButtonContainer">
          <button className="bottomButton">
            <i className="fas fa-trophy"></i>
          </button>
          <h1 className="bottomButtonText">Ranks</h1>
        </div>
        <div className="panic bottomButtonContainer">
          <button className="bottomButton">
            <i className="fas fa-user-shield"></i>
          </button>
          <h1 className="bottomButtonText">Panic</h1>
        </div>
        <div className="history bottomButtonContainer">
          <button className="bottomButton">
            <i className="fas fa-history"></i>
          </button>
          <h1 className="bottomButtonText">History</h1>
        </div>
      </div>
    </div>
  );

  return appJSX;
};

export default Dashboard;
