import React from "react";
import { Link, NavLink } from "react-router";
import { MdManageAccounts } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { GiNetworkBars } from "react-icons/gi";

const AdminSidebar = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
        Admin Dashboard
      </h4>
      <ul className="menu space-y-1">
        <li>
          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            <MdManageAccounts /> Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/manage-requests"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            <RiAdminFill /> Manage Requests
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/platform-statistics"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            <GiNetworkBars /> Platform Statistics
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
