import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import { Home, LayoutDashboard, Soup } from "lucide-react";

const NavBar = () => {
  const { user, signOutUser } = useAuth();

  const Links = (
    <>
      {/* Home */}
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `group flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300
            ${
              isActive
                ? "bg-[#E2852E] text-white font-semibold shadow-lg"
                : "text-gray-600 hover:text-[#E2852E] hover:bg-[#E2852E]/10"
            }`
          }
        >
          <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-sm">Home</span>
        </NavLink>
      </li>

      {/* Meals */}
      <li>
        <NavLink
          to="/allmeals"
          className={({ isActive }) =>
            `group flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 mx-1
            ${
              isActive
                ? "bg-[#E2852E] text-white font-semibold shadow-lg"
                : "text-gray-600 hover:text-[#E2852E] hover:bg-[#E2852E]/10"
            }`
          }
        >
          <Soup className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-sm">Meals</span>
        </NavLink>
      </li>

      {/* Dashboard */}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `group flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-[#E2852E] text-white font-semibold shadow-lg"
                  : "text-gray-600 hover:text-[#E2852E] hover:bg-[#E2852E]/10"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-sm">Dashboard</span>
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#E2852E]/30 shadow-sm">
      {/* Left */}
      <div className="navbar-start ml-6">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-2xl mt-3 w-56 p-3 shadow-lg"
          >
            {Links}
          </ul>
        </div>

        <Logo />
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{Links}</ul>
      </div>

      {/* Right */}
      <div className="navbar-end mr-6 gap-3">
        {user ? (
          <button
            onClick={signOutUser}
            className="btn btn-primary rounded-xl px-6"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/auth/login" className="btn btn-secondary rounded-xl px-6">
            Login
          </Link>
        )}

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar ring ring-[#E2852E]/40 ring-offset-base-100 ring-offset-2"
        >
          <div className="w-10 rounded-full">
            <img
              src={
                user
                  ? user.photoURL
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="user"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
