import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Blog {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewBlog {
  title: string;
  content: string;
}

interface UpdateBlog extends Partial<NewBlog> {
  id: string;
}

const API_KEY = "8c622754758f462991f1a012eeb75db2";
const NEWS_API_URL = "https://newsapi.org/v2/";

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: NEWS_API_URL,
  }),
  endpoints: (builder) => ({
    fetchBlogs: builder.query<Blog[], void>({
      query: () =>
        `everything?q=apple&from=2024-12-19&to=2024-12-19&sortBy=popularity&apiKey=${API_KEY}`,
    }),
    fetchBlogById: builder.query<Blog, string>({
      query: (id) => `everything?q=${id}&apiKey=${API_KEY}`,
    }),
    createBlog: builder.mutation<Blog, NewBlog>({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
    }),
    updateBlog: builder.mutation<Blog, UpdateBlog>({
      query: ({ id, ...updatedBlog }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: updatedBlog,
      }),
    }),
    deleteBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;

export default blogApi;
