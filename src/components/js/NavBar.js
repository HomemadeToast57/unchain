import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../css/NavBar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const NavBar = () => {
  const { currentUser, logout, currentPage } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      //set input with id of 'check' to false
      document.getElementById("check").checked = false;
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("error logging out: ", error);
    }
  }

  const goHome = () => {
    if (currentUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const changeTheme = async (e) => {
    //prevent reloading page
    e.preventDefault();
    return await toggleTheme();
  };

  const jsx = (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars hamburger"></i>
      </label>
      <label onClick={goHome} className="logo">
        {currentPage}
      </label>
      <ul>
        {!currentUser && (
          <li>
            <div className="navElement">
              <a href="/about">About</a>
            </div>
          </li>
        )}
        <li>
          <div className="navElement">
            <button className={"navButton"} onClick={changeTheme}>
              <i
                className={`fas fa-${
                  theme === "light" ? "moon" : "sun"
                } iconNav`}
              ></i>
            </button>
          </div>
        </li>
        {currentUser && (
          <li>
            <div className="navElement">
              <h1 className="userEmailNav">{currentUser.email}</h1>
            </div>
          </li>
        )}
        {currentUser && (
          <li>
            <div className="navElement">
              <button className={"navButton"} onClick={handleLogout}>
                <i className="fas fa-sign-out-alt iconNav"></i>
              </button>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );

  return jsx;
};

export default NavBar;
