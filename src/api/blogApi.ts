import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store";
export interface Blog {
  source: { _id: string | null; name: string };
  author: string;
  status: string;
  _id: string | number;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface BlogApiResponse {
  status: string;
  message: string;
  data: {
    blogs: Blog[];
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
    createBlog: builder.mutation<Blog, Partial<Blog>>({
      query: (newBlog) => ({
        url: "blog",
        method: "POST",
        body: newBlog,
      }),
    }),
    updateBlog: builder.mutation<Blog, Partial<Blog> & { id: string }>({
      query: ({ id, ...updatedBlog }) => ({
        url: `blog/${id}`,
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
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;

export default blogApi;
