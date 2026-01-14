import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element: Component,
  loginPath,
  role = "ROLE_CUSTOMER",
}) => {
  try {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
      return <Navigate to={loginPath} />;
    }

    // Decode token and check role
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.role, "role");
    // Optional: Add token expiration check
    const isTokenExpired = decodedToken.exp < Date.now() / 1000;
    if (isTokenExpired) {
      localStorage.removeItem("token");
      return <Navigate to={loginPath} />;
    }

    // Strict role checking - only exact role match allowed
    if (decodedToken.role === role) {
      return <Component />;
    }

    // Redirect if role doesn't match
    return <Navigate to={loginPath} />;
  } catch (error) {
    // Handle decoding errors
    console.error("Token validation error:", error);
    localStorage.removeItem("token");
    return <Navigate to={loginPath} />;
  }
};

export default ProtectedRoute;
