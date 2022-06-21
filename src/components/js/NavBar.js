import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../css/NavBar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const NavBar = () => {
  const { currentUser, logout, currentPage, setCurrentPage } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    let nav = document.getElementById("appNav");
    nav.setAttribute("page", currentPage.page);
  }, [currentPage]);

  const handleClick = () => {
    document.getElementById("check").checked = false;
  };

  async function handleLogout() {
    handleClick();
    try {
      await logout();
      // navigate("/login");
    } catch (error) {
      console.log("error logging out: ", error);
    }
  }

  const goHome = () => {
    setCurrentPage({
      page: "home",
      title: "Unchain.",
    });
    if (currentUser) {
      navigate("/");
    } else {
      navigate("/about");
    }
  };

  const goSettings = () => {
    handleClick();
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
      <ul className="navList">
        <li className="navItem">
          <div className="navElement">
            <button
              title="Change Theme"
              className={"navButton"}
              onClick={changeTheme}
            >
              <i
                className={`fas fa-${
                  theme === "light" ? "moon" : "sun"
                } iconNav`}
              ></i>
            </button>
          </div>
        </li>
        {currentUser && (
          <li className="navItem">
            <div className="navElement">
              <h1 className="userEmailNav">{currentUser.email}</h1>
            </div>
          </li>
        )}
        {currentUser && (
          <li className="navItem">
            <div className="navElement">
              <button onClick={goSettings} className="navLink" to={"/settings"}>
                Settings
              </button>
            </div>
          </li>
        )}
        <li className="navItem">
          <div className="navElement">
            <button
              title="About Unchain"
              className={"navButton"}
              onClick={() => {
                handleClick();
                navigate("/about");
              }}
            >
              <i className="fas fa-info iconNav"></i>
            </button>
          </div>
        </li>
        {currentUser && (
          <li className="navItem">
            <div className="navElement">
              <button
                title="Log Out"
                className={"navButton"}
                onClick={handleLogout}
              >
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
