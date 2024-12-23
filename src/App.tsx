import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./components/layout/Header";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import Dashboard from "./features/blog/Dashboard";
import BlogEditor from "./features/blog/BlogEditor";
import AdminDashboard from "./features/admin/AdminDashboard";
import AuthorDashboard from "./features/author/AuthorDashboard";
import Profile from "./features/auth/Profile";
import About from "./Pages/About";
import { SidebarProvider } from "@/components/ui/sidebar";
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/dashboard"
          element={
            <SidebarProvider>
              <Dashboard />
            </SidebarProvider>
          }
        />
        <Route path="/dashbaord/edit/:id" element={<BlogEditor />} />

        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/author" element={<AuthorDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
