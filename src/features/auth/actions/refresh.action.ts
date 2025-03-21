import axios from "@/lib/axios/interceptor";
import { isAxiosError } from "axios";

export const getRefreshToken = async (token: string) => {
  try {
    const response = await axios.post(
      "api/v1/auth/token/refresh/",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data?.message || "An error occurred");
      return error.response?.data.message;
    } else {
      console.error("Something went wrong", error);
    }
  }
};
