import React from "react";
import {AuthProvider} from "../../contexts/AuthContext";
import "../css/App.css";
import SignUp from "./SignUp";

function App() {

  return (
    <AuthProvider>
      <div className="app">
        <SignUp />
      </div>
    </AuthProvider>
    
  );
}

export default App;
