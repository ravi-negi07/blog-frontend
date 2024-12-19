import Header from "./components/layout/Header";
import Login from "./features/auth/Login";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./features/auth/SignUp";
import Dashboard from "./Pages/Dashboard";
import AdminDashboard from "./features/admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import ReaderDashboard from "./features/reader/ReaderDashboard";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/reader" element={<ReaderDashboard />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
};

export default App;
