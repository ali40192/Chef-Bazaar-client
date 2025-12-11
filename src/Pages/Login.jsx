import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then((result) => {
        toast.success("login successfull", result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(handleLogin)}
        class="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800"
      >
        <div class="px-8 py-10 md:px-10">
          <h2 class="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Welcome Back!
          </h2>
          <p class="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            We missed you, sign in to continue.
          </p>
          <div class="mt-10">
            <div class="relative">
              <label
                class="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                for="email"
              >
                Email
              </label>
              <input
                {...register("email")}
                placeholder="you@example.com"
                class="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                type="email"
              />
            </div>
            <div class="mt-6">
              <label
                class="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                for="password"
              >
                Password
              </label>
              <input
                {...register("password")}
                placeholder="••••••••"
                class="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                type="password"
              />
            </div>
            <div class="mt-10">
              <button
                class="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                type="submit"
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
        <div class="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
          <div class="text-sm text-blue-900 dark:text-blue-300 text-center">
            Don't have an account?
            <Link class="font-medium underline" to="/auth/register">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
