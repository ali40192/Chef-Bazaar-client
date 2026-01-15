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

  const handleConfirm = () => {
    Swal.fire({
      title: "Are you sure to become a chef?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, I Want!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/become-chef", { userDetails })
          .then(() => toast.success("Your request send to admin"))
          .catch((err) => toast.error(err.message));

        Swal.fire("Confirmed!", "Your file Send To Admin.", "success");
      }
    });
  };

  const adminConfirm = () => {
    Swal.fire({
      title: "Are you sure to become an Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, I Want!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/become-admin", { userDetails })
          .then(() => toast.success("Your request send to admin"))
          .catch((err) => toast.error(err.message));

        Swal.fire("Confirmed!", "Your file Send To Admin.", "success");
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
    role,
    status: userDetails?.status,
    chefId: userDetails?.chefId,
  };

  if (isRoleloading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-base-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100 overflow-hidden">
            <img
              src={profile.image}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold">{profile.name}</h2>
            <p className="text-sm opacity-70">{profile.email}</p>

            <div className="mt-3 flex justify-center sm:justify-start gap-2">
              <span className="badge badge-outline badge-primary px-4 py-3">
                {profile.role}
              </span>
              <span
                className={`badge px-4 py-3 ${
                  profile.status === "active" ? "badge-success" : "badge-error"
                }`}
              >
                {profile.status}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Address
            </p>
            <p className="font-semibold text-lg">{profile.address}</p>
          </div>

          {role === "chef" && (
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Chef ID
              </p>
              <p className="font-semibold text-lg">{profile.chefId}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-8 pt-0">
          {role === "user" && (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleConfirm}
                className="btn btn-primary flex-1 rounded-xl"
              >
                Become a Chef
              </button>
              <button
                onClick={adminConfirm}
                className="btn btn-outline btn-secondary flex-1 rounded-xl"
              >
                Become an Admin
              </button>
            </div>
          )}

          {role === "chef" && (
            <button
              onClick={adminConfirm}
              className="btn btn-outline btn-secondary w-full rounded-xl"
            >
              Become an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
