import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ requiredRole = "customer" }) => {
  const { role, isLoggedIn } = useSelector((state) => state.user);
  const isAuthenticated = isLoggedIn && role === requiredRole;

  // return isAuthenticated ? (
  //   <Outlet />
  // ) : role === requiredRole ? (
  //   Navigate({ to: "/sign-in" })
  // ) : (
  //   Navigate({ to: "/unauthorized" })
  // );

  if (!isAuthenticated) {
    Navigate({ to: "/sign-in" });
  }
  if (role === "admin") {
    Navigate({ to: "/dashboard" });
  }
  if (role !== "admin" && !isAuthenticated) {
    Navigate({ to: "/unauthorized" });
  }
  return <Outlet />;
};

export default ProtectedRoutes;
