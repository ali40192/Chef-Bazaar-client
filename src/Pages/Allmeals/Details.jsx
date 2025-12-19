import { useMutation, useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router";
import Loader from "../../Components/Common/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewSection from "./ReviewSection";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useStatus from "../../hooks/useStatus";

const Details = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [role] = useRole();
  const [status] = useStatus();

  const axiosSecure = useAxiosSecure();

  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axiosSecure(`/meals/${id}`);
      return res.data;
    },
  });
  const {
    foodName,
    chefName,
    foodImage,
    price,
    rating,
    ingredients,
    estimatedDeliveryTime,
    chefExperience,
    chefId,
  } = meal;

  ///favourite button er kaj
  const { mutate, refetch } = useMutation({
    mutationFn: async (favoriteData) =>
      await axiosSecure.post(`/favourite-meal`, favoriteData),
    onSuccess: (data) => {
      toast.success("Added to favourite collection!", data);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleFavourite = async () => {
    const details = {
      userEmail: user?.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
      foodImage: meal.foodImage,
    };
    try {
      mutate(details);

      toast.success("Added to favourite successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        {/* Food Image */}
        <div className="flex">
          <img
            src={foodImage}
            alt="Food"
            className="rounded-xl shadow-lg w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          {/* Food Name */}
          <h1 className="text-3xl font-bold text-primary">{foodName}</h1>

          {/* Chef Name */}
          <p className="mt-2 text-lg font-semibold text-gray-800">
            Chef: {chefName}
          </p>
          <p className="text-gray-600 text-sm">Chef ID: {chefId}</p>

          {/* Rating */}
          <div className="rating mt-3">Rating: {rating}</div>

          {/* Price */}
          <p className="text-2xl font-bold text-gray-900 mt-4">${price}</p>

          {/* Divider */}
          <div className="my-4 border-b border-gray-300" />

          {/* Ingredients */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Ingredients
          </h2>
          <p className="text-gray-600 leading-relaxed">{ingredients}</p>

          {/* Delivery Info */}
          <div className="mt-6">
            <p className="text-gray-700">
              <strong>Delivery Area:</strong> Dhake
            </p>
            <p className="text-gray-700 mt-1">
              <strong>Estimated Delivery Time:</strong> {estimatedDeliveryTime}{" "}
              minutes
            </p>
          </div>

          {/* Chef Experience */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Chef's Experience
            </h2>
            <p className="text-gray-600 mt-1">{chefExperience}</p>
          </div>

          {/* Order Button */}
          {role === "user" && status === "active" && (
            <Link
              to={`/dashboard/order/${id}`}
              className="btn btn-primary text-white mb-3 mt-6 px-6 py-3 w-full md:w-auto"
            >
              Order Now
            </Link>
          )}
          <button
            onClick={handleFavourite}
            type="button"
            className="w-full sm:w-auto border border-primary text-primary px-8 py-3 rounded-md hover:bg-primary hover:text-white"
          >
            Add to Favorite
          </button>
        </div>
      </div>

      <div>
        <ReviewSection meal={meal}></ReviewSection>
      </div>
    </>
  );
};

export default Details;
