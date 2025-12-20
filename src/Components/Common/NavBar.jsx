import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router";

import Logo from "./Logo";

const NavBar = () => {
  const { user, signOutUser } = useAuth();
  const Links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-md text-[#E2852E]" : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allmeals"
          className={({ isActive }) =>
            isActive ? "font-bold text-md text-[#E2852E]" : ""
          }
        >
          Meals
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "font-bold text-md text-[#E2852E]" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar  bg-base-100 shadow-sm border-b border-b-[#E2852E]">
      <div className="navbar-start ml-8">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <div>
          <Logo></Logo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end mr-8">
        {user ? (
          <button onClick={signOutUser} className="btn btn-primary ">
            SignOut
          </button>
        ) : (
          <Link to="/auth/login" className="btn btn-secondary">
            Login
          </Link>
        )}

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            {user ? (
              <img src={user.photoURL} alt="user" />
            ) : (
              <img
                alt="Profile Picture"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
