import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const BottomNav = () => {
  const navigateTo = useNavigate();
  const { setCurrentPage } = useAuth();

  const handlePanic = () => {
    const url =
      "https://emergency.nofap.com/director.php?cat=em&religious=false"; //Thank you Jack Fischer for this amazing tool! You are helping so many people out there!
    //fetch text from url
    fetch(url).then((response) => {
      //fetch text from url
      if (response.ok) {
        response.text().then((text) => {
          //if text is not empty, then parse it and set currentPage to the text
          if (text !== "") {
            window.open(text, "_blank");
          }
        });
      }
    });
  };

  return (
    <div className="bottomButtons">
      <div className="home bottomButtonContainer">
        <button
          onClick={() => {
            setCurrentPage("Unchain");
            navigateTo("/");
          }}
          className="bottomButton"
        >
          <i className="fas fa-home"></i>
          <h1 className="bottomButtonText">Home</h1>
        </button>
      </div>
      <div className="ranks bottomButtonContainer">
        <button
          onClick={() => {
            setCurrentPage("My Rank");
            navigateTo("/rank");
          }}
          className="bottomButton"
        >
          <i className="fas fa-star"></i>
          <h1 className="bottomButtonText">My Rank</h1>
        </button>
      </div>
      <div className="panic bottomButtonContainer">
        <button onClick={() => handlePanic()} className="bottomButton">
          <i className="fas fa-user-shield"></i>
          <h1 className="bottomButtonText">Panic</h1>
        </button>
      </div>
      <div className="history bottomButtonContainer">
        <button
          onClick={() => {
            setCurrentPage("History");
            navigateTo("/history");
          }}
          className="bottomButton"
        >
          <i className="fas fa-history"></i>
          <h1 className="bottomButtonText">History</h1>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
