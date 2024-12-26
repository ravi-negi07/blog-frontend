import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from "@/Redux/apiSlice";

interface Blog {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  author?: string;
  status?: "Pending" | "Approved" | "Rejected";
}

interface BlogEditorProps {
  blog: Blog;
  onSave: (updatedBlog: Blog) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blog, onSave, onCancel }) => {
  const { id } = useParams<{ id: string }>(); // Ensure the type of id is a string
  console.log("id", id);

  // Fetch the blog data by id using the API query
  const {
    data: fetchedBlog,
    isLoading,
    isError,
  } = useFetchBlogByIdQuery(id || ""); // Ensure we only get the blog for the specific id
  console.log("Fetched blog data", fetchedBlog);

  const [formData, setFormData] = useState<Blog | null>(null);

  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (fetchedBlog) {
      setFormData(fetchedBlog);
    }
  }, [fetchedBlog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => {
      if (prevData) {
        const { name, value } = e.target;
        return {
          ...prevData,
          [name]: value,
        };
      }
      return null;
    });
  };

  const handleSave = async () => {
    if (formData) {
      try {
        await updateBlog({
          id: formData.id,
          title: formData.title,
          description: formData.description,
          url: formData.url,
          urlToImage: formData.urlToImage || "",
          author: formData.author || "",
          status: formData.status || "Pending",
        }).unwrap();
        onSave(formData);
      } catch (error) {
        console.error("Failed to save blog:", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading blog data...</div>;
  }

  if (isError) {
    return <div>Error loading blog data</div>;
  }

  if (!formData) {
    return <div>No blog data available</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg mt-20 p-6">
      <h2 className="text-lg font-bold mb-4">Edit Blog</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={4}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <input
          type="url"
          name="url"
          value={formData.url || ""}
          onChange={handleChange}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          name="urlToImage"
          value={formData.urlToImage || ""}
          onChange={handleChange}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {formData.urlToImage && (
          <img
            src={formData.urlToImage}
            alt="Preview"
            className="mt-2 max-w-full rounded-md"
          />
        )}
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
