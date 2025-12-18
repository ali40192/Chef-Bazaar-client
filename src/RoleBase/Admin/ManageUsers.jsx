import React from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Common/Loader";
import SellectBtn from "../../Components/Common/SellectBtn";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-users");
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {users?.map((user, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <SellectBtn email={user.email}></SellectBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
