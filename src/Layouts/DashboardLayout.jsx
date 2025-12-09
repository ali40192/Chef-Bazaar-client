import React from "react";
import NavBar from "../Components/Common/NavBar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
