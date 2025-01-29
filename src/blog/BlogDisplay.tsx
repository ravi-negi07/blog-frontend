import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "@/api/blogApi";
import { useSelector } from "react-redux";
import { Blog } from "@/api/blogApi";

const DisplayPage: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const { data, isError, isLoading } = useFetchBlogByIdQuery(_id || "");
  const isDarktheme = useSelector((state: any) => state.theme.theme === "dark");

  const blog: Blog | undefined = Array.isArray(data?.data?.blog)
    ? data.data.blog[0]
    : (data?.data?.blog as Blog | undefined);

  if (isLoading)
    return <p className="text-center text-xl text-gray-500">Loading blog...</p>;
  if (isError || !blog)
    return (
      <p className="text-center text-xl text-red-500">
        {isError ? "Error loading blog." : "Blog not found or unavailable."}
      </p>
    );

  const { title, content, imageUrl, updatedAt } = blog;

  return (
    <div
      className={`w-full h-full object-cover ${
        isDarktheme
          ? "bg-gray-800 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-300"
      }`}
    >
      <div className="flex justify-center items-center mt-5 min-h-screen p-6">
        <div
          className={`shadow-lg rounded-lg  p-6 w-full max-w-3xl ${
            isDarktheme
              ? "bg-gray-800 text-slate-100 border-gray-700"
              : "bg-slate-100 text-gray-900 border-gray-300"
          }`}
        >
          <div className="mt-6 mb-8">
            <img
              src={
                imageUrl ||
                "https://st2.depositphotos.com/1420973/6409/i/450/depositphotos_64095317-stock-photo-blog-concept-cloud-chart-print.jpg"
              }
              alt={title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <h1
            className={`text-4xl font-bold mb-4 ${
              isDarktheme ? "text-teal-500" : "text-blue-500"
            }`}
          >
            {title}
          </h1>
          <div
            className={`text-lg mb-6 ${
              isDarktheme ? "text-gray-300" : "text-slate-600"
            }`}
          >
            {content}
          </div>
          <div
            className={`text-sm ${
              isDarktheme ? "text-slate-300" : "text-slate-400"
            } mt-6`}
          >
            <p>
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPage;
