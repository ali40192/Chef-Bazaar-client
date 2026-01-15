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

  if (isLoading) return <Loader />;

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">Manage Users</h2>

      <table className="table table-zebra w-full">
        {/* Head */}
        <thead className="bg-base-200 sticky top-0 z-10">
          <tr className="text-sm uppercase tracking-wide text-gray-600">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, index) => (
            <tr key={index} className="hover:bg-base-200/50 transition-colors">
              <th>{index + 1}</th>

              <td className="font-semibold text-primary">{user.name}</td>

              <td className="text-sm text-gray-600">{user.email}</td>

              {/* Status */}
              <td>
                <span
                  className={`badge badge-outline px-4 py-2 font-semibold ${
                    user.status === "active" ? "badge-success" : "badge-error"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              {/* Role */}
              <td>
                <span
                  className={`badge px-4 py-2 font-bold ${
                    user.role === "chef" ? "badge-info" : "badge-neutral"
                  }`}
                >
                  {user.role.toUpperCase()}
                </span>
              </td>

              {/* Action */}
              <td className="text-center">
                {user.status === "fraud" ? (
                  <button
                    disabled
                    className="btn btn-xs btn-disabled opacity-60"
                  >
                    Make Fraud
                  </button>
                ) : (
                  <button
                    onClick={() => handleFraude(user.email)}
                    className="btn btn-xs bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Make Fraud
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
