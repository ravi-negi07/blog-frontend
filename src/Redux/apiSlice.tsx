import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Blog {
  id: string;
  title: string;
  content: string;
}

interface NewBlog {
  title: string;
  content: string;
}

interface UpdateBlog extends Partial<NewBlog> {
  id: string;
}

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    fetchBlogs: builder.query<Blog[], void>({
      query: () => "/blogs",
    }),
    fetchBlogById: builder.query<Blog, string>({
      query: (id) => `/blogs/${id}`,
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
