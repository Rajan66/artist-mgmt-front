"use server";
import { isAxiosError } from "axios";

import { getCookie, removeCookie } from "@/actions/cookies";
import { PostRequest } from "@/lib/axios/axios";

export const logout = async () => {
  try {
    const token = getCookie("refresh_token");
    removeCookie("access_token");
    removeCookie("refresh_token");
    removeCookie("user_id");

    const response = await PostRequest(
      "/api/v1/auth/token/blacklist/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    if (isAxiosError(error)) return error?.response?.data;
  }
};
