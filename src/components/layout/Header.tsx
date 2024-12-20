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

const Header: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log(user);

  const menuItems = [
    { id: nanoid(), title: "Home", route: "/" },
    { id: nanoid(), title: "Blogs", route: "/dashboard" },
    { id: nanoid(), title: "Authors", route: "/dashboard/authors" },
    { id: nanoid(), title: "Admin", route: "/dashboard/admin" },
  ];

  const handleLogout = (): void => {
    const options: LogoutOptions = { returnTo: window.location.origin };
    logout(options);
  };

  return (
    <Card className="bg-card py-3 px-4 border-0 flex fixed top-0 items-center justify-between w-full shadow-md z-50">
      <div className="flex items-center">
        <Link to="/blogs" className="text-2xl font-bold text-blue-500">
          Blog
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
              className="hidden md:block text-blue-500  hover:bg-blue-500 hover:text-white"
              // onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </Link>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-gray-600">Hi, {user?.name}</span>
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
