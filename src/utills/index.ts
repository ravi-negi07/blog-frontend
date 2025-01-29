import React from "react";
const Home = React.lazy(() => import("../pages/Home"));

const SignUp = React.lazy(() => import("../pages/SignUp"));
const Login = React.lazy(() => import("../pages/Login"));
const Header = React.lazy(() => import("../Layouts/Header"));
const About = React.lazy(() => import("../pages/About"));
const BlogList = React.lazy(() => import("../blog/BlogList"));
const Dashboard = React.lazy(() => import("../blog/BlogDashboard"));

const BlogDisplay = React.lazy(() => import("../blog/BlogDisplay"));
const BlogStatus = React.lazy(() => import("../blog/BlogStatus"));
const BlogCreator = React.lazy(() => import("../blog/BlogCreator"));
export {
  SignUp,
  Login,
  Header,
  About,
  Home,
  BlogList,
  Dashboard,
  BlogCreator,
  BlogDisplay,
  BlogStatus,
};
