import {
  LuAlbum,
  LuCircleHelp,
  LuHouse,
  LuMusic,
  LuPersonStanding,
} from "react-icons/lu";

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
      icon: LuAlbum,
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

  if (user?.role === "artistManager") {
    navItems.splice(1, 0, {
      title: "Artists",
      url: "/artists",
      icon: LuPersonStanding,
    });
  }

  return navItems;
};
