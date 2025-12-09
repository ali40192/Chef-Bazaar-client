import React from "react";
import Banner from "../../Components/Common/Banner";
import Review from "../Reviews/Review";
import MealCards from "../../Components/Common/MealCards";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  const { data: meals = [] } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/meals");
      return res.data;
    },
  });

  console.log(meals);

  return (
    <div className="w-full max-w-5xl mx-auto mt-5 ">
      <div>
        <h1 className="text-3xl font-bold text-center  mb-3">
          Try Ours Delicious Meals
        </h1>
        <p className="mb-10 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </p>
        <Banner></Banner>
      </div>

      <div className="mt-10 text-center">
        <h1 className="text-2xl font-bold text-center ">Our Special Meals</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      </div>
      <div className=" grid grid-cols-3 gap-4 mt-10   mb-40">
        {meals.map((meal) => (
          <MealCards key={meal._id} meal={meal}></MealCards>
        ))}
      </div>
      <div className="my-10">
        <h1 className="text-center my-4">
          <span className="text-2xl font-bold">Customers</span> Reviews
        </h1>
        <Review></Review>
      </div>
    </div>
  );
};

export default Home;
