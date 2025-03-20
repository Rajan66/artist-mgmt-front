"use client";

import Link from "next/link";

import { LuLogOut, LuSettings } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa6";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/features/auth/actions/logout.action";

const UserAvatar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-primary-foreground/30 flex size-10 items-center justify-center rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xs">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            rajan
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            rajanmaharjan@gmail.com
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
            onClick={() => logout()}
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
