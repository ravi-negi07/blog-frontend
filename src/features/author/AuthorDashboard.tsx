import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
  useFetchBlogsQuery,
  useDeleteBlogMutation,
} from "../../Redux/apiSlice";

const AuthorDashboard: React.FC = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { data: blogs, isLoading, error } = useFetchBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = (id: string) => {
    deleteBlog(id);
  };

  return (
    <div className="mt-20">
      <main className="flex-1 max-w-7xl mx-auto mt-20 p-6">
        <SidebarProvider>
          <Sidebar className="w-64 bg-gray-800 text-white">
            <SidebarHeader className="p-4 text-xl font-bold">
              Author Dashboard
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <Button
                  className="w-full text-left"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button
                  className="w-full text-left"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </Button>
                <Button
                  className="w-full text-left"
                  onClick={() => navigate("/posts")}
                >
                  Posts
                </Button>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">Footer Content</SidebarFooter>
          </Sidebar>
        </SidebarProvider>

        <div className="flex flex-col justify-between items-center mb-8 shadow-lg rounded-lg p-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white">
          <Avatar>
            <AvatarImage
              src={user?.picture || "https://via.placeholder.com/150"}
              alt={`${user?.name}'s Avatar`}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{user?.name}'s Dashboard</h1>
            <p className="text-sm">{user?.bio || "No bio available"}</p>
          </div>

          <Button
            onClick={() => navigate("/new-post")}
            className="px-6 py-3 rounded-lg text-white bg-indigo-700 hover:bg-indigo-600 transition duration-300"
          >
            Create New Post
          </Button>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Your Posts</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading posts</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogs?.map((blog) => (
                <Card
                  key={blog.source.id}
                  className="hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white"
                >
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-500">{blog.source.name}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <Button
                        onClick={() => navigate(`/edit-post/${blog.source.id}`)}
                        className="px-4 py-2 text-gray-800 bg-gray-300 hover:bg-gray-200 rounded-lg"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(blog.source.id)}
                        className="px-4 py-2 text-white bg-red-600 hover:bg-red-500 rounded-lg"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
          <div className="p-6 border rounded-lg shadow-md">
            <p className="font-medium">Name: {user?.name}</p>
            <p className="text-gray-600">
              Bio: {user?.bio || "No bio available"}
            </p>
            <Button
              onClick={() => navigate("/edit-profile")}
              className="mt-4 px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            >
              Edit Profile
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthorDashboard;
