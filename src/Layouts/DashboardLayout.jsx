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
    return <Loader />;
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* Header */}
        <header
          className="h-[88px] sticky top-0 z-30 flex items-center justify-between
          bg-base-100/90 backdrop-blur-md shadow-sm px-4 border-b"
        >
          <div className="flex items-center gap-2">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost lg:hidden text-xl"
            >
              ☰
            </label>
          </div>

          <div>
            <span
              className="text-lg sm:text-xl font-semibold tracking-wide
              bg-gradient-to-r from-primary to-secondary
              text-white px-5 py-2 rounded-xl shadow-md"
            >
              Dashboard
            </span>
          </div>

          <div />
        </header>

        {/* Main */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div
            className="max-w-7xl mx-auto bg-base-100 rounded-3xl shadow-md
            p-4 sm:p-6 min-h-[calc(100vh-140px)]"
          >
            {outlet || <MessagePage />}
          </div>
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side z-40">
        <label htmlFor="dashboard-drawer" className="drawer-overlay" />

        <aside className="w-72 bg-base-100 border-r shadow-xl flex flex-col h-full">
          {/* Profile */}
          <div className="h-[88px] px-5 border-b flex items-center gap-4">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || ""} alt="User" />
              </div>
            </div>

            <Link
              to="/dashboard/my-profile"
              className="font-semibold text-sm sm:text-base
                px-3 py-2 rounded-lg
                hover:bg-primary/10 hover:text-primary
                transition-all duration-200"
            >
              My Profile
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {role === "admin" && <AdminSidebar />}
            {role === "chef" && <ChefSidebar />}
            {role === "user" && <UserSidebar />}
          </nav>

          {/* Footer Buttons */}
          <div className="p-4 border-t bg-base-100 space-y-2">
            <Link
              to="/"
              className="btn btn-outline btn-primary w-full rounded-xl"
            >
              Back To Home
            </Link>

            <button
              onClick={signOutUser}
              className="btn btn-primary w-full rounded-xl"
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
