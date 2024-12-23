import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
const Profile: React.FC = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <Avatar className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <AvatarImage
            src={user?.picture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </Avatar>

        <Input
          type="text"
          id="username"
          value={user?.name}
          placeholder="Username"
        />
        <Input
          type="email"
          id="email"
          defaultValue={user?.email}
          placeholder="Email"
        />
        <Input
          type="password"
          id="password"
          defaultValue={user?.password}
          placeholder="Password"
        />

        <Button type="submit" variant="outline">
          Update
        </Button>

        <Button type="button" variant="default" className="w-full">
          Create a post
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>

      <Alert variant="default" className="mt-5">
        This is a success message.
      </Alert>

      <div>
        <div>
          <Button>Delete Account</Button>

          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button variant="destructive">Yes, I'm sure</Button>
              <Button variant="secondary">No, cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
