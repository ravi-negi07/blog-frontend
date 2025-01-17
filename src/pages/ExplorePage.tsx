import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import blogImage from "../assets/blog.png";

const ExplorePage = () => {
  const isDarkTheme = useSelector((state: any) => state.theme.theme === "dark");

  return (
    <div
      className={`flex flex-col sm:flex-row items-center p-8 gap-8 rounded-xl shadow-lg ${
        isDarkTheme
          ? "bg-indigo-900 text-white"
          : "bg-purple-50 text-purple-900"
      }`}
    >
      <div className="sm:w-1/2 flex flex-col justify-center">
        <h2
          className={`text-3xl font-semibold mb-4 ${
            isDarkTheme ? "text-teal-300" : "text-blue-500"
          }`}
        >
          Explore Our Latest Insights
        </h2>
        <p
          className={`text-lg mb-6 ${
            isDarkTheme ? "text-gray-300" : "text-blue-500"
          }`}
        >
          Stay up-to-date with our latest blog posts on a variety of topics.
          From current trends to in-depth tutorials, we have something for
          everyone. Explore our collection today!
        </p>
        <Button
          className={`rounded-lg px-6 py-3 mt-4 ${
            isDarkTheme
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-purple-700 hover:bg-purple-800 text-white"
          }`}
        >
          <a
            href="https://www.blogger.com/about/?bpli=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read More Blog Posts
          </a>
        </Button>
      </div>

      <div className="sm:w-1/2">
        <img
          src={blogImage}
          alt="Blog Image"
          className="w-full h-auto rounded-xl shadow-xl object-cover"
        />
      </div>
    </div>
  );
};

export default ExplorePage;
