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
    enabled: !!user?.email,
  });

  const { data: Adminrequests, refetch: refetchAdmin } = useQuery({
    queryKey: ["admin-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-requests`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateRoleRequest = async (email, role) => {
    try {
      await axiosSecure.patch(`/update-role`, { email, role });
      toast.success("Role Updated Successfully");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateAdminRoleRequest = async (email, role) => {
    try {
      await axiosSecure.patch(`/become-admin`, { email, role });
      toast.success("Role Updated Successfully");
      refetchAdmin();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChefReject = async (email) => {
    try {
      await axiosSecure.patch(`/become-rejectChef`, { email });
      toast.error("Your Request is Rejected");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAdminReject = async (email) => {
    try {
      await axiosSecure.patch(`/become-rejectAdmin`, { email });
      toast.error("Your Request is Rejected");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading requests: {error.message}
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl shadow-lg p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Manage Role Requests
      </h2>

      <table className="table table-zebra w-full">
        {/* Head */}
        <thead className="bg-base-200 sticky top-0 z-10">
          <tr className="uppercase text-xs tracking-wide text-gray-600">
            <th>Name</th>
            <th>Email</th>
            <th>Request Type</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* Chef Requests */}
          {requests && requests.length > 0 ? (
            requests.map((req, i) => (
              <tr key={i} className="hover:bg-base-200/50">
                <td className="font-semibold text-primary">{req.userName}</td>
                <td className="text-sm text-gray-600">{req.userEmail}</td>

                <td>
                  <span
                    className={`badge px-4 py-2 font-bold ${
                      req.requestType === "admin"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {req.requestType.toUpperCase()}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge badge-outline px-4 py-2 ${
                      req.requestStatus === "pending"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>

                <td className="flex flex-col gap-2 items-center">
                  <button
                    disabled={req.requestStatus === "rejected"}
                    onClick={() =>
                      updateRoleRequest(req.userEmail, req.requestType)
                    }
                    className={`btn btn-xs w-28 ${
                      req.requestStatus === "rejected"
                        ? "btn-disabled"
                        : "btn-outline btn-primary"
                    }`}
                  >
                    Make Chef
                  </button>

                  <button
                    disabled={req.requestStatus === "rejected"}
                    onClick={() => handleChefReject(req.userEmail)}
                    className={`btn btn-xs w-28 ${
                      req.requestStatus === "rejected"
                        ? "btn-disabled"
                        : "btn-outline btn-error"
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No chef requests found
              </td>
            </tr>
          )}

          {/* Admin Requests */}
          {Adminrequests && Adminrequests.length > 0 ? (
            Adminrequests.map((req, i) => (
              <tr key={i} className="hover:bg-base-200/50">
                <td className="font-semibold text-primary">{req.userName}</td>
                <td className="text-sm text-gray-600">{req.userEmail}</td>

                <td>
                  <span className="badge badge-info px-4 py-2 font-bold">
                    ADMIN
                  </span>
                </td>

                <td>
                  <span
                    className={`badge badge-outline px-4 py-2 ${
                      req.requestStatus === "pending"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>

                <td className="flex flex-col gap-2 items-center">
                  <button
                    disabled={req.requestStatus === "rejected"}
                    onClick={() =>
                      updateAdminRoleRequest(req.userEmail, req.requestStatus)
                    }
                    className={`btn btn-xs w-28 ${
                      req.requestStatus === "rejected"
                        ? "btn-disabled"
                        : "btn-success text-white"
                    }`}
                  >
                    Make Admin
                  </button>

                  <button
                    disabled={req.requestStatus === "rejected"}
                    onClick={() => handleAdminReject(req.userEmail)}
                    className={`btn btn-xs w-28 ${
                      req.requestStatus === "rejected"
                        ? "btn-disabled"
                        : "btn-error text-white"
                    }`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                No admin requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRequests;
