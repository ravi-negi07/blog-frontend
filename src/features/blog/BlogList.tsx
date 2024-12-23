import React from "react";

interface BlogItem {
  id: number;
  urlToImage?: string;
  title: string;
  description: string;
  url: string;
}

interface BlogListProps {
  filteredDataWithIds: BlogItem[];
  role: string;
  handleEdit: (id: number) => void;
  handleApprove: (id: number) => void;
  handleReject: (id: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({
  filteredDataWithIds,
  role,
  handleEdit,
  handleApprove,
  handleReject,
}) => {
  return (
    <div className="flex flex-col mt-10 pt-10 flex-1 px-4 py-6 gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredDataWithIds.length === 0 ? (
          <p>No blogs found for this filter.</p>
        ) : (
          filteredDataWithIds.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 transition hover:scale-105"
            >
              <img
                src={
                  item.urlToImage ||
                  "https://static.displate.com/857x1200/displate/2024-10-18/e8e198f7-3081-4005-9893-c00340c5279b.jpg"
                }
                alt={item.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-sm font-bold truncate">{item.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">
                {item.description}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xs mt-2 block underline"
              >
                Read More
              </a>
              <div className="mt-4 flex gap-2">
                {role === "author" && (
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                )}
                {role === "admin" && (
                  <>
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-4 py-1 bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
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
