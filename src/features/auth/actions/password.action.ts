import axios, { AxiosError } from "axios";

import { PostRequest } from "@/lib/axios/axios";
import { asyncHandler } from "@/utils/response";

export const sendMail = async (payload: any) => {
  return asyncHandler(() =>
    PostRequest(`/api/v1/auth/password/forgot/mail/`, payload)
  );
};

export const forgotPassword = async (payload: any) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/auth/password/forgot/`,
      payload
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error("Error:", error.response?.data?.message);
        return error.response;
      }
    } else {
      console.error("Async handler error:", error);
    }
    return error;
  }
};
