import React from "react";
import ReactDOM from "react-dom";
import App from "./components/js/App";
import "./components/css/Variables.css";
import "./components/css/index.css";
import $ from "jquery";

$(window).on('load', function () {
  $("body").removeClass("preload");
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
