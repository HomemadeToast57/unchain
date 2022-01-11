import React, { useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../../contexts/AuthContext";
import { useTime } from "../../contexts/TimeContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import Timer from "./Timer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { logout, dataObj } = useAuth();
  const { timeDisplay, saveTime } = useTime();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("error logging out: ", error);
      setError("Failed to log out." + error);
    }
  }

  function handleAlertClose() {
    setError("");
  }

  const appJSX = (
    <div className="dashboard">
      <Timer/>
      <div className="profile">
        <h1 style={{ fontWeight: "800", fontSize: "2rem" }}>Dashboard</h1>
        {error && (
          <Alert
            color="red"
            errorMessage={error}
            handleAlertClose={handleAlertClose}
          />
        )}
        <strong>Email: {dataObj && dataObj.email}</strong>
        <Link to="/update-profile">
          <button
            className="logInSubmit"
            style={{ marginBottom: "20px", marginTop: "20px" }}
          >
            Update Profile
          </button>
        </Link>
      </div>
      <button className="logInSubmit" onClick={handleLogout}>
        Log Out
      </button>
      <button
        className="reset logInSubmit"
        style={{ marginTop: "20px" }}
        onClick={() => saveTime()}
      >
        Reset Time
      </button>
    </div>
  );

  return appJSX;
};

export default Dashboard;
