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
                : "border-b border-gray-200 text-md p-2  shadow-md hover:bg-gray-100 hover:text-primary"
            }
          >
            ➕ Create Meal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/my-meals"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : "border-b border-gray-200 text-md p-2  shadow-md hover:bg-gray-100 hover:text-primary"
            }
          >
            🍽 My Meals
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/order-requests"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-md bg-primary text-white rounded-md p-2"
                : "border-b border-gray-200 text-md p-2  shadow-md hover:bg-gray-100 hover:text-primary"
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
