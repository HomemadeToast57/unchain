import React from "react";
import "../css/Alert.css";

const Alert = ({ errorMessage, color, handleAlertClose }) => {
  function getHex() {
    switch (color) {
      case "red":
        return "#f44336";
      case "green":
        return "#38824c";
      default:
        return "#ffffff";
    }
  }

  return (
    <div className="alert" style={{ backgroundColor: getHex(color) }}>
      <span className="closebtn" onClick={() => handleAlertClose()}>
        &times;
      </span>
      {errorMessage ? errorMessage : "No error message"}
    </div>
  );
};

export default Alert;
