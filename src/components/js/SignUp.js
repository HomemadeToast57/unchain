import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "../css/Auth.css";
import Alert from "./Alert";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signup, checkEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    handleAlertClose();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match.");
    }

    if (passwordRef.current.value.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    const emails = await checkEmail(emailRef.current.value);
    console.log(emails);
    if (emails.length !== 0) {
      return setError(
        "This email address is already in use with another account. Please sign in with that account or sign up with a new email address."
      );
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to create account. " + error);
    }

    setLoading(false);
  }

  function handleAlertClose() {
    setError("");
  }

  return (
    <div className="signUp">
      {error && (
        <Alert
          color="red"
          errorMessage={error}
          handleAlertClose={handleAlertClose}
        />
      )}
      <div className="signUpCard">
        <h1 className="signUpTitle">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div id="email" className="formGroup">
              <p className="emailLabel" htmlFor="email">
                Email
              </p>
              <input type="email" ref={emailRef} required />
            </div>
            <div id="password" className="formGroup">
              <p className="passwordLabel">Password</p>
              <input type="password" ref={passwordRef} required />
            </div>
            <div id="password-confirm" className="formGroup">
              <p className="passwordConfirmationLabel">Password Confirmation</p>
              <input
                type="password"
                ref={passwordConfirmationRef}
                name="confirmPassword"
                required
              />
            </div>
          </div>

          <button disabled={loading} className="signUpSubmit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className="haveAccount">
        <Link to="/login" className="have-account-link">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
