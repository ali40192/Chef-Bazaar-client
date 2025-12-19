import React from "react";
import NavBar from "../Components/Common/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Common/footer";

const AuthLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
     
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
