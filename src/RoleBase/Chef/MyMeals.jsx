import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Common/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";
import useRole from "../../hooks/useRole";
import useStatus from "../../hooks/useStatus";

const MyMeals = () => {
  const [role] = useRole();
  const [status] = useStatus();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: MyMeals = [], isLoading } = useQuery({
    queryKey: ["mymeals", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/mymeals`);

      return res.data;
    },
  });
  ///////delete related kaj
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/mymeals/${id}`);
          toast.success("Meal Deleted Successfully");
          window.location.reload();
        } catch (error) {
          toast.error(error.message);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Food Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Ingredients</th>
            <th>Estimated D.Time</th>
            <th>Chef Name</th>
            <th>Chef Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {MyMeals?.map((meals, i) => (
            <tr key={i}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={meals.foodImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>{meals?.foodName}</td>
              <td>{meals?.price}</td>
              <td>{meals?.rating}</td>
              <td>{meals?.ingredients}</td>
              <td>{meals?.estimatedDeliveryTime}</td>
              <td>{meals?.chefName}</td>
              <td>{meals?.chefId}</td>

              {role === "chef" && status === "active" && (
                <td>
                  <Link
                    to={`/dashboard/my-meals/${meals._id}`}
                    className="btn btn-ghost btn-xs"
                  >
                    Update Meal
                  </Link>
                  <button
                    onClick={() => handleDelete(meals._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyMeals;
