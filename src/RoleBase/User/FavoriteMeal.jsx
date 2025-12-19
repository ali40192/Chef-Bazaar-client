import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Common/Loader";
import { toast } from "react-toastify";

const FavoriteMeal = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: AllmyFav = [], isLoading } = useQuery({
    queryKey: ["favourite-meal", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/favourite-meal`);
      return res.data;
    },
  });

  ////delete
  const handleDelete = (id) => {
    try {
      axiosSecure.delete(`/favourite-meal/${id}`);
      toast.success("Meal Deleted Successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Meal Deleted Failed", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1></h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Meal Name</th>
              <th>Chef Name</th>
              <th>Price</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {AllmyFav.length > 0 &&
              AllmyFav.map((fev, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{fev.mealName}</td>
                  <td>{fev.chefName}</td>
                  <td>{fev.price}</td>
                  <td>{fev.addedTime}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(fev.mealId)}
                      className="btn btn-xs btn-active"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteMeal;
