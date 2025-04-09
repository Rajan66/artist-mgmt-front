"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { useGetArtistWithUser } from "@/features/artists/hooks/use-queries";
import { logout } from "@/features/auth/actions/logout.action";
import { useGetUserProfile } from "@/features/users/hooks/use-queries";
import { getUser } from "@/utils/get-user";

const UserAvatar = () => {
  const router = useRouter();

  const user = getUser();
  const { data: profile } =
    user?.role === "artist"
      ? useGetArtistWithUser(user?.id)
      : useGetUserProfile(user?.id);

  const handleLogout = async () => {
    try {
      const status = await logout();
      if (status !== 204) {
        throw new Error("Logout failed! Please try again.");
      }

      localStorage.removeItem("profile-skip");
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
            <AvatarImage src={profile?.data.profile_image} />
            <AvatarFallback>
              {profile?.data.name
                ? profile?.data.name.charAt(0).toUpperCase()
                : user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xs">
        <DropdownMenuGroup>
          {profile?.data.name ? (
            <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
              {profile?.data?.name}
            </DropdownMenuItem>
          ) : (
            <></>
          )}
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            {user?.email}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/settings")}
            className="gap-2 cursor-pointer"
          >
            <LuSettings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
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
