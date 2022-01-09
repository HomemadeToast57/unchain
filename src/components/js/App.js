import React from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../css/App.css";
import SignUp from "./Signup";
import Dashboard from "./Dashboard";
import LogIn from "./Login";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
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
    </Router>
  );
}

export default App;
