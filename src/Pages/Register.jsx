import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

import { saveOrUpdateUser, uploadeImg } from "../utils";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const addresses = useLoaderData();

  const { createUser, UpdateUserprofile } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const Allregions = addresses?.map((address) => address.region);
  const regions = [...new Set(Allregions)];
  const districsByRegion = (region) => {
    const districs = addresses.filter((address) => address.region === region);
    const singledistrics = districs.map((address) => address.district);
    return singledistrics;
  };

  const dynamicDistrict = watch("region");
  const password = watch("password");

  const onformSubmit = async (data) => {
    const {
      username,
      email,
      password,
      confirmPassword,
      image,
      region,
      district,
    } = data;

    try {
      // Create user account
      await createUser(email, password);

      // Upload image
      const imageFile = image[0];
      const imageUrl = await uploadeImg(imageFile);

      // Update user profile
      await UpdateUserprofile(username, imageUrl);

      // Save user data to database
      await saveOrUpdateUser({
        name: username,
        email,
        imageUrl,
        region,
        district,
      });

      toast.success("Successfully Registered!");
      navigate(location.state || "/");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div>
      <div class="">
        <section class="rounded-md p-2 bg-white">
          <div class="flex items-center justify-center my-3">
            <div class="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
              <div class="mb-2"></div>
              <h2 class="text-2xl font-bold leading-tight">
                Sign up to create account
              </h2>
              <p class="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-blue-400 font-black">
                  Sign In
                </Link>
              </p>
              <form onSubmit={handleSubmit(onformSubmit)} class="mt-5">
                <div class="space-y-4">
                  <div>
                    <label class="text-base font-medium text-gray-900">
                      User Name
                    </label>
                    <div class="mt-2">
                      <input
                        {...register("username", {
                          required: "Username is required",
                        })}
                        placeholder="Full Name"
                        type="text"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label class="text-base font-medium text-gray-900">
                      Email address
                    </label>
                    <div class="mt-2">
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="Email"
                        type="email"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between">
                      <label class="text-base font-medium text-gray-900">
                        Password
                      </label>
                    </div>
                    <div class="mt-2">
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        placeholder="Password"
                        type="password"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* confirmpassword */}

                    <div class="flex items-center justify-between">
                      <label class="text-base font-medium text-gray-900">
                        Confirm Password
                      </label>
                    </div>
                    <div class="mt-2">
                      <input
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        placeholder="Confirm Password"
                        type="password"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* profile */}
                    <div class="flex items-center justify-between mt-3">
                      <label class="text-base font-medium text-gray-900">
                        Profile Picture
                      </label>
                    </div>
                    <div class="mt-2">
                      <input
                        {...register("image")}
                        class="file-input w-full max-w-xs"
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  {/* regions */}
                  <div class="flex items-center justify-between  mt-3">
                    <label class="text-base font-medium text-gray-900">
                      Address
                    </label>
                  </div>
                  <div class="mt-2 mb-8">
                    <select
                      {...register("region", {
                        required: "Please select a region",
                      })}
                      className="select"
                    >
                      <option value="" disabled>
                        Pick Your Region
                      </option>
                      {regions.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <p className="text-red-500 text-sm">
                        {errors.region.message}
                      </p>
                    )}
                  </div>

                  <div class="mt-2 mb-8">
                    <select
                      {...register("district", {
                        required: "Please select a district",
                      })}
                      className="select"
                    >
                      <option value="" disabled>
                        Pick Your District
                      </option>
                      {districsByRegion(dynamicDistrict)?.map(
                        (district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        )
                      )}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-sm">
                        {errors.district.message}
                      </p>
                    )}
                  </div>
                  {/* button */}
                  <div>
                    <button
                      class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
