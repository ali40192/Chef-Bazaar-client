import React from "react";
import useRole from "../hooks/useRole";
import Loader from "../Components/Common/Loader";
import { Navigate } from "react-router";

const ChefRoute = ({ children }) => {
  const [role, isRoleloading] = useRole();

  if (isRoleloading) return <Loader></Loader>;
  if (role === "chef") return children;
  return <Navigate to="/" replace="true" />;
};

export default ChefRoute;
