import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { uploadeImg } from "../../utils";
import useAuth from "../../hooks/useAuth";

const ReviewForm = ({ meal, refetch }) => {
  const id = meal._id;
  const mealName = meal.foodName;
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  // add review///
  const { mutateAsync } = useMutation({
    mutationFn: async (reviewdata) =>
      await axiosSecure.post(`/reviews`, reviewdata),
    onSuccess: (data) => {
      toast.success("Review submitted successfully!", data);
      refetch();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFormSubmit = async (data) => {
    const { name, image, rating, comment, date } = data;

    try {
      // Upload image
      const imageFile = image[0];
      const imageUrl = await uploadeImg(imageFile);

      await mutateAsync({
        foodId: id,
        reviewerName: name,
        reviewerImage: imageUrl,
        rating: rating,
        comment: comment,
        reviewerEmail: user?.email,
        date: date,
        mealName,
      });

      toast.success("review added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  ////////favourite button er kaj

  return (
    <div className="max-w-5xl mx-auto bg-[#FBF8EE] p-5 sm:p-8 md:p-10 rounded-md">
      <h3 className="text-lg sm:text-xl font-semibold mb-6">Leave a Review</h3>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Reviewer Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Reviewer Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="w-full sm:max-w-sm bg-transparent border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Reviewer Image */}
        <div class="flex items-center justify-between mt-3">
          <label class="text-base font-medium text-gray-900">Image</label>
        </div>
        <div class="mt-2">
          <input
            {...register("image")}
            class="file-input w-full max-w-xs"
            type="file"
            accept="image/*"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your rating <span className="text-red-500">*</span>
          </label>
          <select
            {...register("rating")}
            type="number"
            className="w-full sm:max-w-xs bg-transparent border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          >
            <option value="">Select rating</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your review <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("comment")}
            rows="5"
            className="w-full bg-transparent border border-gray-300 rounded-md px-4 py-3 focus:outline-none"
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            {...register("date")}
            type="date"
            className="w-full sm:max-w-sm bg-transparent border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-md hover:opacity-90"
          >
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
