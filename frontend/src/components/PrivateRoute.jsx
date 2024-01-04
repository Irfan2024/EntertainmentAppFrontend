import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ component: component, ...rest }) => {
  console.log("Private Route page  is clicked");
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
