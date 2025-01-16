import React from "react";
const SignUp = React.lazy(() => import("../pages/SignUp"));
const Login = React.lazy(() => import("../pages/Login"));
const Home = React.lazy(() => import("../pages/Home"));
const Header = React.lazy(() => import("../Layouts/Header"));
export { SignUp, Login, Home, Header };
