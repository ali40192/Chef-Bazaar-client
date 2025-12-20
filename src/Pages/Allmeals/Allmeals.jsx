import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MealCards from "../../Components/Common/MealCards";
import Loader from "../../Components/Common/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Allmeals = () => {
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const limit = 10;

  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["allmeals", sort, order, page],
    keepPreviousData: true,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allmeals?sort=${sort}&order=${order}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="alert alert-error">
        Error loading meals: {error.message}
      </div>
    );
  }

  const { meals = [], totalPages } = data || {};

  const handleSelect = (e) => {
    const [newSort, newOrder] = e.target.value.split("-");
    setSort(newSort);
    setOrder(newOrder);
    setPage(1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-5 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        All Meals Here
      </h2>

      <div className="flex justify-end mb-6">
        <select
          onChange={handleSelect}
          value={`${sort}-${order}`}
          className="select bg-white"
        >
          <option value="price-desc">Price: High → Low</option>
          <option value="price-asc">Price: Low → High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        {meals.length > 0 ? (
          meals.map((meal) => <MealCards key={meal._id} meal={meal} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No meals found
          </p>
        )}
      </div>

      <div className="flex justify-center mt-10 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="btn btn-sm btn-outline"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${
              page === num + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Allmeals;
