import React from "react";
import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import UserSidebar from "../RoleBase/User/UserSidebar";
import ChefSidebar from "../RoleBase/Chef/ChefSidebar";
import AdminSidebar from "../RoleBase/Admin/AdminSidebar";

const DashboardLayout = () => {
  const { user, signOutUser } = useAuth();
  return (
    <div className="drawer min-h-screen ">
      {/* Drawer Toggle */}
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle peer"
      />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow px-4">
          {/* Toggle Button */}
          <label
            htmlFor="dashboard-drawer"
            className="btn btn-square btn-ghost relative"
          >
            <span className="absolute text-xl transition-all duration-300 peer-checked:rotate-90 peer-checked:opacity-0">
              ☰
            </span>
            <span className="absolute text-xl transition-all duration-300 rotate-90 opacity-0 peer-checked:rotate-0 peer-checked:opacity-100">
              ✕
            </span>
          </label>

          <Link to="/" className="text-xl font-bold ml-3">
            Dashboard
          </Link>
        </div>

        {/* Page Content */}
        <div className="p-6 bg-base-200 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 bg-base-100 shadow-xl flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 border-b flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-primary text-white rounded-full w-12">
                <img src={user?.photoURL || ""} alt="" />
              </div>
            </div>
            <div>
              <h3 className="font-bold">{user?.displayName || "User Name"}</h3>
              <p className="text-sm text-gray-500">
                {user?.email || "user@email.com"}
              </p>
            </div>
          </div>

          {/* MENU CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* USER SECTION */}
            <UserSidebar></UserSidebar>

            {/* CHEF SECTION */}
            <ChefSidebar></ChefSidebar>

            {/* ADMIN SECTION */}
            <AdminSidebar></AdminSidebar>
          </div>

          {/* SIDEBAR FOOTER */}
          <div className="p-4 border-t">
            <button
              onClick={signOutUser}
              className="btn btn-outline btn-error w-full"
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
