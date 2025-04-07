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

    const obj = await response.data?.data;
    const data = await response.data;

    const access_token_exp = decodeJwt(obj?.access_token)?.exp;
    const refresh_token_exp = decodeJwt(obj?.refresh_token)?.exp;

    await setCookie(
      "access_token",
      obj?.access_token,
      (access_token_exp ?? 0) * 1000 || cookieExpiry.ACCESS
    );

    await setCookie(
      "refresh_token",
      obj?.refresh_token,
      (refresh_token_exp ?? 0) * 1000 || cookieExpiry.REFRESH
    );

    await setCookie(
      "user",
      JSON.stringify({
        id: obj?.id,
        email: obj?.email,
        role: obj?.role,
      }),
      (access_token_exp ?? 0) * 1000 || cookieExpiry.ACCESS,
      false
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
