import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../css/About.css";

const About = () => {
  const { currentUser } = useAuth();

  return (
    <div className="about">
      <div className="aboutDiv">
        <h1>Unchain Yourself From Your Addictions.</h1>
      </div>
    </div>
  );
};

export default About;
