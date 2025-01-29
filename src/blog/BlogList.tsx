import React from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

interface BlogItem {
  _id: string | number;
  urlToImage?: string;
  title: string;
  description: string;
  url: string;
  content: string;
  status?: string;
}

interface BlogListProps {
  filteredDataWithIds: BlogItem[];
  role: string;
  handleEdit: (_id: string | number) => void;
  handleApprove: (_id: string | number) => void;
  handleReject: (_id: string | number) => void;
  handleExplore: (_id: string | number) => void;
  isDarktheme: boolean;
}

const BlogList: React.FC<BlogListProps> = ({
  filteredDataWithIds,
  role,
  handleEdit,
  handleApprove,
  handleReject,
  handleExplore,
  isDarktheme,
}) => {
  const filteredBlogs =
    role === "reader"
      ? filteredDataWithIds.filter((item) => item.status === "approved")
      : filteredDataWithIds;

  return (
    <div
      className={`flex flex-col mt-0 pt-4 flex-1 px-4 py-6 gap-6 ${
        isDarktheme ? "bg-slate-700 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredBlogs.length === 0 ? (
          <p>No blogs found for this filter.</p>
        ) : (
          filteredBlogs.map((item) => (
            <div
              key={item._id}
              className={`${
                isDarktheme
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              } shadow-md rounded-lg p-4 transition hover:scale-105`}
            >
              <img
                src={
                  item.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMf8AbBrrC6gbouwEQ8iaDyi3nsdPRoF9EkQ&s "
                }
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3
                className={`text-md font-medium truncate  ${
                  isDarktheme ? "text-slate-300" : "text-blue-500"
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`text-xs font-medium  line-clamp-2 ${
                  isDarktheme ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {item?.content}
              </p>
              <button
                onClick={() => handleExplore(item?._id)}
                rel="noopener noreferrer"
                className={`text-blue-600 text-xs font-medium mt-2 block underline ${
                  isDarktheme ? "text-blue-500" : "text-blue-500"
                }`}
              >
                Read More
              </button>
              <div className="mt-4 flex gap-2">
                {role === "author" && (
                  <button
                    onClick={() => handleEdit(item?._id)}
                    className={`px-4 py-1 ${
                      isDarktheme ? "bg-yellow-600" : "bg-yellow-500"
                    } text-white rounded flex items-center gap-2`}
                  >
                    <FaEdit />
                    Edit
                  </button>
                )}
                {role === "admin" && (
                  <>
                    <button
                      onClick={() => handleApprove(item?._id)}
                      className={`px-4 py-1 ${
                        isDarktheme ? "bg-green-600" : "bg-green-500"
                      } text-white rounded flex items-center gap-2 hover:bg-green-400`}
                    >
                      <FaCheck />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item?._id)}
                      className={`px-4 py-1 ${
                        isDarktheme ? "bg-red-600" : "bg-red-500"
                      } text-white rounded flex hover:bg-red-400 items-center gap-2`}
                    >
                      <FaTimes />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
