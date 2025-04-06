import { getCookie } from "cookies-next";

export const getUser = () => {
  try {
    const userCookie = getCookie("user");
    if (typeof userCookie === "string") {
      return JSON.parse(userCookie);
    }
  } catch (error) {
    console.error("Error parsing user cookie:", error);
  }

  return null;
};
