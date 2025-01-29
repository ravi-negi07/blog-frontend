import { useFetchBlogsQuery } from "@/api/blogApi";
import ReactLoading from "react-loading";
import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Tooltip,
  Title,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Tooltip,
  Title,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BlogStatus: React.FC = () => {
  const { data, isLoading, isError } = useFetchBlogsQuery();
  const isDarktheme = useSelector((state: any) => state.theme.theme == "dark");
  // console.log(isDarktheme);
  if (isLoading)
    return <ReactLoading type="spin" color="#3498db" height={50} width={50} />;
  if (isError || !data) return <p>Failed to load data</p>;

  const blogs = data?.data?.blogs || [];
  const approvedCount = blogs.filter(
    (blog: { status: string }) => blog.status === "approved"
  ).length;
  const pendingCount = blogs.filter(
    (blog: { status: string }) => blog.status === "pending"
  ).length;
  const rejectedCount = blogs.filter(
    (blog: { status: string }) => blog.status === "rejected"
  ).length;

  const barChartData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Blog Status",
        data: [approvedCount, pendingCount, rejectedCount],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        borderColor: ["#388e3c", "#f57c00", "#d32f2f"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`,
        },
      },
      title: {
        display: true,
        text: "Blog Status Distribution",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div
      className={`w-full h-[100vh] flex flex-col items-center justify-center ${
        isDarktheme
          ? "border-gray-700 bg-gray-800 text-white"
          : "border-gray-300 bg-gray-200 text-slate-600"
      }`}
    >
      <div className="w-full  max-w-3xl mx-auto">
        <div className="w-full flex justify-center mb-8">
          <Bar className="w-full" data={barChartData} options={options} />
        </div>
        <h1
          className={`m-4 text-center font-medium text-slate-700 ${
            isDarktheme
              ? "border-gray-700 bg-gray-800 text-white"
              : "border-gray-300 bg-gray-200 text-black"
          }`}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          maxime tempore suscipit veritatis mollitia, voluptates vero nostrum ea
          nemo tenetur fugit, dolor eaque incidunt quasi non cumque distinctio,
          vitae error.
        </h1>
      </div>
    </div>
  );
};

export default BlogStatus;
