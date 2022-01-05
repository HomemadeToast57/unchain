import React, { useState } from "react";

import "../css/Alert.css";

const Alert = ({ errorMessage }) => {

  const [visible, setVisible] = useState(true);

  return (
    <div className="alert" style={{display: visible ? 'block' : 'none'}}> 
      <span
        className="closebtn"
        onClick={() => setVisible(false)}
      >
        &times;
      </span>
      {errorMessage ? errorMessage : "No error message"}
    </div>
  );
};

export default Alert;
