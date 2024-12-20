import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface FormValues {
  email: string;
  password: string;
  role: string;
}

const userKey: string = "user";

const Login = () => {
  //   const { isAuthenticated, setIsAuthenticated } = useState<boolean>(false);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmitLogin = async (data: FormValues) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email: data?.email,
          password: data?.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);

      if (res.status === 200) {
        toast.success("you have successfully logged in", {
          position: "top-right",
          autoClose: 2000,
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        console.log("User logged in successfully:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        const storedUser = JSON.parse(localStorage.getItem(userKey) || "null");
        if (
          storedUser &&
          storedUser.email === data.email &&
          storedUser.password === data.password
        ) {
          navigate("/dashboard");
        } else {
          toast.error("Invalid data kindly check your data", {
            position: "top-right",
            autoClose: 2000,
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });

          console.error("Invalid login data");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center mt-10 justify-center">
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        className="space-y-3 p-4 w-[400px] h-[450px] border-2 mt-10 shadow-xl"
      >
        <h1 className="flex items-center justify-center mx-2 my-1 p-2 font-semibold text-blue-500 text-3xl">
          Login
        </h1>
        <p className="flex item justify-center text-sm text-slate-600">
          Hey, enter your details to sign in to your account
        </p>

        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-blue-500 font-semibold"
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
            className="p-2 rounded-md w-full focus:border-none border-2 border-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-blue-500 font-semibold"
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
                  "Password must include letters, numbers, and special characters",
              },
            })}
            className="focus:border-none border-2 rounded-md border-blue-500 focus:outline-none p-2 w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 w-full my-4 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="flex items-center justify-center text-red-500">
          Don't have an account?
          <span className="text-blue-600 font-semibold ml-2">
            <Link to="/sign-up">Sign Up</Link>
          </span>
        </p>
        <button
          type="button"
          className="bg-white w-full border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
          onClick={() => loginWithRedirect()}
        >
          Sign In with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
