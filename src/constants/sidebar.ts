import {
  LuAlbum,
  LuCircleHelp,
  LuHouse,
  LuMusic,
  LuPersonStanding,
  LuUser,
} from "react-icons/lu";

export const items = [
  {
    title: "Overview",
    url: "/",
    icon: LuHouse,
  },

  {
    title: "Artists",
    url: "/artists",
    icon: LuPersonStanding,
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
