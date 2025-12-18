import React, { useState } from "react";

const SellectBtn = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
  };

  return (
    <select value={selectedRole} onChange={handleRoleChange} className="select">
      <option value="" disabled>
        Pick the Role
      </option>
      <option value="user">User</option>
      <option value="chef">Chef</option>
      <option value="admin">Admin</option>
    </select>
  );
};

export default SellectBtn;
