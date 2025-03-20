import { redirect } from "next/navigation";
import { removeCookie } from "@/actions/cookies";

export const logout = async () => {
  removeCookie("access_token");
  removeCookie("refresh_token");
  redirect("/");
};
