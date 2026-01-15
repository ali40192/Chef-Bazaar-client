import React from "react";
import { NavLink } from "react-router";
import { MdManageAccounts } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { GiNetworkBars } from "react-icons/gi";

const AdminSidebar = () => {
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const inactiveClass = "text-gray-600 hover:bg-primary/10 hover:text-primary";

  const activeClass = "bg-primary text-white font-semibold shadow-md";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
        Admin Dashboard
      </h4>

      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <MdManageAccounts size={22} />
            <span>Manage Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/manage-requests"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <RiAdminFill size={22} />
            <span>Manage Requests</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/platform-statistics"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <GiNetworkBars size={22} />
            <span>Platform Statistics</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
