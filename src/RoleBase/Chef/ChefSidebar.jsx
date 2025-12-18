import React from "react";
import { NavLink } from "react-router";

const ChefSidebar = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
        Chef Dashboard
      </h4>
      <ul className="menu space-y-1">
        <li>
          <NavLink
            to="/dashboard/createmeals"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            ➕ Create Meal
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            🍽 My Meals
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : ""
            }
          >
            📦 Order Requests
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ChefSidebar;
