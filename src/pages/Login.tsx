import { RootState } from "@/store";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "@/utills/toastifyUtills";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/axiosConfig/axiosInstance";
import { login } from "@/api/authSlice";

interface FormValues {
  email: string;
  password: string;
  role: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.theme === "dark"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmitLogin = async (data: FormValues) => {
    try {
      const res = await axiosInstance.post(
        "https://blog-backend-2bnw.onrender.com/auth/login",
        {
          email: data.email,
          password: data.password,
          role: data.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        showSuccessToast("You have successfully logged in");

        const data = await res.data;
        dispatch(login({ user: data.user, token: data.token }));
        navigate("/dashboard");
      } else {
        showErrorToast("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      showErrorToast("An error occurred. Please try again.");
    }
  };

  const containerClass = isDarkTheme
    ? "bg-slate-800 text-white"
    : "bg-slate-100 text-gray-800";

  const formClass = isDarkTheme
    ? "bg-slate-700 text-white"
    : "bg-slate-100 text-gray-800";

  const inputClass = isDarkTheme
    ? "bg-slate-700 border-slate-600 text-white"
    : "bg-slate-200 text-gray-800";

  const buttonClass = isDarkTheme
    ? "bg-blue-600 hover:bg-blue-800"
    : "bg-blue-500 hover:bg-blue-700";

  return (
    <div className={`w-[100%] h-[100vh] ${containerClass}`}>
      <div
        className={`flex items-center w-[100%] h-[100vh] justify-center gap-8 sm:mt-[20px] ${containerClass}`}
      >
        <div className="w-full px-10 hidden md:flex opacity-80 mx-10 relative space-x-2 h-full justify-start items-center mt-[10px]">
          <img
            src="https://ecme-react.themenate.net/img/others/auth-side-bg.png"
            alt="Login"
            className="w-[550px] rounded-r-3xl absolute left-0 h-[500px]"
            style={{
              transform: "scaleX(-1)",
            }}
          />
        </div>

        <div className="w-full flex  items-center justify-start">
          <form
            onSubmit={handleSubmit(onSubmitLogin)}
            className={`space-y-2 px-6 mx-6 mt-0 sm:mx-0  py-10 w-[400px] max-w-full sm:mt-6 opacity-100 shadow-md  rounded-lg ${formClass}`}
          >
            <h1 className="text-center text-blue-500 text-3xl font-semibold mb-2">
              Login
            </h1>
            <p
              className={`text-center text-md font-md mb-6 ${
                isDarkTheme ? "text-white" : "text-slate-600"
              }`}
            >
              Hey, enter your details to sign in to your account
            </p>

            <div>
              <label
                htmlFor="email"
                className={`block mb-2 font-semibold ${
                  isDarkTheme ? "text-white" : "text-slate-600"
                }`}
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
                className={`p-3 rounded-md w-full border-2 focus:outline-none focus:border-blue-500 ${inputClass}`}
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
                className={`block mb-2 font-semibold ${
                  isDarkTheme ? "text-white" : "text-slate-600"
                }`}
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
                className={`p-3 rounded-md w-full border-2 focus:outline-none mb-4 focus:border-blue-500 ${inputClass}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className={`block mb-2 font-semibold ${
                  isDarkTheme ? "text-white" : "text-slate-600"
                }`}
              >
                Role:
              </label>
              <select
                id="role"
                {...register("role", {
                  required: "Role is required",
                })}
                className={`p-3 rounded-md w-full border-2 focus:outline-none focus:border-blue-500 ${inputClass}`}
              >
                <option value="" className="text-slate-600">
                  Select a role
                </option>
                <option value="author">Author</option>
                <option value="admin">Admin</option>
                <option value="reader">Reader</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className={`${buttonClass} w-full text-white px-4 py-2 rounded-md transition duration-300`}
            >
              Login
            </Button>

            <p className="text-center text-sm mt-4">
              Don't have an account?
              <span className="text-blue-600 font-semibold ml-1">
                <Link to="/sign-up">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
