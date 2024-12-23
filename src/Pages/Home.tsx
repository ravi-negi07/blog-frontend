import { useFetchBlogsQuery } from "@/Redux/apiSlice";
import { Link } from "react-router-dom";
import CallToAction from "./CallToAction";
const Home: React.FC = () => {
  const { data } = useFetchBlogsQuery();
  console.log(data);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and tutorials on topics such as
          news anchors ,politics,sports, entertainment and many More.
        </p>
        <Link
          to="/dashboard"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="bg-amber-100 rounded-sm p-2 px-6 mx-2">
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
