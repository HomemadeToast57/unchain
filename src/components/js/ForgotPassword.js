import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../css/Auth.css";
import Alert from "./Alert";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("red");

  async function handleSubmit(e) {
    e.preventDefault();
    handleAlertClose();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setColor("green");
      setError("Check your email for further instructions.");
      emailRef.current.value = "";
    } catch (error) {
      setColor("red");
      setError("Failed to reset password.");
      emailRef.current.value = "";
    }

    setLoading(false);
  }

  function handleAlertClose() {
    setError("");
  }

  return (
    <div className="auth">
      {error && (
        <Alert
          color={color}
          errorMessage={error}
          handleAlertClose={handleAlertClose}
        />
      )}
      <div className="authDiv">
        <h1 className="authTitle">Password Reset</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div id="email" className="formGroup">
              <p className="emailLabel">Email</p>
              <input
                autoComplete="email"
                type="email"
                ref={emailRef}
                required
              />
            </div>
          </div>

          <button disabled={loading} className="logInSubmit" type="submit">
            Reset Password
          </button>
        </form>
        <Link className="haveAccount have-account-link forgotPass" to="/login">
          Return to Login
        </Link>
      </div>
        <Link to="/signup" className="haveAccount have-account-link">
          Need an account? Sign Up
        </Link>
    </div>
  );
};

export default ForgotPassword;
