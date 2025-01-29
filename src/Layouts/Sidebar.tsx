import React, { useState, useEffect } from "react";
import { FaCircle, FaRegCommentAlt } from "react-icons/fa";
import { IoMdCreate, IoMdStats } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/authSlice";
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
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = React.memo(
  ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const isDarktheme = useSelector(
      (state: any) => state.theme.theme === "dark"
    );
    const userRole = useSelector((state: any) => state.auth.role);

    const itemsForAdmin: SidebarItem[] = [
      { title: "Dashboard", url: "/dashboard", icon: <FaCircle /> },
      { title: "Post", url: "/post", icon: <BsFileEarmarkPostFill /> },
      { title: "Comment", url: "/comment", icon: <FaRegCommentAlt /> },
      { title: "Status", url: "/status", icon: <IoMdStats /> },
      { title: "Settings", url: "/setting", icon: <CiSettings /> },
    ];

    const itemsForAuthor: SidebarItem[] = [
      { title: "Dashboard", url: "/dashboard", icon: <FaCircle /> },
      { title: "Create Post", url: "/create-post", icon: <IoMdCreate /> },
      { title: "Post", url: "/post", icon: <BsFileEarmarkPostFill /> },
      { title: "Comment", url: "/comment", icon: <FaRegCommentAlt /> },
      { title: "Status", url: "/status", icon: <IoMdStats /> },
    ];

    const itemsForReader: SidebarItem[] = [
      { title: "Dashboard", url: "/dashboard", icon: <FaCircle /> },
      { title: "Comment", url: "/comment", icon: <FaRegCommentAlt /> },
    ];

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        setIsButtonVisible(false);
      } else {
        setIsScrolled(false);
        setIsButtonVisible(true);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const handleLogout = () => {
      dispatch(logout());
      navigate("/login");
    };

    const items =
      userRole === "admin"
        ? itemsForAdmin
        : userRole === "author"
        ? itemsForAuthor
        : itemsForReader;

    return (
      <div
        className={`${
          isDarktheme
            ? "bg-slate-800 border-slate-700"
            : "bg-slate-100 border-slate-300"
        }`}
      >
        {isButtonVisible && (
          <button
            onClick={toggleSidebar}
            className={`sm:hidden fixed left-0 top-[var(--header-height)] p-2 text-lg px-4 rounded-lg z-50 ${
              isDarktheme
                ? "bg-slate-800 text-white"
                : "bg-slate-100 text-slate-800"
            }`}
            aria-label="Toggle Sidebar"
          >
            {isOpen ? "X" : "☰"}
          </button>
        )}

        <SidebarContainer
          className={`pt-16 w-64 h-full border-2 flex-shrink-0 flex flex-col justify-between ${
            isScrolled ? "hidden" : ""
          } ${
            isDarktheme
              ? "bg-slate-800 border-slate-700"
              : "bg-slate-200 border-slate-300"
          } sm:block`}
        >
          <SidebarContent
            className={`flex-grow ${
              isDarktheme
                ? "bg-slate-600 border-slate-500"
                : "bg-slate-200 border-slate-300"
            }`}
          >
            <SidebarGroup>
              <SidebarGroupLabel
                className={`text-md font-lg px-4 mt-3 py-2 rounded-md ${
                  isDarktheme
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Applications
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`px-4 shadow-md mt-1 py-8 flex items-center justify-start ${
                          isDarktheme
                            ? "bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-slate-100"
                            : "bg-slate-200 text-slate-600 hover:bg-slate-400 hover:text-slate-800"
                        }`}
                      >
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `flex items-center text-lg ${
                              isActive ? "text-blue-500" : "text-slate-800"
                            }`
                          }
                        >
                          {item.icon}
                          <span className="ml-2 font-bold text-lg hover:text-blue-500 focus:text-blue-500">
                            {item.title}
                          </span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div
            className={`p-4 border-t-2 bottom-0 ${
              isDarktheme
                ? "bg-slate-600 border-slate-500"
                : "bg-slate-200 border-slate-300"
            }`}
          >
            <button
              onClick={handleLogout}
              className={`w-full text-lg bottom-0 py-2 rounded-md ${
                isDarktheme
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Logout
            </button>
          </div>
        </SidebarContainer>

        <div
          className={`fixed top-10 pt-20 left-0 w-64 h-full z-40 transform transition-transform duration-300 sm:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } ${isDarktheme ? "bg-gray-800" : "bg-gray-100"} `}
        >
          <ul className="">
            {items.map((item) => (
              <li key={item.title} className="p-4">
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center text-lg ${
                      isActive
                        ? "text-blue-500"
                        : isDarktheme
                        ? "text-white"
                        : "text-black"
                    }`
                  }
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className={`w-full text-lg bottom-0 py-2 rounded-md ${
              isDarktheme
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
);
export default Sidebar;
