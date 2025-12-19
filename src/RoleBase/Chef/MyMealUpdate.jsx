import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadeImg } from "../../utils";
import { toast } from "react-toastify";
import Loader from "../../Components/Common/Loader";

const MyMealUpdate = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: MySingleMeals = [] } = useQuery({
    queryKey: ["mymeals", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/mymeals/${id}`);
      return data;
    },
  });

  const { mutateAsync, isLoading, refatch } = useMutation({
    mutationFn: async (data) => {
      const { data: res } = await axiosSecure.patch(`/mymeals/${id}`, data);
      return res;
    },
    onSuccess: (data) => {
      toast.success("Meal Updated Successfully", data);
      navigate("/allmeals");
      refatch();
    },
  });

  const {
    chefExperience,

    chefName,
    estimatedDeliveryTime,
    foodImage,
    foodName,
    ingredients,
    price,
    rating,
  } = MySingleMeals;

  const { register, handleSubmit } = useForm();
  //   const navigate = useNavigate();

  //////submit or update korar por page e redirect kora hobe
  const onSubmit = async (data) => {
    const {
      foodName,
      chefName,
      image,
      price,
      rating,
      ingredients,
      estimatedTime,
      chefExperience,
      email,
    } = data;

    let imageUrl = MySingleMeals.foodImage;
    if (image && image[0]) {
      const imageFile = image[0];
      imageUrl = await uploadeImg(imageFile);
    }

    const Updatemeal = {
      foodName: foodName,
      chefName: chefName,
      foodImage: imageUrl,
      price: price,
      rating: rating,
      ingredients: ingredients,
      estimatedDeliveryTime: estimatedTime,
      chefExperience: chefExperience,
      userEmail: email,
    };
    mutateAsync(Updatemeal);
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl p-8 bg-base-100 shadow-xl rounded-xl space-y-5 border border-base-300"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Update your Food
        </h2>

        {/* Food Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Food Name</span>
          </label>
          <input
            {...register("foodName")}
            type="text"
            placeholder="Enter food name"
            className="input input-bordered w-full"
            defaultValue={foodName}
          />
        </div>

        {/* Food Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Food Price</span>
          </label>
          <input
            {...register("price")}
            type="text"
            placeholder="Enter food price"
            className="input input-bordered w-full"
            defaultValue={price}
          />
        </div>

        {/* Chef Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Chef Name</span>
          </label>
          <input
            {...register("chefName")}
            type="text"
            placeholder="Enter chef name"
            className="input input-bordered w-full"
            defaultValue={chefName}
          />
        </div>

        {/* Food Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Food Image</span>
          </label>
          <input
            {...register("image")}
            type="file"
            className="file-input file-input-bordered w-full"
          />
          {foodImage && (
            <p className="text-sm text-gray-500 mt-1">
              Current image:{" "}
              <img
                src={foodImage}
                alt="Current"
                className="w-16 h-16 inline-block"
              />
            </p>
          )}
        </div>

        {/* Rating */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Rating</span>
          </label>
          <input
            {...register("rating")}
            type="number"
            min="1"
            max="5"
            step="0.1"
            placeholder="e.g., 4.5"
            className="input input-bordered w-full"
            defaultValue={rating}
          />
        </div>

        {/* Ingredients */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Ingredients</span>
          </label>
          <select
            {...register("ingredients")}
            className="select select-bordered w-full"
            defaultValue={ingredients}
          >
            <option disabled value="">
              Select Ingredients
            </option>
            <option>Chicken breast</option>
            <option>Lettuce</option>
            <option>Tomatoes</option>
            <option>Cucumber</option>
            <option>Olive oil</option>
            <option>Lemon juice</option>
            <option>Salt</option>
            <option>Pepper</option>
          </select>
        </div>

        {/* Estimated Delivery Time */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Estimated Delivery Time
            </span>
          </label>
          <input
            {...register("estimatedTime")}
            type="text"
            placeholder="e.g., 30–40 mins"
            className="input input-bordered w-full"
            defaultValue={estimatedDeliveryTime}
          />
        </div>

        {/* Chef Experience */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Chef's Experience</span>
          </label>
          <select
            {...register("chefExperience")}
            className="select select-bordered w-full"
            defaultValue={chefExperience}
          >
            <option>1 year</option>
            <option>2 years</option>
            <option>3 years</option>
            <option>4 years</option>
            <option>5+ years</option>
          </select>
        </div>

        {/* Chef ID */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Chef ID (Admin Assigned)
            </span>
          </label>
          <input
            type="text"
            disabled
            placeholder="Generated after approval"
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
          />
        </div>

        {/* User Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">User Email</span>
          </label>
          <input
            {...register("email")}
            type="email"
            defaultValue={user?.email}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full text-lg mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default MyMealUpdate;
