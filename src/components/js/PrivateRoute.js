import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


const PrivateRoute = (props) => {
  const { currentUser } = useAuth()
  const user = currentUser;

  return (
    user ? props.children : <Navigate to="/login"/>
  )
};

export default PrivateRoute;
