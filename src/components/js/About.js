import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../css/About.css";

const About = () => {
  const { currentUser, setCurrentPage } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage({
      page: "about",
      title: "Unchain",
    });
  }, [setCurrentPage]);

  return (
    <div className="about">
      <div className="aboutDiv">
        <h1 className="aboutTitle">Unchain Yourself From Your Addictions.</h1>

        {currentUser ? (
          <button
            className="aboutBtn"
            onClick={() => {
              setCurrentPage({
                page: "home",
                title: "Unchain",
              });
              navigate("/");
            }}
          >
            Go To Dashboard
          </button>
        ) : (
          <button className="aboutBtn" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        )}

        <div className="what">
          <h2 className="whatTitle smallTitle">What is Unchain?</h2>
          <p className="whatBody">
            Unchain is a simplistic and lightweight web application that allows
            you to track your unhealthy habits and break free from them.
          </p>
        </div>

        <div className="why">
          <h2 className="whyTitle smallTitle">Why make this app?</h2>
          <p className="whyBody">
            I was on winter break from college and I was looking for a way to
            help others. I wondered if I could help others break free from their
            addictions and help them achieve their goals. I knew that I was
            capable of making something that could make a positive impact on
            people's lives. I could not miss that opportunity.
          </p>
        </div>
        <figure>
          <div className="dashImgContainer">
            <img className="dashImg" alt="Unchain Dashboard"></img>
            <figcaption className="caption">Dashboard of Unchain</figcaption>
          </div>
        </figure>
        <div className="cost">
          <h2 className="costTitle smallTitle">How much does it cost?</h2>
          <p className="whyBody">
            Nothing! This app is entirely free to use. There are no ads or
            microtransactions in this app. If someone is asking you to pay to
            use this app, they are scamming you.
          </p>
        </div>
        {currentUser ? (
          <button
            className="aboutBtn"
            onClick={() => {
              setCurrentPage({
                page: "home",
                title: "Unchain",
              });
              navigate("/");
            }}
          >
            Go To Dashboard
          </button>
        ) : (
          <button className="aboutBtn" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        )}
        <div className="contribute">
          <h2 className="contributeTitle smallTitle">
            Feel free to contribute!
          </h2>
          <p className="whyBody">
            This project is open source! Feel free to contribute to the codebase
            to further improve the app.
          </p>
        </div>
        <button
          className="aboutBtn sourceButton"
          onClick={() => {
            window.open("https://github.com/HomemadeToast57/unchain", "_blank");
          }}
        >
          View the Source Code
        </button>
        <a
          className="buyButton"
          target="_blank"
          rel="noreferrer"
          href="https://www.buymeacoffee.com/jacksinger"
        >
          <img
            className="coffeeImage"
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
          />
          <span className="coffeeButtonText">Buy me a coffee!</span>
        </a>

        <div className="horizontalSeparator"></div>

        <footer className="footer">
          <div className="creditsContainer">
            {/* <h1 className="developedBy">Made By:</h1> */}
            <div className="credits">
              <div className="creditsName">
                <div className="myInfo">
                  <img
                    className="myImg"
                    src="https://avatars.githubusercontent.com/u/54961512?v=4"
                    alt=""
                  />
                  <h1 className="name">Jack Singer</h1>
                </div>
              </div>
              <div className="links">
                <div className="linksList">
                  <a
                    className="creditLink website"
                    href="https://jacksinger.dev/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                  <a
                    className="creditLink github"
                    href="https://github.com/HomemadeToast57"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    className="creditLink twitter"
                    href="https://twitter.com/HomemadeToast57/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="creditLink linkedin"
                    href="https://www.linkedin.com/in/jacobasinger/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="horizontalLine"></div>

        <footer className="copyright">
          <small>
            &copy; Copyright {new Date().getFullYear()}, Jacob (Jack) Singer
          </small>
        </footer>
      </div>
    </div>
  );
};

export default About;
