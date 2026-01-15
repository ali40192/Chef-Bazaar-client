import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { saveOrUpdateUser } from "../utils";

const Login = () => {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue, // for demo auto-fill
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const result = await loginUser(email, password);
      toast.success("Login successful");
      saveOrUpdateUser({
        name: result.user?.displayName,
        email: result.user?.email,
        imageUrl: result.user?.photoURL,
      });
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Invalid email or password");
      console.error(error);
    }
  };

  //  Demo Admin
  const handleDemoAdmin = () => {
    setValue("email", "mohammadali40192@gmail.com");
    setValue("password", "#@mohammadali#@");
  };

  //  Demo Chef
  const handleDemoChef = () => {
    setValue("email", "pedri@gmail.com");
    setValue("password", "pedri08");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-primary"
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Welcome Back!
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            We missed you, sign in to continue.
          </p>

          {/*  Demo Credentials */}
          <div className="mt-6 bg-base-200 p-4 rounded-lg text-sm space-y-3">
            <p className="font-semibold text-primary">Demo Accounts:</p>

            {/* Admin */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div>
                <p className="text-sm">
                  Admin:{" "}
                  <span className="font-mono">mohammadali40192@gmail.com</span>
                </p>
                <p className="text-sm">
                  Password: <span className="font-mono">#@mohammadali#@</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="btn btn-sm btn-outline btn-primary"
              >
                Use Admin
              </button>
            </div>

            {/* Chef */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div>
                <p className="text-sm">
                  Chef: <span className="font-mono">pedri@gmail.com</span>
                </p>
                <p className="text-sm">
                  Password: <span className="font-mono">pedri08</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleDemoChef}
                className="btn btn-sm btn-outline btn-secondary"
              >
                Use Chef
              </button>
            </div>
          </div>

          <div className="mt-10">
            {/* Email */}
            <div>
              <label className="block mb-3 text-sm font-medium">Email</label>
              <input
                {...register("email", { required: true })}
                placeholder="you@example.com"
                className="block w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-zinc-800"
                type="email"
              />
            </div>

            {/* Password */}
            <div className="mt-6">
              <label className="block mb-3 text-sm font-medium">Password</label>
              <input
                {...register("password", { required: true })}
                placeholder="••••••••"
                className="block w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-zinc-800"
                type="password"
              />
            </div>

            {/* Submit */}
            <div className="mt-10">
              <button
                type="submit"
                className="w-full px-4 py-3 text-white font-semibold bg-gradient-to-r from-primary to-secondary rounded-lg"
              >
                Let’s Go
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-secondary text-center">
          <span className="text-sm text-white">
            Don't have an account?{" "}
            <Link className="underline font-medium" to="/auth/register">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
