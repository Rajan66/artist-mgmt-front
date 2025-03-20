"use server";
import { redirect } from "next/navigation";
import { removeCookie } from "@/actions/cookies";

export const logout = async () => {
  removeCookie("access_token");
  removeCookie("refresh_token");
  removeCookie("user_id");
  redirect("/login");
};
