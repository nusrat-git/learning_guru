import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-3">Loading...</div>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
