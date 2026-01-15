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

        Swal.fire("Deleted!", "Your meal has been deleted.", "success");
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-6">
      <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold text-primary">My Meals</h2>
          <p className="text-sm text-gray-500">
            Manage your added meals from here
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-gray-700 sticky top-0 z-10">
              <tr>
                <th>Image</th>
                <th>Food Name</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Ingredients</th>
                <th>Delivery Time</th>
                <th>Chef Name</th>
                <th>Chef ID</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {MyMeals.map((meals, i) => (
                <tr key={i} className="hover:bg-base-200 transition-colors">
                  <td>
                    <div className="flex justify-center">
                      <img
                        src={meals.foodImage}
                        alt="meal"
                        className="h-12 w-12 rounded-xl object-cover border"
                      />
                    </div>
                  </td>

                  <td className="font-semibold">{meals.foodName}</td>
                  <td className="font-medium">৳ {meals.price}</td>
                  <td>{meals.rating}</td>
                  <td className="text-sm">{meals.ingredients}</td>
                  <td>{meals.estimatedDeliveryTime}</td>
                  <td>{meals.chefName}</td>
                  <td className="text-xs">{meals.chefId}</td>

                  {role === "chef" && status === "active" && (
                    <td>
                      <div className="flex gap-2">
                        <Link
                          to={`/dashboard/my-meals/${meals._id}`}
                          className="btn btn-xs btn-outline btn-info"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(meals._id)}
                          className="btn btn-xs btn-outline btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {MyMeals.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No meals found 🍽️
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMeals;
