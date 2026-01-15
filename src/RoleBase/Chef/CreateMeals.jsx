import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { uploadeImg } from "../../utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useStatus from "../../hooks/useStatus";
import useChefid from "../../hooks/useChefid";

const CreateMeals = () => {
  const [status] = useStatus();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [chefId] = useChefid();

  const { mutateAsync } = useMutation({
    mutationFn: async (mealdata) => await axiosSecure.post(`/meals`, mealdata),
    onSuccess: (data) => {
      toast.success("Successfully added", data);
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
      email,
    } = data;

    const imageFile = image[0];
    const imageUrl = await uploadeImg(imageFile);

    const meal = {
      foodName,
      chefName,
      foodImage: imageUrl,
      price,
      rating,
      ingredients,
      estimatedDeliveryTime: estimatedTime,
      chefExperience,
      chefId: chefId || "2321",
      userEmail: email,
      createdAt: new Date().toISOString(),
    };

    mutateAsync(meal);
    navigate("/allmeals");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-base-200/40 py-12 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-xl p-8 md:p-10 space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Add New Food Item
          </h2>
          <p className="text-sm text-gray-500">
            Fill in the details carefully to publish a new meal
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Name */}
          <div className="form-control">
            <label className="label font-semibold">Food Name</label>
            <input
              {...register("foodName")}
              type="text"
              placeholder="e.g. Grilled Chicken"
              className="input input-bordered focus:outline-primary"
            />
          </div>

          {/* Chef Name */}
          <div className="form-control">
            <label className="label font-semibold">Chef Name</label>
            <input
              {...register("chefName")}
              type="text"
              placeholder="e.g. John Doe"
              className="input input-bordered focus:outline-primary"
            />
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label font-semibold">Price</label>
            <input
              {...register("price")}
              type="number"
              placeholder="৳ 250"
              className="input input-bordered focus:outline-primary"
            />
          </div>

          {/* Rating */}
          <div className="form-control">
            <label className="label font-semibold">Rating</label>
            <input
              {...register("rating")}
              type="number"
              min="1"
              max="5"
              step="0.1"
              placeholder="e.g. 4.5"
              className="input input-bordered focus:outline-primary"
            />
          </div>

          {/* Ingredients */}
          <div className="form-control">
            <label className="label font-semibold">Ingredients</label>
            <select
              {...register("ingredients")}
              defaultValue=""
              className="select select-bordered focus:outline-primary"
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

          {/* Estimated Time */}
          <div className="form-control">
            <label className="label font-semibold">
              Estimated Delivery Time
            </label>
            <input
              {...register("estimatedTime")}
              type="text"
              placeholder="30–40 mins"
              className="input input-bordered focus:outline-primary"
            />
          </div>

          {/* Chef Experience */}
          <div className="form-control">
            <label className="label font-semibold">Chef Experience</label>
            <select
              {...register("chefExperience")}
              className="select select-bordered focus:outline-primary"
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
            <label className="label font-semibold">Chef ID</label>
            <input
              {...register("chefId")}
              type="text"
              disabled
              defaultValue={chefId}
              className="input input-bordered bg-base-200 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label font-semibold">Food Image</label>
          <input
            {...register("image")}
            type="file"
            className="file-input file-input-bordered w-full"
          />
          <span className="text-xs text-gray-500 mt-1">
            Upload a clear food image (JPG/PNG)
          </span>
        </div>

        {/* User Email */}
        <div className="form-control">
          <label className="label font-semibold">User Email</label>
          <input
            {...register("email")}
            type="email"
            defaultValue={user?.email}
            className="input input-bordered focus:outline-primary"
          />
        </div>

        {/* Submit */}
        {status === "active" && (
          <button
            type="submit"
            className="btn btn-primary w-full text-lg rounded-xl mt-6"
          >
            Submit Meal
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateMeals;
