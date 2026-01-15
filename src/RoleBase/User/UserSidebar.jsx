import { Heart, ShoppingCart, Star } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const UserSidebar = () => {
  const baseClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const inactiveClass = "text-gray-600 hover:bg-primary/10 hover:text-primary";

  const activeClass = "bg-primary text-white font-semibold shadow-md";

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
        User Dashboard
      </h4>

      <ul className="space-y-2">
        <li>
          <NavLink
            to="/dashboard/my-orders"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <ShoppingCart size={22} />
            <span>My Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/my-reviews"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Star size={22} />
            <span>My Reviews</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/favourite"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Heart size={22} />
            <span>Favorite Meal</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
