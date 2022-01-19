import React from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { TimeProvider } from "../../contexts/TimeContext";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../css/App.css";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import LogIn from "./Login";
import UserDataLoader from "../../loaders/UserDataLoader";
import AuthRoute from "./AuthRoute";
import ForgotPassword from "./ForgotPassword";
import TimeLoader from "../../loaders/TimeLoader";
import NavBar from "./NavBar";
import History from "./History";
import Ranks from "./Ranks";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <UserDataLoader>
                  <TimeProvider>
                    <TimeLoader>
                      <Dashboard />
                    </TimeLoader>
                  </TimeProvider>
                </UserDataLoader>
              }
            />
            <Route
              path="/history"
              element={
                <UserDataLoader>
                  <TimeProvider>
                    <TimeLoader>
                      <History />
                    </TimeLoader>
                  </TimeProvider>
                </UserDataLoader>
              }
            />
            <Route
              path="/rank"
              element={
                <UserDataLoader>
                  <TimeProvider>
                    <TimeLoader>
                      <Ranks />
                    </TimeLoader>
                  </TimeProvider>
                </UserDataLoader>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <LogIn />
                </AuthRoute>
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<h1>Page Not Found: Error 404</h1>} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
