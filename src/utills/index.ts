import React from "react";
const SignUp = React.lazy(() => import("../pages/SignUp"));
const Login = React.lazy(() => import("../pages/Login"));
const Header = React.lazy(() => import("../Layouts/Header"));
const About = React.lazy(() => import("../pages/About"));
export { SignUp, Login, Header, About };
