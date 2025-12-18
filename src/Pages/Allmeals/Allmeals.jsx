import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MealCards from "../../Components/Common/MealCards";

import Loader from "../../Components/Common/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Allmeals = () => {
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("desc");

  const axiosSecure = useAxiosSecure();
  const {
    data: allmeals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allmeals", sort, order],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allmeals?sort=${sort}&order=${order}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading meals: {error.message}
      </div>
    );
  }

  const handleSelect = (e) => {
    const sortText = e.target.value;
    if (sortText) {
      setSort(sortText.split("-")[0]);
      setOrder(sortText.split("-")[1]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        All Meals Here
      </h2>

      <div>
        <select
          onChange={handleSelect}
          value={`${sort}-${order}`}
          className="select bg-white"
        >
          <option value="price-desc">Price: High → Low</option>
          <option value="price-asc">Price: Low → High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10 mb-40 justify-items-center">
        {allmeals && allmeals.length > 0 ? (
          allmeals.map((meal) => (
            <MealCards key={meal._id} meal={meal}></MealCards>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No meals found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Allmeals;
