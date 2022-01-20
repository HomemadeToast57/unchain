import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const BottomNav = () => {
  const navigateTo = useNavigate();
  const { setCurrentPage, currentPage, dataObj } = useAuth();
  const [showPanic, setShowPanic] = useState(false);

  useEffect(() => {
    if (dataObj.addictionType === "pornography") {
      return setShowPanic(true);
    } else {
      return setShowPanic(false);
    }
  }, [dataObj, dataObj.addictionType]);

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
          className={`bottomButton ${
            currentPage.toLowerCase() === "unchain" ? "active" : null
          }`}
          onClick={() => {
            setCurrentPage("Unchain");
            navigateTo("/");
          }}
        >
          <i className="fas fa-home"></i>
          <h1 className="bottomButtonText">Home</h1>
        </button>
      </div>
      <div className="ranks bottomButtonContainer">
        <button
          className={`bottomButton ${
            currentPage.toLowerCase() === "my rank" ? "active" : null
          }`}
          onClick={() => {
            setCurrentPage("My Rank");
            navigateTo("/rank");
          }}
        >
          <i className="fas fa-star"></i>
          <h1 className="bottomButtonText">Rank</h1>
        </button>
      </div>
      {showPanic && (
        <div className="panic bottomButtonContainer">
          <button onClick={() => handlePanic()} className="bottomButton">
            <i className="fas fa-user-shield"></i>
            <h1 className="bottomButtonText">Panic</h1>
          </button>
        </div>
      )}
      <div className="history bottomButtonContainer">
        <button
          className={`bottomButton ${
            currentPage.toLowerCase() === "history" ? "active" : null
          }`}
          onClick={() => {
            setCurrentPage("History");
            navigateTo("/history");
          }}
        >
          <i className="fas fa-history"></i>
          <h1 className="bottomButtonText">History</h1>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
