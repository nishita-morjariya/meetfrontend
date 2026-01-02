import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isLoggedIn) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userRole !== "admin") {
    // Not an admin → redirect to home or portfolio
    return <Navigate to="/portfolio" replace />;
  }

  return children;
}
