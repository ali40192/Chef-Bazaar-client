import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Common/Loader";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user } = useAuth();
  console.log(user.accessToken);
  const axiosSecure = useAxiosSecure();

  const [role, isRoleloading] = useRole();
  const { data: userDetails } = useQuery({
    queryKey: ["userDetails", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  ////////confirm become a seller
  const handleConfirm = () => {
    Swal.fire({
      title: "Are you sure to become a chef?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Want!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/become-chef", { userDetails })
          .then((res) => {
            toast.success("Your request send to admin", res);
          })
          .catch((err) => {
            toast.error(err.message);
          });

        Swal.fire({
          title: "Confirmed!",
          text: "Your file Send To Admin.",
          icon: "success",
        });
      }
    });
  };

  ////become an Admin
  const adminConfirm = async () => {
    Swal.fire({
      title: "Are you sure to become an Admin?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Want!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.post("/become-admin", { userDetails }).then((res) => {
            toast.success("Your request send to admin", res);
          });
        } catch (error) {
          toast.error(error.message);
        }

        Swal.fire({
          title: "Confirmed!",
          text: "Your file Send To Admin.",
          icon: "success",
        });
      }
    });
  };

  const profile = {
    name: user?.displayName || "Jannah",
    email: user?.email || "john@example.com",
    image: user?.photoURL || "https://i.ibb.co/2M7rtLk/avatar.png",
    address:
      userDetails?.district && userDetails?.region
        ? `${userDetails.district}, ${userDetails.region}`
        : "Dhaka, Bangladesh",
    role: role,
    status: userDetails?.status,
    chefId: userDetails?.chefId,
  };

  if (isRoleloading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-base-100 shadow-xl rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={profile.image}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          {/* Address */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Address</p>
            <p className="font-semibold">{profile.address}</p>
          </div>

          {/* Role */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <span className="badge badge-info px-4 py-3">{profile.role}</span>
          </div>

          {/* Status */}
          <div className="mb-2">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span
              className={`badge px-4 py-3 ${
                profile.status === "active" ? "badge-success" : "badge-error"
              }`}
            >
              {profile.status}
            </span>
          </div>

          {/* Chef ID  */}
          {role === "chef" && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Chef ID</p>
              <p className="font-semibold">{profile.chefId}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {role === "user" && (
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button onClick={handleConfirm} className="btn btn-primary flex-1">
              Be a Chef
            </button>
            <button
              onClick={adminConfirm}
              className="btn btn-outline btn-secondary flex-1"
            >
              Be an Admin
            </button>
          </div>
        )}
        {role === "chef" && (
          <button
            onClick={adminConfirm}
            className="btn btn-outline btn-secondary w-full"
          >
            Be an Admin
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
