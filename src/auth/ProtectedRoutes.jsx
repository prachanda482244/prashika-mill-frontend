import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ requiredRole = "customer" }) => {
  const { role, isLoggedIn } = useSelector((state) => state.user);
  const isAuthenticated = isLoggedIn && role === requiredRole;

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
