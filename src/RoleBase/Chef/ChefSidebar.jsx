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
          <NavLink to="/dashboard/createmeals" className="flex gap-3">
            ➕ Create Meal
          </NavLink>
        </li>
        <li>
          <a className="flex gap-3">🍽 My Meals</a>
        </li>
        <li>
          <a className="flex gap-3">📦 Order Requests</a>
        </li>
      </ul>
    </div>
  );
};

export default ChefSidebar;
