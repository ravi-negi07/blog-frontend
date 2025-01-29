import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { useCreateBlogMutation } from "../api/blogApi";

const BlogCreator = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState(title);
  const isDarkTheme = useSelector((state: any) => state.theme.theme === "dark");
  const [createBlog, { isLoading, isSuccess, isError }] =
    useCreateBlogMutation();
  const author = useSelector((state: any) => state?.auth?.email);
  const plainTextContent = content.replace(/<[^>]*>/g, "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTitle(title);
    }, 500);

    return () => clearTimeout(timer);
  }, [title]);

  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        alert("All fields are required.");
        return;
      }
      const newBlog = {
        title,
        content: plainTextContent,
      };

      await createBlog(newBlog).unwrap();
      alert(`Blog created successfully by ${author}`);
      setTitle("");
      setContent("");
    } catch (error) {
      alert("Error creating the blog. Please try again.");
    }
  };

  return (
    <div
      className={`mt-20 sm:mt-10 p-6 sm:p-8 rounded-lg shadow-lg ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold text-blue-500 mb-3">
        Publish your passions, your way
      </h1>
      <p className={` ${isDarkTheme ? "text-slate-100" : "text-slate-600"}`}>
        Create a unique and beautiful blog. Choose from a selection of
        easy-to-use templates.
      </p>

      <div className="space-y-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkTheme
              ? "bg-slate-700 text-white"
              : "bg-slate-50 placeholder-gray-900"
          }`}
          data-theme={isDarkTheme ? "dark" : "light"}
        />
        {/* <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short Description"
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkTheme ? "bg-slate-700 text-white" : "bg-slate-50"
          }`}
          rows={3}
        /> */}
        <div className={isDarkTheme ? "dark" : ""}>
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Write your blog description here.."
            className={`rounded-md border focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 ${
              isDarkTheme
                ? "bg-slate-600 text-white"
                : "bg-slate-50 text-slate-600"
            }`}
            style={{ height: "300px", color: "white" }}
          />
        </div>
      </div>

      <div className="cursor-pointer mt-20 sm:mt-10">
        <Button
          onClick={handleSubmit}
          className={`w-full sm:w-auto text-md mt-1 px-6 py-3 text-white hover:bg-blue-700 font-semibold rounded-md 
          ${isDarkTheme ? "text-white bg-blue-600" : "bg-blue-500"}  `}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>

      {isSuccess && (
        <p className="text-green-500 mt-4 text-center">
          Blog created successfully!
        </p>
      )}
      {isError && (
        <p className="text-red-500 mt-4 text-center">
          Failed to create the blog. Please try again.
        </p>
      )}
    </div>
  );
};

export default BlogCreator;
