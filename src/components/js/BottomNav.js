import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const BottomNav = () => {
  const navigateTo = useNavigate();
  const { setCurrentPage, currentPage, dataObj } = useAuth();

  const handlePanic = async () => {
    const panicLinks = {
      pornography:
        "https://emergency.nofap.com/director.php?cat=em&religious=false", //Thank you Jack Fischer for this amazing tool! You are helping so many people out there!
      alcohol: [
        "https://www.youtube.com/watch?v=6EghiY_s2ts",
        "https://www.youtube.com/watch?v=bOQxOthLSCA",
        "https://www.youtube.com/watch?v=Xpl9Egv861U",
        "https://www.youtube.com/watch?v=b2VN9cgWYZg",
      ],
      default: "https://www.samhsa.gov/find-help/national-helpline",
    };

    switch (dataObj.addictionType) {
      case "pornography":
      case "sex":
        //fetch text from url
        await fetch(panicLinks.pornography).then((response) => {
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
        break;
      case "alcohol":
        //pick random link from array
        let randomLink =
          panicLinks.alcohol[
            Math.floor(Math.random() * panicLinks.alcohol.length)
          ];
        //go to random link
        window.open(randomLink, "_blank");
        break;
      case "drug":
      case "gambling":
      case "nicotine":
        window.open(panicLinks.default, "_blank");
        break;
      default:
        window.open(panicLinks.default, "_blank");
        break;
    }
  };

  return (
    <div className="bottomButtons">
      <div className="home bottomButtonContainer">
        <button
          className={`bottomButton ${
            currentPage.page === "home" ? "active" : null
          }`}
          onClick={() => {
            setCurrentPage({
              page: "home",
              title: "Unchain",
            });
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
            currentPage.page === "rank" ? "active" : null
          }`}
          onClick={() => {
            setCurrentPage({
              page: "rank",
              title: "Ranks",
            });
            navigateTo("/rank");
          }}
        >
          <i className="fas fa-star"></i>
          <h1 className="bottomButtonText">Rank</h1>
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
          className={`bottomButton ${
            currentPage.page === "history" ? "active" : null
          }`}
          onClick={() => {
            setCurrentPage({
              page: "history",
              title: "History",
            });
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
