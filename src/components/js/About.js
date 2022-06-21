import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "../css/About.css";
import "../css/Timer.css";

const About = () => {
  const { currentUser, setCurrentPage } = useAuth();
  const navigate = useNavigate();

  const [timeObj, setTimeObj] = React.useState({
    days: Math.floor(Math.random() * (90 - 3) + 3),
    hours: Math.floor(Math.random() * (24 - 0) + 0),
    minutes: Math.floor(Math.random() * (60 - 0) + 0),
    seconds: Math.floor(Math.random() * (60 - 0) + 0),
  });

  const [clock, setClock] = React.useState(
    `${timeObj.hours < 10 ? "0" : ""}${timeObj.hours}:${
      timeObj.minutes < 10 ? "0" : ""
    }${timeObj.minutes}:${timeObj.seconds < 10 ? "0" : ""}${timeObj.seconds}`
  );

  const [progress, setProgress] = React.useState(1);

  useEffect(() => {
    console.log("newProgress: ", progress);
  }, [progress]);

  // increment time every second infinitely
  useEffect(() => {
    const interval = setInterval(() => {
      let newTimeObj = {
        days: timeObj.days,
        hours: timeObj.hours,
        minutes: timeObj.minutes + 1,
        seconds: timeObj.seconds + 11,
      };

      if (newTimeObj.seconds >= 60) {
        newTimeObj.seconds = 0;
        newTimeObj.minutes += 1;
      }

      if (newTimeObj.minutes >= 60) {
        newTimeObj.minutes = 0;
        newTimeObj.hours += 1;
      }

      if (newTimeObj.hours >= 24) {
        newTimeObj.hours = 0;
        newTimeObj.days += 1;
      }
      setProgress(
        //percent of the day
        ((timeObj.hours * 3600 + timeObj.minutes * 60 + timeObj.seconds) /
          86400) *
          100
      );
      setTimeObj(newTimeObj);
      setClock(
        `${newTimeObj.hours < 10 ? "0" : ""}${newTimeObj.hours}:${
          newTimeObj.minutes < 10 ? "0" : ""
        }${newTimeObj.minutes}:${newTimeObj.seconds < 10 ? "0" : ""}${
          newTimeObj.seconds
        }`
      );
    }, 30);

    return () => clearInterval(interval);
  }, [timeObj.seconds, timeObj.minutes, timeObj.hours, timeObj.days]);

  useEffect(() => {
    setCurrentPage({
      page: "about",
      title: "Unchain.",
    });
  }, [setCurrentPage]);

  return (
    <div className="about">
      <div className="aboutDiv">
        <h1 className="aboutTitle">Unchain Yourself From Your Addictions.</h1>

        <div className="what">
          <h2 className="whatTitle smallTitle">What is Unchain?</h2>
          <p className="whatBody">
            Unchain is a simplistic and lightweight web application that allows
            you to track your unhealthy habits and break free from them.
          </p>
        </div>

        {currentUser ? (
          <button
            className="aboutBtn dashButton"
            onClick={() => {
              setCurrentPage({
                page: "home",
                title: "Unchain.",
              });
              navigate("/");
            }}
          >
            Go To Dashboard
          </button>
        ) : (
          <div className="loginButton">
            <button className="aboutBtn" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button onClick={() => navigate("/signup")} className="signUpLink">
              ...or click here to sign up for free!
            </button>
          </div>
        )}

        <div className="timerAbt">
          <CircularProgressbarWithChildren
            value={progress}
            styles={buildStyles({
              textSize: "1rem",
              strokeLinecap: "round",
              top: "0",
              left: "0",
            })}
            strokeWidth={4}
          >
            <div className="timerContents">
              <h1 className="days">
                {timeObj.days !== 1
                  ? Math.floor(timeObj.days) + " days"
                  : Math.floor(timeObj.days) + " day"}
              </h1>
              <h2 className="clock">{clock}</h2>

              <h3 className="sobriety">of freedom</h3>
            </div>
          </CircularProgressbarWithChildren>
        </div>

        <div className="what">
          <h2 className="whatTitle smallTitle">What does Unchain do?</h2>
          <ul className="features-list">
            <li className="features-bullet">
              Provides a server-side sobriety counter to help visualize and
              track total time of sobriety
            </li>
            <li className="features-bullet">
              Maintains a history of all past sobriety streaks
            </li>
            <li className="features-bullet">
              Grants achievements for sobriety time milestones
            </li>
            <li className="features-bullet">
              Features a built in panic button to direct the user to helpful
              resources catered to their specific addiction.
            </li>
          </ul>
        </div>

        <div className="why">
          <h2 className="whyTitle smallTitle">Why make this app?</h2>
          <p className="whyBody">
            I was on social media and I noticed people looking for an app that
            could help them track their sobriety progress. Having recently
            learned web application development, I saw this as a perfect
            opportunity to make an app to help them keep free from their
            addictive habits and achieve their sobriety goals. I knew that I was
            capable of making something that could make a positive impact on
            these people's lives. I could not miss that opportunity.
          </p>
        </div>

        <div className="cost">
          <h2 className="costTitle smallTitle">How much does it cost?</h2>
          <p className="whyBody">
            Nothing! This app is <b>entirely free</b> to use. There are no ads
            or microtransactions in this app. If someone is asking you to pay to
            use this app, they are scamming you.
          </p>
        </div>
        {currentUser ? (
          <button
            className="aboutBtn dashButton"
            onClick={() => {
              setCurrentPage({
                page: "home",
                title: "Unchain.",
              });
              navigate("/");
            }}
          >
            Go To Dashboard
          </button>
        ) : (
          <div className="loginButton">
            <button className="aboutBtn" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button onClick={() => navigate("/signup")} className="signUpLink">
              ...or click here to sign up for free!
            </button>
          </div>
        )}
        <div className="contribute">
          <h2 className="contributeTitle smallTitle">
            Feel free to contribute!
          </h2>
          <p className="whyBody">
            This project is open source! Feel free to contribute to the codebase
            to further improve the app. Tips are also highly appreciated as they help support me while improving the app as well pay for expenses such as server costs.
          </p>
        </div>
        <button
          className="aboutBtn sourceButton"
          onClick={() => {
            window.open("https://github.com/HomemadeToast57/unchain", "_blank");
          }}
        >
          Take Me To the Source Code!
        </button>
        <a
          className="buyButton"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.buymeacoffee.com/jacksinger"
        >
          <img
            className="coffeeImage"
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
          />
          <span className="coffeeButtonText">Buy me a coffee!</span>
        </a>

        <div className="horizontalSeparatorContainer">
          <div className="horizontalSeparator"></div>
        </div>

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
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe"></i>
                  </a>
                  <a
                    className="creditLink github"
                    href="https://github.com/HomemadeToast57"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    className="creditLink twitter"
                    href="https://twitter.com/HomemadeToast57/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="creditLink linkedin"
                    href="https://www.linkedin.com/in/jacobasinger/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="horizontalSeparatorContainer">
          <div className="horizontalSeparator"></div>
        </div>

        <footer className="copyright">
          <small>
            &copy; Copyright {new Date().getFullYear()}. Unchain. Jacob (Jack)
            Singer. HomemadeToast57 - All rights reserved.
          </small>
          <p
            className="privacy"
            onClick={() => {
              navigate("/privacy");
            }}
          >
            Privacy Policy
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
