import React from "react";
import Banner from "../../Components/Common/Banner";
import Review from "../Reviews/Review";
import MealCards from "../../Components/Common/MealCards";
import { useQuery } from "@tanstack/react-query";

import Loader from "../../Components/Common/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import OurClients from "./OurClients";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-5 ">
      <div>
        <h1 className="text-3xl text-[#E2852E] font-bold text-center  mb-3">
          Try Ours Delicious Meals
        </h1>
        <p className="mb-10 text-center text-xs text-gray-500">
          Use professional, appetizing photos of your food and interior to
          convert online visitors into customers. People "eat with their eyes
          first," so high-quality imagery is an investment
        </p>
        <Banner></Banner>
      </div>

      <div className="mt-10 text-center">
        <h1 className="text-2xl font-bold text-center text-[#E2852E]">
          Our Special Meals
        </h1>
        <p className="text-gray-500">
          Tell your unique story through text and visuals. This helps create a
          connection with visitors and communicates the experience or brand
          mission.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10 mb-40 justify-items-center">
        {meals.map((meal) => (
          <MealCards key={meal._id} meal={meal}></MealCards>
        ))}
      </div>
      <div className="my-10">
        <h1 className="text-center text-[#E2852E] my-10">
          <span className="text-2xl font-bold">Customers</span> Reviews
        </h1>
        <Review></Review>
      </div>
      <div className="my-10">
        <OurClients></OurClients>
      </div>
    </div>
  );
};

export default Home;
