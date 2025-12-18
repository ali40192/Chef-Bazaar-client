import { useQuery } from "@tanstack/react-query";
import React from "react";
import MealCards from "../../Components/Common/MealCards";

import Loader from "../../Components/Common/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Allmeals = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allmeals = [], isLoading } = useQuery({
    queryKey: ["allmeals"],
    queryFn: async () => {
      const res = await axiosSecure("/allmeals");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="w-full max-w-5xl mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">All Meals Here</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10 mb-40 justify-items-center">
        {allmeals.map((meal) => (
          <MealCards key={meal._id} meal={meal}></MealCards>
        ))}
      </div>
    </div>
  );
};

export default Allmeals;
