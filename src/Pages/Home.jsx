import React from "react";
import Banner from "../Components/Common/Banner";
import Review from "./Reviews/Review";

const Home = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8 ">
      <Banner></Banner>

      <div className="my-10">
        <Review></Review>
      </div>
    </div>
  );
};

export default Home;
