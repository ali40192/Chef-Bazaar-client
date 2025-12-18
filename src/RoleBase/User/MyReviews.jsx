import React from "react";
import UserReview from "../../Pages/Reviews/UserReview";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Common/Loader";

const MyReviews = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ["allreviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/allreviews`);
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary my-2 text-center">
        Your Reviews is here
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 items-center gap-3 space-y-3">
        {allReviews.length > 0 ? (
          allReviews?.map((review, i) => (
            <UserReview key={i} review={review}></UserReview>
          ))
        ) : (
          <p>There is no Review you left</p>
        )}{" "}
      </div>
    </div>
  );
};

export default MyReviews;
