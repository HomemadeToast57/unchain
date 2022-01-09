import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "../css/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, logout, dataObj, loadingJSX } = useAuth();

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

  useEffect(() => {

    const checkExists = async () => {
      if (dataObj) {
        await console.log("dataObj: ", dataObj);
      }
      else {
        await console.log("dataObj is empty");
      }
    }

    return checkExists();
  });

  function handleAlertClose() {
    setError("");
  }

  const appJSX = (
    <div className="dashboard">
      <div className="profile">
        <h1>Profile</h1>
        {error && (
          <Alert
            color="red"
            errorMessage={error}
            handleAlertClose={handleAlertClose}
          />
        )}
        <strong>Email: {dataObj && dataObj.email}</strong>
        <Link to="/update-profile" className="logInSubmit">
          Update Profile
        </Link>
      </div>
      <button className="logInSubmit" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );

  if (currentUser && (Object.keys(dataObj).length > 0)) {
    return appJSX;
  } else {
    return loadingJSX;
  }
};

export default Dashboard;
