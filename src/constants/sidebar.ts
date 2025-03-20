import {
  LuAlbum,
  LuCircleHelp,
  LuHouse,
  LuMusic,
  LuPersonStanding,
  LuSettings,
  LuUser,
} from "react-icons/lu";

export const items = [
  {
    title: "Overview",
    url: "/",
    icon: LuHouse,
  },
  {
    title: "Users",
    url: "/users",
    icon: LuUser,
  },
  {
    title: "Artists",
    url: "/artists",
    icon: LuPersonStanding,
  },
  {
    title: "Album",
    url: "/albums",
    icon: LuAlbum,
  },
  {
    title: "Songs",
    url: "/songs",
    icon: LuMusic,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: LuSettings,
  },
  {
    title: "Help",
    url: "/help",
    icon: LuCircleHelp,
  },
];
