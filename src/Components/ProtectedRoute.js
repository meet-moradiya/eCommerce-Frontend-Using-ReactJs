import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, childern, adminOnly, admin, redirect = "/" }) {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (adminOnly && !admin) {
    return <Navigate to={redirect} />;
  }

  return childern ? childern : <Outlet />;
}

export default ProtectedRoute;
