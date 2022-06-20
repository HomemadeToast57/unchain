import React, { useEffect } from "react";
import { useTime } from "../../contexts/TimeContext";
import { useAuth } from "../../contexts/AuthContext";
import "../css/Dashboard.css";
import Timer from "./Timer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Dashboard = () => {
  // const [error, setError] = useState("");
  // const [quote, setQuote] = useState(
  //   quotes[Math.floor(Math.random() * quotes.length)]
  // );
  const { saveTime } = useTime();
  const { setCurrentPage } = useAuth();

  // function handleAlertClose() {
  //   setError("");
  // }

  useEffect(() => {
    setCurrentPage({
      page: "home",
      title: "Unchain.",
    });
  }, [setCurrentPage]);

  const submit = () => {
    confirmAlert({
      title: "Confirm to reset timer.",
      message:
        "Are you sure to do this? This cannot be undone. Your timer will be reset and will be tracked in your history.",
      buttons: [
        {
          label: "Yes",
          onClick: () => saveTime(),
        },
        {
          label: "No",
          onClick: () => {
            return true;
          },
        },
      ],
    });
  };

  const appJSX = (
    <div className="dashboard">
      <div className="timerContainer">
        <Timer />
      </div>
      {/* <div className="quoteContainer">
        <div className="quote">
          <h1>{quote.quote}</h1>
          <h2>{quote.author}</h2>
        </div>
      </div> */}
      <button
        className="resetBtn"
        style={{ marginTop: "20px" }}
        onClick={submit}
      >
        <i className="fas fa-undo-alt"></i>
      </button>
    </div>
  );

  return appJSX;
};

export default Dashboard;
