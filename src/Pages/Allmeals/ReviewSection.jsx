import React from "react";
import ReviewForm from "../../Components/Common/ReviewForm";
import ReviewCard from "../../Components/Common/ReviewCard";
import Loader from "../../Components/Common/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ReviewSection = ({ meal }) => {
  const id = meal._id;
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/reviews/${id}`);

        return res.data;
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" max-w-5xl mx-auto space-y-5">
      <section className="flex-1">
        <ReviewForm refetch={refetch} meal={meal} />
      </section>
      <section className="flex-1">
        <h3 className="text-xl font-semibold mb-4 ">
          Reviews ({reviews?.length || 0})
        </h3>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))
        ) : (
          <p className="text-center text-2xl text-gray-500">No reviews yet</p>
        )}
      </section>
    </div>
  );
};

export default ReviewSection;
