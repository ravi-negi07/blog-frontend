import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegMoon } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth0, LogoutOptions } from "@auth0/auth0-react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  console.log(user?.picture);

  const menuItems = [
    { id: nanoid(), title: "Home", route: "/" },
    { id: nanoid(), title: "About", route: "/about" },
    { id: nanoid(), title: "Blogs", route: "/dashboard" },
  ];

  const handleLogout = (): void => {
    const options: LogoutOptions = { returnTo: window.location.origin };
    logout(options);
  };

  return (
    <Card className="bg-card py-3 px-4 border-0 flex fixed top-0 items-center px-10 justify-between w-full shadow-md z-50">
      <div className="flex items-center">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-lg text-white">
            News
          </span>
          Blogs
        </Link>
      </div>

      <div className="hidden md:flex items-center w-[400px] border-2 h-12 rounded-lg text-lg">
        <CiSearch className="ml-3 text-gray-500" size={24} />
        <Input
          type="text"
          placeholder="Search blogs..."
          className="focus:outline-none focus:ring-0 ml-3"
        />
      </div>

      <ul className="hidden md:flex items-center gap-8 text-card-foreground font-medium">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link to={item.route} className="hover:text-blue-500">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.id}>
                  <Link to={item.route} className="w-full">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              {!isAuthenticated && (
                <DropdownMenuItem>
                  <Link to="/login">
                    <Button
                      variant="secondary"
                      className="w-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white"
                      // onClick={() => loginWithRedirect()}
                    >
                      Login
                    </Button>
                  </Link>
                </DropdownMenuItem>
              )}
              {isAuthenticated && (
                <DropdownMenuItem>
                  <Button
                    variant="secondary"
                    className="w-full text-red-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {!isAuthenticated ? (
          <Link to="/login">
            <Button
              variant="secondary"
              className="p-2 rounded-lg border-4 border-purple-300 bg-white text-purple-700 text-md font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white hover:shadow-lg"
            >
              Sign In
            </Button>
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Link to="/profile">
              {user?.picture ? (
                <Avatar>
                  <AvatarImage src={user?.picture} alt="profile" />
                </Avatar>
              ) : (
                <p>null</p>
              )}
            </Link>

            <Button
              variant="secondary"
              className="text-red-500"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}

        <Button variant="ghost" size="icon" className="ml-2">
          <FaRegMoon className="text-gray-500" />
        </Button>
      </div>
    </Card>
  );
};

export default Header;
