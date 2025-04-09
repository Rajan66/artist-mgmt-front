import { FaRegUser } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuCircleHelp, LuDiscAlbum, LuHouse, LuMusic } from "react-icons/lu";

import { TItem } from "@/features/dashboard/types/sidebar.type";
import { getUser } from "@/utils/get-user";

export const useGetItems = (): TItem[] => {
  const user = getUser();

  const navItems: TItem[] = [
    {
      title: "Overview",
      url: "/",
      icon: LuHouse,
    },
    {
      title: "Albums",
      url: "/albums",
      icon: LuDiscAlbum,
    },
    {
      title: "Songs",
      url: "/songs",
      icon: LuMusic,
    },
    {
      title: "Help",
      url: "/help",
      icon: LuCircleHelp,
    },
  ];

  if (user?.role === "artist_manager" || user?.role === "super_admin") {
    navItems.splice(1, 0, {
      title: "Artists",
      url: "/artists",
      icon: FaRegUser,
    });
  }
  if (user?.role === "artist" || user?.role === "super_admin") {
    navItems.splice(1, 0, {
      title: "Managers",
      url: "/managers",
      icon: GrUserManager,
    });
  }

  return navItems;
};
