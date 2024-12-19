import { useFetchBlogsQuery } from "@/Redux/apiSlice";

const AdminDashboard: React.FC = () => {
  const { data } = useFetchBlogsQuery();
  console.log("data", data);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Pending Blogs</h2>
        <ul>
          s
          <li>
            <div>
              <h3>Blog Title 1</h3>
              <button>Approve</button>
              <button>Reject</button>
            </div>
          </li>
          <li>
            <div>
              <h3>Blog Title 2</h3>
              <button>Approve</button>
              <button>Reject</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
