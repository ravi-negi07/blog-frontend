import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetchBlogsQuery } from "../api/blogApi";
import Sidebar from "@/Layouts/Sidebar";
import BlogList from "./BlogList";
import { PieChart } from "react-minimal-pie-chart";

import { Blog } from "../api/blogApi";
import { useRejectBlogMutation, useApproveBlogMutation } from "../api/blogApi";
import { showSuccessToast, showErrorToast } from "@/utills/toastifyUtills";
const Dashboard: React.FC = React.memo(() => {
  const isDarktheme = useSelector((state: any) => state.theme.theme === "dark");
  const [approveBlog] = useApproveBlogMutation();
  const [rejectBlog] = useRejectBlogMutation();
  const { data, error, isLoading } = useFetchBlogsQuery();
  const navigate = useNavigate();
  const role = useSelector((state: any) => state.auth.role);
  console.log(role);
  const blogs: Blog[] = data?.data?.blogs || [];
  const approvedCount = blogs.filter(
    (blog: { status: string }) => blog.status === "approved"
  ).length;
  const pendingCount = blogs.filter(
    (blog: { status: string }) => blog.status === "pending"
  ).length;
  const rejectedCount = blogs.filter(
    (blog: { status: string }) => blog.status === "rejected"
  ).length;

  const chartData = [
    { title: "Approved", value: approvedCount, color: "#4caf50" },
    { title: "Pending", value: pendingCount, color: "#ff9800" },
    { title: "Rejected", value: rejectedCount, color: "#f44336" },
  ];

  const [filter] = useState<string>("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const filteredData =
    filter === "all" ? blogs : blogs.filter((item) => item?.status === filter);

  const handleEdit = (_id: string | number) => {
    navigate(`/edit/${_id}`);
  };

  const handleApprove = async (_id: string | number) => {
    const idAsString = String(_id);

    try {
      if (isLoading) {
        console.log("Approval is in progress...");
        return;
      }

      const res = await approveBlog({ _id: idAsString });

      if (res?.data) {
        console.log("Approval successful:", res.data);
        showSuccessToast("Blog approved successfully!");
      } else {
        console.error("Approval failed, no data:", res);
        showErrorToast(
          `Failed to approve the blog because it already approved`
        );
      }
    } catch (error: unknown | string) {
      console.error("Approval failed:", error);
      showErrorToast(
        `Failed to approve the blog this blog is already approved`
      );
    }
  };

  const handleExplore = (_id: string | number) => {
    navigate(`/display/${_id}`);
  };

  const handleReject = async (_id: string | number) => {
    const idAsString = String(_id);
    try {
      const res = await rejectBlog({ _id: idAsString });
      if (res?.data) {
        throw new Error(`Error: ${res.data.status}`);
      }

      console.log("reject successful:", data);

      showSuccessToast("Blog rejected successfully!");
    } catch (error) {
      console.error("Rejection failed:", error);
      showErrorToast(`Failed to Reject the blog:`);
    }
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
          className={`p-6 shadow-md flex flex-col md:flex-row items-center md:items-start rounded-lg ${
            isDarktheme ? "bg-gray-800" : "bg-white"
          } ${role === "reader" ? "hidden" : "block"}`}
        >
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2
              className={`text-lg font-bold mb-4 ${
                isDarktheme ? "text-slate-200" : "text-slate-600"
              }`}
            >
              Dashboard Overview
            </h2>
          </div>

          <div className="w-[200px] md:w-1/4 flex justify-center">
            <PieChart
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
              data={chartData}
              label={({ dataIndex }) => {
                const { title, value } = chartData[dataIndex];
                return `${title}: ${value}`;
              }}
              labelStyle={{
                fontSize: "5px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: isDarktheme ? "white" : "black",
              }}
            />
          </div>

          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            {/* <h1
              className={`${
                isDarktheme ? "text-white" : "text-slate-700"
              } text-center md:text-left`}
            >
              Total: {chartData.reduce((sum, item) => sum + item.value, 0)}{" "}
              (Status:{" "}
              {chartData
                .map((item) => `${item.title}: ${item.value}`)
                .join(", ")}
              )
            </h1> */}
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
