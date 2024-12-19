// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
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
  console.log("isAuthenticted", isAuthenticated);

  //   const [role, setRole] = useState(
  //     () => localStorage.getItem("userRole") || ""
  //   );
  //   const navigate = useNavigate();

  // const handleRoleSelection = (selectedRole: string) => {
  //   const validRoles = ["author", "reader", "admin"];
  //   if (!validRoles.includes(selectedRole)) {
  //     alert("Invalid role selected.");
  //     return;
  //   }
  //   setRole(selectedRole);
  //   localStorage.setItem("userRole", selectedRole);
  //   navigate(`/dashboard/${selectedRole}`);
  // };

  // const handleClick = () => {
  //   if (!role) {
  //     navigate("/login");
  //   } else {
  //     navigate(`/dashboard/${role}`);
  //   }
  // };

  // useEffect(() => {
  //   if (!role) {
  //     navigate("/login");
  //   } else {
  //     navigate(`/dashboard/${role}`);
  //   }
  // }, [role, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Enter a Role here" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>
            <SelectItem value="apple">Auther</SelectItem>
            <SelectItem value="banana">Admin</SelectItem>
            <SelectItem value="blueberry">Reader</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dashboard;
