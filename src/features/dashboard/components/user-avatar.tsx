"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { getCookie } from "cookies-next";
import { FaUserTie } from "react-icons/fa6";
import { LuLogOut, LuSettings } from "react-icons/lu";
import { toast } from "react-toastify";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/actions/logout.action";

const UserAvatar = () => {
  const router = useRouter();

  const userCookie = getCookie("user");
  const user = typeof userCookie === "string" ? JSON.parse(userCookie) : "";
  // TODO hit profile based on the role, i need to get image and the initials

  const handleLogout = async () => {
    try {
      const status = await logout();
      if (status !== 204) {
        throw new Error("Logout failed! Please try again.");
      }
      router.replace("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-primary-foreground/30 flex size-10 items-center justify-center rounded-full cursor-pointer">
          <Avatar>
            <AvatarFallback>
              {user?.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xs">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            rajan
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            {user?.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={"/settings"}
              className="flex cursor-pointer items-center gap-2"
            >
              <FaUserTie />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={"/settings"}
              className="flex cursor-pointer items-center gap-2"
            >
              <LuSettings />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer gap-2"
            onClick={handleLogout}
          >
            <LuLogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
