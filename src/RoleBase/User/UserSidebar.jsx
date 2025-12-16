import React from "react";
import { Link } from "react-router";

const UserSidebar = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
        User Dashboard
      </h4>
      <ul className="menu space-y-1">
        <li>
          <Link to="/dashboard/my-orders" className="flex gap-3">
            🛒 My Orders
          </Link>
        </li>
        <li>
          <a className="flex gap-3">⭐ My Reviews</a>
        </li>
        <li>
          <a className="flex gap-3">❤️ Favorite Meal</a>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
