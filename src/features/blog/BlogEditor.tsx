import React, { useState } from "react";

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
  const [formData, setFormData] = useState<Blog>({
    id: blog.id,
    title: blog.title,
    description: blog.description,
    url: blog.url,
    urlToImage: blog.urlToImage || "",
    author: blog.author || "",
    status: blog.status || "Pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Edit Blog</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
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
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL
        </label>
        <img src={formData.urlToImage} />
        <input
          type="url"
          name="url"
          value={formData.url}
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
          value={formData.urlToImage}
          onChange={handleChange}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
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
