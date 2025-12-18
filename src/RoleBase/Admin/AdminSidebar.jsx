import React from "react";
import { Link } from "react-router";
import { MdManageAccounts } from "react-icons/md";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";

const AdminSidebar = () => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">
        Admin Dashboard
      </h4>
      <ul className="menu space-y-1">
        <li>
          <Link to="/dashboard/manage-users" className="flex  gap-3">
            <MdManageAccounts /> Manage Users
          </Link>
        </li>
        <li>
          <Link to="/dashboard/manage-requests" className="flex gap-3">
            <VscGitPullRequestNewChanges /> Manage Requests
          </Link>
        </li>
        <li>
          <a className="flex gap-3">🛠 Platform Statistics</a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
