import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);

  const navigate = useNavigate();

  const [role, setRole] = useState(
    () => localStorage.getItem("userRole") || ""
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  const handleRoleSelection = (selectedRole: string) => {
    const validRoles = ["author", "reader", "admin"];
    if (!validRoles.includes(selectedRole)) {
      alert("Invalid role selected.");
      return;
    }
    setRole(selectedRole);
    localStorage.setItem("userRole", selectedRole);
    navigate(`/dashboard/${selectedRole}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div>
        <h1>Hello {user?.nickname}</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa quo
          iure culpa impedit quam a, rem optio doloribus suscipit delectus at
          praesentium neque saepe totam enim perspiciatis excepturi. Labore,
          expedita? Perferendis totam amet sequi recusandae sunt mollitia,
          blanditiis omnis id ad? Iusto laboriosam temporibus consequatur vel
          recusandae, numquam ex unde ipsa rerum illo culpa minus beatae placeat
          ducimus voluptates itaque.<span>kindly select the role as below</span>
        </p>
      </div>

      <Select onValueChange={handleRoleSelection} defaultValue={role}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="reader">Reader</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dashboard;
