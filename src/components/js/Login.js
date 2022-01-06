import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../css/Auth.css";
import Alert from "./Alert";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(currentUser);
  async function handleSubmit(e) {
    e.preventDefault();
    handleAlertClose();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      setError("Failed to log in. Incorrect email or password.");
    }

    setLoading(false);
  }

  function handleAlertClose() {
    setError("");
  }

  return (
    <div className="signUp">
      {currentUser && currentUser.email}
      {error && (
        <Alert
          color="red"
          errorMessage={error}
          handleAlertClose={handleAlertClose}
        />
      )}
      <div className="signUpCard">
        <h1 className="signUpTitle">Log In</h1>
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
            <div id="password" className="formGroup">
              <p className="passwordLabel">Password</p>
              <input
                autoComplete="current-password"
                type="password"
                ref={passwordRef}
                required
              />
            </div>
          </div>

          <button disabled={loading} className="logInSubmit" type="submit">
            Log In
          </button>
        </form>
        <Link className="haveAccount have-account-link forgotPass" to="/forgot-password">Forgot Password</Link>
      </div>
      <div className="haveAccount">
        <Link to="/signup" className="have-account-link">
          Need an account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
