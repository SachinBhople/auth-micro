import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/authApi";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [loginUser, { data, isLoading, isError, error, isSuccess }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await loginUser(data).unwrap();
      alert("Login successful!");
      // navigate("/product")
    } catch (err) {
      // console.error("Login failed:", err);
    }
  };
  useEffect(() => {
    // console.log(data);
    if (isSuccess) {
      if (data?.user?.role === "user") {

        // navigate("/product")
        // navigate("/order/order")
        navigate("/auth/register")
      } else {
        navigate("/admin/")

      }
    }
  }, [isSuccess])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
                }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 rounded-lg font-semibold transition duration-200 ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Error Message */}
          {isError && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {(error as any)?.data?.message || "Invalid email or password."}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
