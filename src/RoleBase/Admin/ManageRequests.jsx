import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../Components/Common/Loader";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ManageRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: requests,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["chef-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/chef-requests`);
      return res.data;
    },
    enabled: !!user?.email, // Only run if user email exists
  });

  const updateRoleRequest = async (email, role) => {
    try {
      await axiosSecure.patch(`/update-role`, { email, role });
      toast.success("Role Updated Successfully");
      refetch(); // Refresh the requests list
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading requests: {error.message}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Request Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {requests && requests.length > 0 ? (
            requests.map((req, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td>{req.requestType}</td>
                <td>{req.requestStatus}</td>
                <td>
                  <button
                    onClick={() =>
                      updateRoleRequest(req.userEmail, req.requestType)
                    }
                    className="btn btn-secondary"
                  >
                    Make Chef
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No chef requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
