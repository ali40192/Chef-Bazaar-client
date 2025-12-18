import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

import { saveOrUpdateUser, uploadeImg } from "../utils";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const loctoion = useLocation();
  const navigate = useNavigate();
  const addresses = useLoaderData();

  const { creatUser, UpdateUserprofile } = useAuth();

  const { register, handleSubmit, watch } = useForm();

  const Allregions = addresses?.map((address) => address.region);
  const regions = [...new Set(Allregions)];
  const districsByRegion = (region) => {
    const districs = addresses.filter((address) => address.region === region);
    const singledistrics = districs.map((address) => address.district);
    return singledistrics;
  };

  const dynamicDistrict = watch("region");

  const onformSubmit = async (data) => {
    const {
      username,
      email,
      password,
      confirmpassword,
      image,
      region,
      district,
    } = data;

    creatUser(email, password)
      .then((result) => {
        toast.success("Successfully Register", result);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });

    const imageFile = image[0];
    const imageUrl = await uploadeImg(imageFile);
    UpdateUserprofile(username, imageUrl);
    await saveOrUpdateUser({
      name: username,
      email,
      imageUrl,
      region,
      district,
    });
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
                        {...register("username")}
                        placeholder="Full Name"
                        type="text"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="text-base font-medium text-gray-900">
                      Email address
                    </label>
                    <div class="mt-2">
                      <input
                        {...register("email")}
                        placeholder="Email"
                        type="email"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="email"
                      />
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
                        {...register("password")}
                        placeholder="Password"
                        type="password"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="password"
                      />
                    </div>

                    {/* confirmpassword */}

                    <div class="flex items-center justify-between">
                      <label class="text-base font-medium text-gray-900">
                        Confirm Password
                      </label>
                    </div>
                    <div class="mt-2">
                      <input
                        {...register("conpassword")}
                        placeholder="Confirm Password"
                        type="password"
                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
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
                      {...register("region")}
                      defaultValue="Pick Your Region"
                      className="select"
                    >
                      <option disabled={true}>Pick Your Region</option>
                      {regions.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="mt-2 mb-8">
                    <select
                      {...register("district")}
                      defaultValue="Pick Your District"
                      className="select"
                    >
                      <option disabled={true}>Pick Your District</option>
                      {districsByRegion(dynamicDistrict).map(
                        (district, index) => (
                          <option key={index} value={district}>
                            {district}
                          </option>
                        )
                      )}
                    </select>
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
