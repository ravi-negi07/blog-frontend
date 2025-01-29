import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";

export interface Blog {
  source: { _id: string | number | null; name: string };
  author: string;
  status: string;
  _id: string | number;
  title: string;
  description: string;
  message: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  blog: string;
  content: string;
  imageUrl: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogApiResponse {
  status: string;
  message: string;
  blog: string;
  blogs: Blog[];
  data: {
    blogs: Blog[];
    blog: Blog[];
  };
}

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-backend-2bnw.onrender.com/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchBlogs: builder.query<BlogApiResponse, void>({
      query: () => `blog`,
    }),
    fetchBlogByQuery: builder.query<BlogApiResponse, string>({
      query: (query) => `blog?search=${query}`,
    }),
    fetchBlogById: builder.query<BlogApiResponse, string>({
      query: (id) => `blog/${id}`,
    }),
    createBlog: builder.mutation<Blog, Partial<Blog>>({
      query: (newBlog) => ({
        url: "blog",
        method: "POST",
        body: newBlog,
      }),
    }),
    updateBlog: builder.mutation<Blog, Partial<Blog> & { _id: string }>({
      query: ({ _id, ...updatedBlog }) => ({
        url: `blog/${_id}`,
        method: "PUT",
        body: updatedBlog,
      }),
    }),
    approveBlog: builder.mutation<Blog, Partial<Blog> & { _id: string }>({
      query: ({ _id, ...updatedBlog }) => ({
        url: `blog/${_id}/approved`,
        method: "PUT",
        body: updatedBlog,
      }),
    }),
    rejectBlog: builder.mutation<Blog, Partial<Blog> & { _id: string }>({
      query: ({ _id, ...updatedBlog }) => ({
        url: `blog/${_id}/reject`,
        method: "PUT",
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `blog/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogByQueryQuery,
  useFetchBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useApproveBlogMutation,
  useRejectBlogMutation,
} = blogApi;

export default blogApi;
