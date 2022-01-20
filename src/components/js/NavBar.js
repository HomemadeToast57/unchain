import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../css/NavBar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const NavBar = () => {
  const { currentUser, logout, currentPage, setCurrentPage } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    let nav = document.getElementById("appNav");
    nav.setAttribute("page", currentPage.page);
  }, [currentPage]);

  async function handleLogout() {
    try {
      //set input with id of 'check' to false
      document.getElementById("check").checked = false;
      await logout();
      // navigate("/login");
    } catch (error) {
      console.log("error logging out: ", error);
    }
  }

  const goHome = () => {
    setCurrentPage({
      page: "home",
      title: "Unchain",
    });
    if (currentUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const goSettings = () => {
    document.getElementById("check").checked = false;
    setCurrentPage({
      page: "settings",
      title: "Settings",
    });
    navigate("/settings");
  };

  const changeTheme = async (e) => {
    //prevent reloading page
    e.preventDefault();
    return await toggleTheme();
  };

  const jsx = (
    <nav className={`${currentPage.page}Page`} id="appNav">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars hamburger"></i>
      </label>
      <label onClick={goHome} className="logo">
        {currentPage.title}
      </label>
      <ul>
        {!currentUser && (
          <li>
            <div className="navElement">
              <Link className="navLink" to={"/about"}>
                About
              </Link>
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
              <button onClick={goSettings} className="navLink" to={"/settings"}>
                Settings
              </button>
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
