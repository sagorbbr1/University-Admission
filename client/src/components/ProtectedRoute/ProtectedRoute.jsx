import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Spinner from "../Spninner/Spinner";

const ProtectedRoute = ({ children }) => {
  const { user, token, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
