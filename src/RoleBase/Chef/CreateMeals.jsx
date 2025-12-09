import React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { uploadeImg } from "../../utils";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CreateMeals = () => {
  const { register, handleSubmit } = useForm();

  const { user } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: async (mealdata) =>
      await axios.post("http://localhost:3000/meals", mealdata),
    onSuccess: (data) => {
      toast.success("seccusfully added", data);
    },
  });

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
      chefId,
      email,
    } = data;

    const imageFile = image[0];
    const imageUrl = await uploadeImg(imageFile);

    const meal = {
      foodName: foodName,
      chefName: chefName,
      foodImage: imageUrl,
      price: price,
      rating: rating,
      ingredients: ingredients,
      estimatedDeliveryTime: estimatedTime,
      chefExperience: chefExperience,
      chefId: "chef_123456",
      userEmail: email,
      createdAt: new Date().toISOString(),
    };
    mutateAsync(meal);
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl p-8 bg-base-100 shadow-xl rounded-xl space-y-5 border border-base-300"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Add New Food Item
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
        </div>

        {/* Price */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Price</span>
          </label>
          <input
            {...register("price")}
            type="number"
            placeholder="Enter price"
            className="input input-bordered w-full"
          />
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
            defaultValue=""
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
            {...register("chefId")}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMeals;
