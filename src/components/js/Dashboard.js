import React, { useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {

  console.log("Dashboard")

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate;

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login")
    } catch (error) {
      setError("Failed to log out." + error);
    }
  }

  function handleAlertClose() {
    setError("");
  }

  return (
    <div>
      <div className="profile">
        <h1>Profile</h1>
        {error && (
          <Alert
            color="red"
            errorMessage={error}
            handleAlertClose={handleAlertClose}
          />
        )}
        <strong>Email: </strong>
        {currentUser && currentUser.email}
        <Link to="/update-profile" className="logInSubmit">
          Update Profile
        </Link>
      </div>
      <button className="logInSubmit" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
