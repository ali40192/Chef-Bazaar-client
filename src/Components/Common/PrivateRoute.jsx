import React from "react";
import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
