import React from "react";
import { Link, NavLink } from "react-router";

const UserSidebar = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
        User Dashboard
      </h4>
      <ul className="menu space-y-1">
        <li>
          <NavLink
            to="/dashboard/my-orders"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            🛒 My Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/my-reviews"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            ⭐ My Reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/favourite"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            ❤️ Favorite Meal
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
