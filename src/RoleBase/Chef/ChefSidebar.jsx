import { Box, Plus, Soup } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const ChefSidebar = () => {
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const inactiveClass = "text-gray-600 hover:bg-primary/10 hover:text-primary";

  const activeClass = "bg-primary text-white font-semibold shadow-md";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
        Chef Dashboard
      </h4>

      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard/createmeals"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Plus size={22} />
            <span>Create Meal</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/my-meals"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Soup size={22} />
            <span>My Meals</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/order-requests"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Box size={22} />
            <span>Order Requests</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ChefSidebar;
