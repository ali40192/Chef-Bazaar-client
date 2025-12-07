import React, { use } from "react";
import AuthContext from "../Contexts/AuthContext";

const useAuth = () => {
  const Auth = use(AuthContext);
  return Auth;
};

export default useAuth;
