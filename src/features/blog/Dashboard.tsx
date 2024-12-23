import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useFetchBlogsQuery } from "@/Redux/apiSlice";
import { useNavigate } from "react-router-dom";
import BlogList from "@/features/blog/BlogList";

interface Blog {
  id?: string;
  source: {
    name: string;
  };
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  status?: "Pending" | "Approved" | "Rejected";
  author?: string;
}

interface BlogData {
  articles: Blog[];
  status: string;
  totalResults: number;
}

const Dashboard: React.FC = () => {
  const [role] = useState("reader");
  const { data } = useFetchBlogsQuery();
  const navigate = useNavigate();

  // Ensure the response data structure is handled correctly
  const blogs: BlogData = data
    ? data
    : { articles: [], status: "", totalResults: 0 };

  const [filter, setFilter] = useState<string>("all");

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const filteredData =
    filter === "all"
      ? blogs.articles
      : blogs.articles.filter((item) => item.source?.name === filter) || [];

  const filteredDataWithIds = Array.isArray(filteredData)
    ? filteredData.map((item, index) => ({
        ...item,
        id: `${index + 1}`,
      }))
    : [];

  const uniqueSources = Array.from(
    new Set(blogs.articles.map((item) => item.source?.name || ""))
  );

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleApprove = (id: string) => {
    console.log(`Approved blog with ID: ${id}`);
  };

  const handleReject = (id: string) => {
    console.log(`Rejected blog with ID: ${id}`);
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex flex-col flex-1 px-4 py-6 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Dashboard Overview</h2>
          <div className="flex justify-between items-center">
            <p className="text-sm">Total Blogs: {blogs.articles.length}</p>
            <p className="text-sm">Total Results: {blogs.totalResults}</p>
            <select
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="all">All Sources</option>
              {uniqueSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Statistics</h2>
          <canvas id="blogChart"></canvas>
        </div>
        <BlogList
          filteredDataWithIds={filteredDataWithIds}
          role={role}
          handleEdit={handleEdit}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      </div>
    </div>
  );
};

export default Dashboard;
