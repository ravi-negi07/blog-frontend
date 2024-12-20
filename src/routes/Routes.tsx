import { lazy, ReactNode } from "react";
import { RouteObject } from "react-router-dom"; // Import this for proper typing of routes

const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../features/auth/Login"));
const SignUp = lazy(() => import("../features/auth/SignUp"));
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const AdminDashboard = lazy(() => import("../features/admin/AdminDashboard"));
const AuthorDashboard = lazy(
  () => import("../features/author/AuthorDashboard")
);

export interface RouteType {
  path: string;
  element: ReactNode;
  title?: string;
  children?: RouteType[];
}

export const routes: RouteType[] = [
  {
    path: "/",
    element: <Home />,
    title: "Home Page",
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    title: "Sign up",
  },
  {
    path: "/login",
    element: <Login />,
    title: "Login",
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    title: "Dashboard",
    children: [
      {
        path: "/dashboard/admin",
        element: <AdminDashboard />,
        title: "Admin Dashboard",
      },
      {
        path: "/dashboard/author",
        element: <AuthorDashboard />,
        title: "Author Dashboard",
      },
    ],
  },
];
