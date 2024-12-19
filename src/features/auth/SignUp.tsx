import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "@/components/Hooks/useAxios";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const SignUp = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { postData, loading, error, data } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const onSubmitSignup = async (data: SignUpFormData) => {
    try {
      const res = await postData("http://localhost:3000/sign", data);
      // console.log(res);
      if (data) {
        toast.success("you have successfully signed up", {
          position: "top-right",
          autoClose: 2000,
          style: { backgroundColor: "green", color: "white" },
        });
        navigate("/login");
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("error during signup", {
        position: "top-right",
        autoClose: 2000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  // "role": "reader | author"
  return (
    <div className="flex mt-10 items-center  justify-center gap-8">
      <div className="w-full flex items-center justify-end">
        <form
          onSubmit={handleSubmit(onSubmitSignup)}
          className="space-y-2 px-6 py-8 w-[400px] max-w-full  mt-6 shadow-sm rounded-lg bg-neutral-50"
        >
          <h1 className="text-center text-blue-500 text-3xl font-semibold mb-2">
            Sign Up
          </h1>
          <p className="text-center text-sm text-slate-600 mb-6">
            Enter your details to sign up to your account
          </p>
          {/* Form Fields */}
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
              className="p-3 rounded-md w-full border-2  bg-neutral-200 focus:bg-white  focus:outline-none focus:border-blue-500"
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
              className="p-3 rounded-md w-full border-2  bg-neutral-200 focus:bg-white  focus:outline-none focus:border-blue-500"
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
              className="p-3 rounded-md w-full border-2  bg-neutral-200 focus:bg-white  focus:outline-none focus:border-blue-500"
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
            <span className="text-blue-600 font-semibold ml-1">
              <Link to="/login">Sign in</Link>
            </span>
          </p>

          <p className="text-center text-sm text-gray-700 mt-2">
            Access Quickly
          </p>

          <button
            type="button"
            className="bg-white w-full border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
            onClick={() => loginWithRedirect()}
          >
            Sign Up with Google
          </button>
        </form>
      </div>

      <div className="w-full  px-10 mx-10 relative space-x-2 h-full space-y-2 flex justify-end items-center mt-[10px]">
        <img
          src="https://ecme-react.themenate.net/img/others/auth-side-bg.png"
          alt="signp"
          className="w-[600px] rounded-r-3xl absolute right-0 h-[500px]"
        />
      </div>
    </div>
  );
};

export default SignUp;
