import { Link } from "react-router-dom";
import ExplorePage from "./ExplorePage";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const isDarkTheme = useSelector((state: any) => state.theme.theme === "dark");

  return (
    <div
      className={`${
        isDarkTheme ? "bg-slate-900 text-white" : "bg-gray-50 text-indigo-900"
      } min-h-screen`}
    >
      <div
        className={`flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ${
          isDarkTheme ? "text-blue-600" : "text-blue-500"
        }`}
      >
        <h1
          className={`text-3xl font-bold lg:text-6xl ${
            isDarkTheme ? "text-slate-100" : "text-blue-500"
          }`}
        >
          Discover Insightful Articles on Trending Topics
        </h1>
        <p
          className={`text-gray-500 text-xs sm:text-sm ${
            isDarkTheme ? "text-slate-100" : "text-slate-600"
          }`}
        >
          Dive into a wide range of articles and guides on everything from
          current events to in-depth tutorials in various fields including
          politics, entertainment, lifestyle, and much more.
        </p>
        <Link
          to="/dashboard"
          className={`text-xs sm:text-sm font-bold hover:underline ${
            isDarkTheme ? "text-blue-500" : "text-teal-500"
          }`}
        >
          Explore All Posts
        </Link>
      </div>
      <div
        className={`${
          isDarkTheme
            ? "bg-indigo-900 text-white"
            : "bg-amber-100 text-indigo-900"
        } rounded-sm p-2 px-6 mx-2`}
      >
        <ExplorePage />
      </div>
    </div>
  );
};

export default Home;
