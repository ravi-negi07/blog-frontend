import React from "react";
import { FaCircle, FaPowerOff, FaRegCommentAlt } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
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
    { title: "Dashboard", url: "#", icon: <FaCircle /> },
    ...(role.role == "admin"
      ? [
          { title: "Post", url: "#", icon: <BsFileEarmarkPostFill /> },
          { title: "Comment", url: "#", icon: <FaRegCommentAlt /> },
        ]
      : []),
    { title: "Status", url: "#", icon: <IoMdStats /> },
    { title: "Settings", url: "#", icon: <IoSettingsOutline /> },
  ];

  return (
    <SidebarContainer className="w-64 h-full border-2 border-slate-700 flex-shrink-0">
      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent className="relative h-full">
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

            <SidebarMenuButton className="mt-[200px] bottom-0 left-0 px-4 text-red-500 shadow-md py-8 focus:text-red-500 border-2 border-slate-200 flex justify-start">
              <a href="#" className="flex items-center">
                <FaPowerOff className="text-lg" />
                <span className="text-md font-bold ml-2">Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
