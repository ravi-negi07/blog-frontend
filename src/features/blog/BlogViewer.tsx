import React from "react";
import { useFetchBlogsQuery } from "@/Redux/apiSlice";
const BlogViewer: React.FC = () => {
  const { data } = useFetchBlogsQuery();
  console.log("blod", data);
  return <div></div>;
};

export default BlogViewer;
