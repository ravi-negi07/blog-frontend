import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchBlogsQuery } from "../api/blogApi";
import Sidebar from "@/Layouts/Sidebar";
import BlogList from "./BlogList";
import { Blog } from "../api/blogApi";

const Dashboard: React.FC = React.memo(() => {
  const isDarktheme = useSelector((state: any) => state.theme.theme === "dark");
  const { data, error, isLoading } = useFetchBlogsQuery();
  const navigate = useNavigate();
  const role = useSelector((state: any) => state.auth.role);

  const blogs: Blog[] = data?.data?.blogs || [];
  console.log("Blogs array:", blogs);

  console.log(blogs);

  const [filter, setFilter] = useState<string>("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  const uniqueStatuses = ["all", "pending", "approved", "rejected"];

  const filteredData =
    filter === "all" ? blogs : blogs.filter((item) => item?.status === filter);

  console.log("Filtered blogs:", filteredData);

  const handleEdit = (_id: string | number) => {
    navigate(`/edit/${_id}`);
  };

  const handleApprove = (_id: string | number) => {
    console.log(`Approved blog with ID: ${_id}`);
  };

  const handleExplore = (_id: string | number) => {
    navigate(`/explore/${_id}`);
  };

  const handleReject = (_id: string | number) => {
    console.log(`Rejected blog with ID: ${_id}`);
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading blogs</div>;
  }

  return (
    <div
      className={`pt-14 flex w-full min-h-screen ${
        isDarktheme ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={handleSidebarToggle}
        className="sm:hidden absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-lg"
      >
        ☰
      </button>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />

      <div className="flex flex-col flex-1 px-4 py-6 gap-6">
        <div
          className={`p-6 shadow-md rounded-lg ${
            isDarktheme ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2
            className={`text-lg font-bold mb-4 ${
              isDarktheme ? "text-slate-200" : "text-slate-600"
            }`}
          >
            Dashboard Overview
          </h2>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p
              className={`text-sm font-medium  ${
                isDarktheme ? "text-slate-200" : "text-slate-600"
              }`}
            >
              Total Blogs: {blogs.length}
            </p>
            <p
              className={`text-sm font-medium ${
                isDarktheme ? "text-slate-200" : "text-slate-600"
              }`}
            >
              Filtered Blogs: {filteredData.length}
            </p>

            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className={`border rounded px-2 py-1 text-sm w-full sm:w-auto ${
                isDarktheme
                  ? "border-gray-700 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-900"
              }`}
            >
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <BlogList
          role={role}
          isDarktheme={isDarktheme}
          filteredDataWithIds={filteredData}
          handleEdit={handleEdit}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleExplore={handleExplore}
        />
      </div>
    </div>
  );
});

export default Dashboard;
