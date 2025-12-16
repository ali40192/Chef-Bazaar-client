import React from "react";

const AdminSidebar = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
        Admin Dashboard
      </h4>
      <ul className="menu space-y-1">
        <li>
          <a className="flex gap-3">👥 Manage Users</a>
        </li>
        <li>
          <a className="flex gap-3">🛠 Manage Requests</a>
        </li>
        <li>
          <a className="flex gap-3">🛠 Platform Statistics</a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
