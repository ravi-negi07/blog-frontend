import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Menu, X } from "lucide-react";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import { RootState } from "@/store";
import { toggleTheme } from "@/api/themeSlice";
import { logout } from "@/api/authSlice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (state: RootState) => state.theme.theme === "dark"
  );
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    { id: nanoid(), title: "Home", route: "/" },
    { id: nanoid(), title: "About", route: "/about" },
    { id: nanoid(), title: "Blogs", route: "/dashboard" },
  ];

  const handleThemeToggle = () => dispatch(toggleTheme());
  const handleLogout = () => dispatch(logout());
  const handleMenuToggle = () => setIsMenuOpen((prevState) => !prevState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  return (
    <Card
      className={`py-3 rounded-none border-0 flex fixed right-0 mx-auto top-0 items-center px-10 justify-between w-full shadow-md z-50 ${
        isDarkTheme
          ? "bg-slate-700 text-white"
          : "bg-card text-card-foreground "
      }`}
    >
      <div className="flex w-20 sm:w-[200px] items-center justify-center">
        <NavLink
          to="/"
          className={`self-center whitespace-nowrap text-sm sm:text-xl font-semibold ${
            isDarkTheme ? "text-white" : "dark:text-white"
          }`}
        >
          <span
            className={`px-2 py-1 rounded-lg ${
              isDarkTheme
                ? "bg-indigo-500"
                : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
            }`}
          >
            SYNERGY
          </span>{" "}
          <span className={`${isDarkTheme ? "text-white" : "text-slate-600"}`}>
            Blogs
          </span>
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <div
          ref={searchRef}
          className={`hidden md:flex items-center w-[380px] hover:border-blue-500 h-10 rounded-lg border-2 ${
            isDarkTheme
              ? "border-slate-600"
              : "border-gray-400 hover:border-blue-600 border-2"
          } transition-all duration-300 ease-in-out`}
        >
          <CiSearch
            className={`ml-3 ${
              isDarkTheme ? "text-gray-400" : "text-gray-600"
            }`}
            size={20}
          />
          <input
            type="text"
            placeholder="Search blogs..."
            className={`w-full h-full px-4 py-2 rounded-lg focus:outline-none  ${
              isDarkTheme ? "bg-slate-700 text-white" : "bg-white text-gray-800"
            } `}
          />
        </div>

        {isSearchOpen && (
          <div
            className={`fixed top-0 left-0 w-full h-full bg-opacity-90 ${
              isDarkTheme ? "bg-slate-800" : "bg-white"
            } flex items-center justify-center z-50`}
          >
            <div
              className={`w-[90%] max-w-lg h-14 flex items-center rounded-lg px-3 ${
                isDarkTheme
                  ? "bg-slate-700 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <CiSearch
                className={`mr-3 ${
                  isDarkTheme ? "text-gray-300" : "text-gray-500"
                }`}
                size={24}
              />
              <input
                type="text"
                placeholder="Search blogs..."
                className={`w-full bg-transparent focus:outline-none ${
                  isDarkTheme ? "text-white" : "text-black"
                }`}
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
          </div>
        )}

        {!isSearchOpen && (
          <Button
            variant="ghost"
            size="icon"
            className={` md:hidden text-xl ${
              !isAuthenticated ? "ml-12" : "ml-6 pl-4"
            } `}
            onClick={() => setIsSearchOpen(true)}
          >
            <CiSearch className="text-6xl" />
          </Button>
        )}
      </div>

      <ul
        className={`hidden md:flex items-center gap-8 font-medium ${
          isDarkTheme ? "text-white" : "text-slate-600"
        }`}
      >
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.route}
              className={`hover:text-blue-500 focus:text-blue-500 focus:border-b-2  focus:border-blue-500 transition-all duration-200 ${
                isDarkTheme ? "text-white" : "text-slate-800"
              }`}
            >
              {item.title}
            </NavLink>
          </li>
        ))}
        {isAuthenticated ? (
          <>
            <li>
              <Button
                variant="secondary"
                className={`text-red-500 ml-20 ${
                  isDarkTheme ? "bg-slate-600 text-white" : ""
                }`}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
            <li>
              <Avatar>
                <AvatarImage
                  src={
                    user?.avatar ||
                    "https://m.media-amazon.com/images/M/MV5BMjI3MjIxMjkwM15BMl5BanBnXkFtZTgwNzkyMTU4NzE@._V1_.jpg"
                  }
                  alt="profile"
                />
              </Avatar>
            </li>
          </>
        ) : (
          <>
            <div className=" ml-10 flex space-x-4">
              <NavLink to="/login">
                <Button
                  variant="outline"
                  className={`text-sm font-medium px-4 py-2 rounded-lg border-2 ${
                    isDarkTheme
                      ? "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                      : "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/sign-up">
                <Button
                  variant="default"
                  className={`text-sm font-medium px-4 py-2 rounded-lg ${
                    isDarkTheme
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Sign Up
                </Button>
              </NavLink>
            </div>
          </>
        )}
      </ul>

      <div className={`md:hidden flex items-center`}>
        {isMenuOpen && (
          <div
            className={`absolute top-16 right-0 rounded-lg p-4 w-40 shadow-md ${
              isDarkTheme ? "bg-slate-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`py-2 px-2 rounded-md hover:bg-slate-700 ${
                    isDarkTheme
                      ? "hover:text-white"
                      : "hover:bg-gray-200 hover:text-gray-800"
                  }`}
                >
                  <NavLink
                    to={item.route}
                    className={`block transition duration-200 ${
                      isDarkTheme ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}

              <li className="py-2">
                {isAuthenticated ? (
                  <Button
                    variant="secondary"
                    className={`w-full text-lg font-medium px-4 py-2 rounded-lg ${
                      isDarkTheme ? "bg-slate-600 text-white" : ""
                    }`}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <NavLink to="/login">
                      <Button
                        className={`text-sm font-sm px-2 py-1 rounded-md ${
                          isDarkTheme
                            ? "bg-blue-600 text-white hover:bg-blue-500"
                            : "bg-blue-600 text-white hover:bg-blue-500"
                        }`}
                      >
                        Sign In
                      </Button>
                    </NavLink>
                  </>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="pl-8 sm:hidden">
        {isAuthenticated && (
          <Avatar>
            <AvatarImage
              src={
                user?.avatar ||
                "https://m.media-amazon.com/images/M/MV5BMjI3MjIxMjkwM15BMl5BanBnXkFtZTgwNzkyMTU4NzE@._V1_.jpg"
              }
              alt="profile"
            />
          </Avatar>
        )}
      </div>

      <Button
        variant="ghost"
        onClick={handleThemeToggle}
        className="ml-4 w-8 h-8 md:ml-0 rounded-full"
      >
        {isDarkTheme ? (
          <FaSun size={20} color="yellow" />
        ) : (
          <FaRegMoon size={20} />
        )}
      </Button>

      <div className={` sm:hidden ${isAuthenticated ? "ml-3" : "ml-6"}`}>
        <Button
          variant="default"
          size="icon"
          className={`  ${
            isDarkTheme
              ? "bg-slate-800 text-white hover:bg-slate-600"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={handleMenuToggle}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default Header;
