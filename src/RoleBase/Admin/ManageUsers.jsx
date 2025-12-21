import React from "react";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Common/Loader";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-users");
      return data;
    },
  });

  const handleFraude = async (email) => {
    try {
      const { data } = await axiosSecure.patch(`/become-fraud`, { email });
      toast.success("successfully became fraud", data);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

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
            <th>User Status</th>
            <th>User Role</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {users?.map(
            (user, index) => (
              console.log("is user", user),
              (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className="font-bold text-md text-primary">
                    {user.name}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.status === "active" ? (
                      <p className="text-green-500 font-bold">Active</p>
                    ) : (
                      <p className="text-red-500 font-bold">Fraud</p>
                    )}
                  </td>
                  <td>
                    {" "}
                    {user.role === "chef" ? (
                      <p className="text-green-500 font-bold">CHEF</p>
                    ) : (
                      <p className="text-red-500 font-bold">USER</p>
                    )}
                  </td>
                  <td>
                    {user.status === "fraud" ? (
                      <button
                        disabled="true"
                        onClick={() => handleFraude(user.email)}
                        className="btn btn-xs  btn-active"
                      >
                        Make Fraud
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFraude(user.email)}
                        className="btn btn-xs  btn-active text-white bg-red-600"
                      >
                        Make Fraud
                      </button>
                    )}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
