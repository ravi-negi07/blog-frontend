import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SuccessToast, errorToast } from "@/utills/toastifyUtills";
import axiosInstance from "@/axiosConfig/axiosInstance";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmitSignup = async (data: SignUpFormData) => {
    try {
      const res = await axiosInstance.post("auth/signup", data);
      console.log(res);
      if (res.status === 201) {
        SuccessToast("Signup successful!");
        navigate("/login");
      } else {
        const errorMessage =
          res.data?.message || "Signup failed. Please try again.";
        errorToast(errorMessage);
      }
    } catch (error: any) {
      console.error("Error during signup:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Error during signup. Please try again.";
      errorToast(errorMessage);
    }
  };

  return (
    <div className="w-[100%] h-[100vh] flex flex-col lg:flex-row items-center justify-center gap-8 mt-6 bg-neutral-100 text-gray-800">
      <div className="w-full flex justify-center lg:justify-center">
        <form
          onSubmit={handleSubmit(onSubmitSignup)}
          className="space-y-4 px-6 py-8 w-[400px] max-w-full shadow-md rounded-lg bg-neutral-50"
        >
          <h1 className="text-center text-blue-500 text-3xl font-semibold">
            Sign Up
          </h1>
          <p className="text-center text-sm text-slate-600 mb-6">
            Enter your details to create an account
          </p>

          <div>
            <label
              htmlFor="username"
              className="block mb-2 font-semibold text-gray-700"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username should be at least 3 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Username cannot exceed 15 characters",
                },
              })}
              className="p-3 rounded-md w-full border-2 bg-neutral-200 text-gray-800 focus:bg-white focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
                maxLength: {
                  value: 50,
                  message: "Email cannot exceed 50 characters",
                },
              })}
              className="p-3 rounded-md w-full border-2 bg-neutral-200 text-gray-800 focus:bg-white focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                  message:
                    "Password must include letters and numbers, and be at least 8 characters long",
                },
              })}
              className="p-3 rounded-md w-full border-2 bg-neutral-200 text-gray-800 focus:bg-white focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-semibold ml-1 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden lg:block mt-10 w-full h-full">
        <img
          src="https://ecme-react.themenate.net/img/others/auth-side-bg.png"
          alt="Sign Up Illustration"
          className="w-[600px] rounded-r-3xl h-[510px] mt-10 object-cover opacity-80"
        />
      </div>
    </div>
  );
};

export default SignUp;
