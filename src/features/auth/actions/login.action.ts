import { decodeJwt } from "jose";

import { setCookie } from "@/actions/cookies";
import { cookieExpiry } from "@/constants/app";
import { TLogin } from "@/features/auth/schemas";
import { PostRequest } from "@/lib/axios/axios";

export const login = async (payload: TLogin) => {
  try {
    const response = await PostRequest("api/v1/auth/login/", {
      ...payload,
    });

    const data = await response.data.data;

    const access_token_exp = decodeJwt(data?.access_token)?.exp;
    const refresh_token_exp = decodeJwt(data?.refresh_token)?.exp;

    setCookie(
      "access_token",
      data?.access_token,
      (access_token_exp ?? 0) * 1000 || cookieExpiry.ACCESS
    );

    setCookie(
      "refresh_token",
      data?.refresh_token,
      (refresh_token_exp ?? 0) * 1000 || cookieExpiry.ACCESS
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
