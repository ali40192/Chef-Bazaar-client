import React from "react";
import { Link, useOutlet } from "react-router";
import useAuth from "../hooks/useAuth";
import AdminSidebar from "../RoleBase/Admin/AdminSidebar";
import ChefSidebar from "../RoleBase/Chef/ChefSidebar";
import UserSidebar from "../RoleBase/User/UserSidebar";
import useRole from "../hooks/useRole";
import Loader from "../Components/Common/Loader";
import MessagePage from "./MessagePage";

const DashboardLayout = () => {
  const outlet = useOutlet();
  const { user, signOutUser } = useAuth();
  const [role, isRoleloading] = useRole();

  if (isRoleloading) {
    return <Loader></Loader>;
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <header className="h-[88px] sticky top-0 z-30 navbar bg-base-100/80 backdrop-blur shadow-sm px-4 border-b">
          <div className="navbar-start">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              ☰
            </label>
          </div>

          <div className="navbar-center">
            <button className="text-xl font-semi-bold tracking-wide bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-lg text-white     ">
              Dashboard
            </button>
          </div>
          <div className="navbar-end"></div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-sm p-4 sm:p-6 min-h-[calc(100vh-120px)]">
            {outlet || <MessagePage></MessagePage>}
          </div>
        </main>
      </div>

      <div className="drawer-side z-40 ">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 bg-base-100 border-r shadow-lg flex flex-col h-full">
          <div className="h-[88px] px-6 border-b flex items-center gap-4">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || ""} alt="User" />
              </div>
            </div>
            <Link
              to="/dashboard/my-profile"
              className="font-semibold text-base hover:text-primary transition border-b border-gray-200 text-md p-2  shadow-md hover:bg-gray-100 rounded-lg -ml-3"
            >
              My Profile
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {role === "admin" && <AdminSidebar />}
            {role === "chef" && <ChefSidebar />}
            {role === "user" && <UserSidebar />}
          </nav>

          <div className="p-4 border-t bg-base-100">
            <Link to="/" className="btn border border-primary w-full">
              Back To Home
            </Link>
            <button
              onClick={signOutUser}
              className="btn btn-primary  w-full mt-2"
            >
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
