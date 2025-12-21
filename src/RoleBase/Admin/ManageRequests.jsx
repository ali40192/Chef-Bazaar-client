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

  const { data: Adminrequests, refetch: refetchAdmin } = useQuery({
    queryKey: ["admin-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin-requests`);
      return res.data;
    },
    enabled: !!user?.email, // Only run if user email exists
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
                <td className="text-primary">{req.userName}</td>
                <td>{req.userEmail}</td>
                <td>
                  {req.requestType === "admin" ? (
                    <p className="text-green-500">ADMIN</p>
                  ) : (
                    <p className="text-red-500">CHEF</p>
                  )}
                </td>
                <td>
                  {" "}
                  {req.requestStatus === "pending" ? (
                    <p className="text-green-500">Pending</p>
                  ) : (
                    <p className="text-red-500">Rejected</p>
                  )}
                </td>
                <td className="flex flex-col gap-1">
                  {req.requestStatus === "rejected" ? (
                    <button
                      disabled="true"
                      onClick={() =>
                        updateRoleRequest(req.userEmail, req.requestType)
                      }
                      className="btn btn-xs border border-primary"
                    >
                      Make Chef
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateRoleRequest(req.userEmail, req.requestType)
                      }
                      className="btn btn-xs border border-primary"
                    >
                      Make Chef
                    </button>
                  )}
                  {req.requestStatus === "rejected" ? (
                    <button
                      disabled="true"
                      className="btn btn-xs border border-primary"
                    >
                      Rejected
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleChefReject(req.userEmail, req.requestStatus)
                      }
                      className="btn btn-xs border border-primary"
                    >
                      Reject
                    </button>
                  )}
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

          {/* row 2 */}
          {Adminrequests && Adminrequests.length > 0 ? (
            Adminrequests.map((req, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td className="text-primary">{req.userName}</td>
                <td>{req.userEmail}</td>
                <td>
                  {req.requestType === "admin" ? (
                    <p className="text-green-500">ADMIN</p>
                  ) : (
                    <p className="text-red-500">CHEF</p>
                  )}
                </td>
                <td>
                  {req.requestStatus === "pending" ? (
                    <p className="text-green-500">Pending</p>
                  ) : (
                    <p className="text-red-500">Rejected</p>
                  )}
                </td>
                <td className="flex flex-col gap-1">
                  {req.requestStatus === "rejected" ? (
                    <button
                      disabled="true"
                      onClick={() =>
                        updateAdminRoleRequest(req.userEmail, req.requestStatus)
                      }
                      className="btn btn-xs border border-primary "
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateAdminRoleRequest(req.userEmail, req.requestStatus)
                      }
                      className="btn btn-xs border border-primary text-white bg-green-500"
                    >
                      Make Admin
                    </button>
                  )}
                  {req.requestStatus === "rejected" ? (
                    <button
                      disabled="true"
                      onClick={() => handleAdminReject(req.userEmail)}
                      className="btn btn-xs border border-primary"
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdminReject(req.userEmail)}
                      className="btn btn-xs border border-primary text-white bg-red-500"
                    >
                      Reject
                    </button>
                  )}
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
