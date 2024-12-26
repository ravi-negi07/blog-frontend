import React from "react";
import { IoMdCreate } from "react-icons/io";

import { FaCircle, FaPowerOff, FaRegCommentAlt } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}
interface SidebarProps {
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  console.log(role);
  const items: SidebarItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: <FaCircle /> },
    { title: "Create Post", url: "/create-post", icon: <IoMdCreate /> },

    ...(role.role === "admin"
      ? [
          { title: "Post", url: "/post", icon: <BsFileEarmarkPostFill /> },
          { title: "Comment", url: "/comment", icon: <FaRegCommentAlt /> },
        ]
      : []),
    { title: "Status", url: "/status", icon: <IoMdStats /> },
    { title: "Settings", url: "/setting", icon: <IoSettingsOutline /> },
  ];

  return (
    <SidebarContainer className="w-64 h-full border-2 border-slate-700 flex-shrink-0 flex flex-col justify-between">
      <SidebarContent className="mt-10 flex-grow">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="px-4 shadow-md mt-1 py-8 focus:text-blue-500 border-2 border-slate-200 flex items-center justify-start"
                  >
                    <a href={item.url} className="flex items-center">
                      {item.icon}
                      <span className="text-md font-bold uppercase ml-2">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4">
        <SidebarMenuButton className="px-4 py-8  text-red-500 shadow-md   focus:text-red-500 border-2 border-slate-200 flex items-center justify-start">
          <a href="#" className="flex items-center">
            <FaPowerOff className="text-lg" />
            <span className="text-lg font-bold ml-2 capitalized">Logout</span>
          </a>
        </SidebarMenuButton>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
