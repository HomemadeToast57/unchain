import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";


import "../css/SignUp.css";
import Alert from "./Alert";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match.");
    }

    if ((passwordRef.current.value.length) < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      setError('');
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Failed to create account." + error);
    }

    setLoading(false);
  }

  return (
    <div className="signUp">
      {error && <Alert errorMessage={error}/>}
      <div className="signUpCard">
        <h1 className="signUpTitle">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div id="email" className="formGroup">
              <p className="emailLabel">Email</p>
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
      <div className="haveAccount">Already have an account? Log In</div>
    </div>
  );
};

export default SignUp;
