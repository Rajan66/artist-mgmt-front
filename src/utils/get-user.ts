import { getCookie } from "cookies-next";

export const getUser = () => {
  const userCookie = getCookie("user");
  const user = typeof userCookie === "string" ? JSON.parse(userCookie) : "";
  return user;
};
