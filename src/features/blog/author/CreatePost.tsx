import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCreateBlogMutation } from "@/Redux/apiSlice";

const CreatePost = () => {
  const [createBlog, { isLoading, isSuccess, isError }] =
    useCreateBlogMutation();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogData = {
      title: formData.title,
      category: formData.category,
      content: formData.content,
      image: formData.image,
    };

    try {
      await createBlog(blogData).unwrap();

      setFormData({
        title: "",
        category: "",
        content: "",
        image: null,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex items-center justify-center max-w-6xl h-full">
      <div className="p-5 max-w-3xl mx-auto mt-20">
        <h1 className="text-3xl font-bold text-center mb-6">Create a Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            type="text"
            name="title"
            placeholder="Enter the post title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-4 mt-4">
            <Input type="file" accept="image/*" />
            <Button type="button">Upload</Button>
          </div>

          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded Preview"
              className="w-full h-48 object-cover rounded-md"
            />
          )}

          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, content: value }))
            }
            placeholder="Write your post content here..."
            className="h-48"
          />

          <Button
            type="submit"
            variant="default"
            className="mt-10"
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish Post"}
          </Button>
        </form>

        {isSuccess && (
          <p className="text-green-500 mt-4">Post created successfully!</p>
        )}
        {isError && <p className="text-red-500 mt-4">Error creating post!</p>}
      </div>
    </div>
  );
};

export default CreatePost;
